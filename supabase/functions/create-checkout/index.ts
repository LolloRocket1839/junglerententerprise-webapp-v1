import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const isValidUUID = (uuid: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, property_id } = await req.json();
    
    // Validate property_id is a valid UUID
    if (!property_id || !isValidUUID(property_id)) {
      throw new Error('Invalid property ID format');
    }

    // Validate amount is a valid number
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount < 1000) {
      throw new Error('Invalid amount');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    // Get user from auth header
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    // Create investment record
    const { data: investment, error: investmentError } = await supabaseClient
      .from('investments')
      .insert({
        profile_id: user.id,
        property_id: property_id,
        amount: parsedAmount,
        tokens: Math.floor(parsedAmount / 1000),
        status: 'pending',
        payment_status: 'pending'
      })
      .select('*')
      .single();

    if (investmentError) {
      console.error('Investment creation error:', investmentError);
      throw new Error('Failed to create investment');
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Investment in Property',
              description: `Investment of €${parsedAmount}`,
            },
            unit_amount: Math.round(parsedAmount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/invest?success=true&investment_id=${investment.id}`,
      cancel_url: `${req.headers.get('origin')}/invest?canceled=true`,
      metadata: {
        investment_id: investment.id,
      },
    });

    // Update investment with payment ID
    await supabaseClient
      .from('investments')
      .update({ payment_id: session.id })
      .eq('id', investment.id);

    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});