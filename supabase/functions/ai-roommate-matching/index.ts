import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!LOVABLE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { profileId } = await req.json();

    console.log('Processing AI match for profile:', profileId);

    // Get user's profile and answers
    const { data: userProfile, error: profileError } = await supabase
      .from('profiles')
      .select('*, roommate_answers(*)')
      .eq('id', profileId)
      .single();

    if (profileError) throw profileError;

    // Get all other profiles with their answers
    const { data: otherProfiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*, roommate_answers(*)')
      .neq('id', profileId);

    if (profilesError) throw profilesError;

    // Build AI prompt for semantic matching
    const userAnswers = userProfile.roommate_answers?.map((a: any) => a.answer).join(', ') || '';
    const userInfo = `
      Profile: ${userProfile.first_name} ${userProfile.last_name}
      City: ${userProfile.current_city}
      Budget: ${userProfile.budget_min}-${userProfile.budget_max}
      Move-in: ${userProfile.move_in_date}
      Answers: ${userAnswers}
    `;

    const matches = [];

    for (const candidate of otherProfiles || []) {
      const candidateAnswers = candidate.roommate_answers?.map((a: any) => a.answer).join(', ') || '';
      const candidateInfo = `
        Profile: ${candidate.first_name} ${candidate.last_name}
        City: ${candidate.current_city}
        Budget: ${candidate.budget_min}-${candidate.budget_max}
        Move-in: ${candidate.move_in_date}
        Answers: ${candidateAnswers}
      `;

      // Call Lovable AI for semantic matching
      const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            {
              role: 'system',
              content: `You are an expert roommate matching AI. Analyze compatibility between two people based on their profiles, lifestyle, budget, and personality traits. Return ONLY a JSON object with this exact format:
{
  "score": <number 0-100>,
  "reasons": ["reason1", "reason2", "reason3"],
  "compatibility_areas": ["area1", "area2"],
  "concerns": ["concern1", "concern2"]
}`
            },
            {
              role: 'user',
              content: `Compare these two profiles for roommate compatibility:\n\nUser 1:\n${userInfo}\n\nUser 2:\n${candidateInfo}\n\nProvide compatibility analysis.`
            }
          ],
          temperature: 0.7,
        }),
      });

      if (aiResponse.ok) {
        const aiData = await aiResponse.json();
        const content = aiData.choices[0]?.message?.content || '{}';
        
        try {
          // Extract JSON from response (handle markdown code blocks)
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : { score: 50, reasons: [], compatibility_areas: [], concerns: [] };
          
          matches.push({
            profileId: candidate.id,
            profile: candidate,
            matchScore: analysis.score,
            reasons: analysis.reasons,
            compatibilityAreas: analysis.compatibility_areas,
            concerns: analysis.concerns,
          });
        } catch (parseError) {
          console.error('Error parsing AI response:', parseError);
          // Fallback to basic score
          matches.push({
            profileId: candidate.id,
            profile: candidate,
            matchScore: 50,
            reasons: ['AI analysis unavailable'],
            compatibilityAreas: [],
            concerns: [],
          });
        }
      }
    }

    // Sort by match score
    matches.sort((a, b) => b.matchScore - a.matchScore);

    console.log(`Found ${matches.length} matches for profile ${profileId}`);

    return new Response(
      JSON.stringify({ matches: matches.slice(0, 20) }), // Top 20 matches
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in AI matching:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
