
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from 'https://esm.sh/resend';

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  bookingId: string;
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

    const { bookingId }: EmailRequest = await req.json();
    
    // Verify the booking belongs to the authenticated user
    const { data: booking, error: bookingError } = await supabase
      .from('tourist_bookings')
      .select(`
        *,
        tourist_properties (title, address),
        guests!inner (name, email, profile_id)
      `)
      .eq('id', bookingId)
      .eq('guests.profile_id', user.id)
      .single();

    if (bookingError || !booking) {
      return new Response(
        JSON.stringify({ error: 'Booking not found or access denied' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const resend = new Resend(RESEND_API_KEY);
    
    const emailHtml = `
      <h2>Conferma Prenotazione</h2>
      <p>La tua prenotazione per ${booking.tourist_properties.title} è confermata!</p>
      <h3>Dettagli della prenotazione:</h3>
      <ul>
        <li>Check-in: ${new Date(booking.check_in).toLocaleDateString('it-IT')}</li>
        <li>Check-out: ${new Date(booking.check_out).toLocaleDateString('it-IT')}</li>
        <li>Ospiti: ${booking.number_of_guests}</li>
        <li>Totale: €${booking.total_price}</li>
      </ul>
      <p>Indirizzo: ${booking.tourist_properties.address}</p>
    `;

    await resend.emails.send({
      from: "Jungle <noreply@jungle.com>",
      to: [booking.guests.email],
      subject: `Conferma Prenotazione - ${booking.tourist_properties.title}`,
      html: emailHtml,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
};

serve(handler);
