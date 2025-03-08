
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from 'https://esm.sh/resend';

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

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
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    const { bookingId }: EmailRequest = await req.json();

    // Fetch booking details with property and guest information
    const { data: booking, error: bookingError } = await supabase
      .from('tourist_bookings')
      .select(`
        *,
        tourist_properties (title, address),
        guests (name, email)
      `)
      .eq('id', bookingId)
      .single();

    if (bookingError || !booking) {
      throw new Error('Booking not found');
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
