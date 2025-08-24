import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  investmentId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { investmentId }: EmailRequest = await req.json();
    
    // Verify the investment belongs to the authenticated user
    const { data: investment, error: investmentError } = await supabase
      .from('investments')
      .select(`
        *,
        hubs:hub_id (*),
        profiles:profile_id (*)
      `)
      .eq('id', investmentId)
      .eq('profile_id', user.id)
      .single();

    if (investmentError || !investment) {
      return new Response(
        JSON.stringify({ error: 'Investment not found or access denied' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const emailHtml = `
      <h2>Conferma Investimento</h2>
      <p>Caro ${investment.profiles.first_name},</p>
      <p>Grazie per il tuo investimento in ${investment.hubs.name}!</p>
      <h3>Dettagli dell'investimento:</h3>
      <ul>
        <li>Importo: €${investment.amount.toLocaleString()}</li>
        <li>Token ricevuti: ${investment.tokens}</li>
        <li>ROI previsto: ${investment.hubs.rating}%</li>
      </ul>
      <p>Puoi monitorare il tuo investimento nella dashboard: <a href="${SUPABASE_URL}/invest?tab=my-investments">I miei investimenti</a></p>
      <p>Cordiali saluti,<br>Il team di Jungle</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Jungle <noreply@jungle.com>",
        to: [user.email],
        subject: `Conferma Investimento - ${investment.hubs.name}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to send email');
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
};

serve(handler);