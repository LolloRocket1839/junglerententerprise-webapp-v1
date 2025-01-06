import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

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
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    const { investmentId }: EmailRequest = await req.json();

    // Fetch investment details with hub and profile information
    const { data: investment, error: investmentError } = await supabase
      .from('investments')
      .select(`
        *,
        hubs:hub_id (*),
        profiles:profile_id (*)
      `)
      .eq('id', investmentId)
      .single();

    if (investmentError || !investment) {
      throw new Error('Investment not found');
    }

    // Get user email from auth.users
    const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(investment.profile_id);
    
    if (userError || !user?.email) {
      throw new Error('User not found');
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