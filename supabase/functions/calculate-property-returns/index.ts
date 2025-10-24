import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PropertyRevenueData {
  property_id: string;
  period_start: string;
  period_end: string;
  student_revenue: number;
  tourist_revenue: number;
  other_revenue: number;
  mortgage_payment: number;
  property_tax: number;
  insurance: number;
  utilities: number;
  maintenance: number;
  platform_fees: number;
  management_fees: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      }
    );

    const { property_id, revenue_data } = await req.json() as {
      property_id: string;
      revenue_data: PropertyRevenueData;
    };

    console.log('Calculating returns for property:', property_id);

    // 1. Fetch property details to get investor_share_percentage
    const { data: property, error: propertyError } = await supabaseClient
      .from('unified_properties')
      .select('investor_share_percentage, amount_raised, investment_goal')
      .eq('id', property_id)
      .single();

    if (propertyError) {
      throw new Error(`Failed to fetch property: ${propertyError.message}`);
    }

    console.log('Property data:', property);

    // 2. Calculate total revenue and expenses
    const totalRevenue = 
      revenue_data.student_revenue + 
      revenue_data.tourist_revenue + 
      revenue_data.other_revenue;

    const totalExpenses = 
      revenue_data.mortgage_payment +
      revenue_data.property_tax +
      revenue_data.insurance +
      revenue_data.utilities +
      revenue_data.maintenance +
      revenue_data.platform_fees +
      revenue_data.management_fees;

    const netIncome = totalRevenue - totalExpenses;

    console.log('Revenue breakdown:', {
      totalRevenue,
      totalExpenses,
      netIncome,
    });

    // 3. Calculate distribution based on investor_share_percentage
    const investorSharePercentage = property.investor_share_percentage || 70;
    const investorDistribution = (netIncome * investorSharePercentage) / 100;
    const jungleRentShare = netIncome - investorDistribution;

    console.log('Distribution:', {
      investorSharePercentage,
      investorDistribution,
      jungleRentShare,
    });

    // 4. Insert revenue tracking record
    const { data: revenueRecord, error: insertError } = await supabaseClient
      .from('property_revenue_tracking')
      .insert({
        property_id,
        period_start: revenue_data.period_start,
        period_end: revenue_data.period_end,
        student_revenue: revenue_data.student_revenue,
        tourist_revenue: revenue_data.tourist_revenue,
        other_revenue: revenue_data.other_revenue,
        mortgage_payment: revenue_data.mortgage_payment,
        property_tax: revenue_data.property_tax,
        insurance: revenue_data.insurance,
        utilities: revenue_data.utilities,
        maintenance: revenue_data.maintenance,
        platform_fees: revenue_data.platform_fees,
        management_fees: revenue_data.management_fees,
        investor_distribution: investorDistribution,
        jungle_rent_share: jungleRentShare,
      })
      .select()
      .single();

    if (insertError) {
      throw new Error(`Failed to insert revenue record: ${insertError.message}`);
    }

    console.log('Revenue record created:', revenueRecord.id);

    // 5. Fetch all investors for this property
    const { data: investments, error: investmentsError } = await supabaseClient
      .from('investments')
      .select('id, profile_id, amount, tokens')
      .eq('property_id', property_id)
      .eq('status', 'confirmed');

    if (investmentsError) {
      console.error('Failed to fetch investments:', investmentsError);
    }

    // 6. Calculate individual investor returns
    const investorReturns = investments?.map(investment => {
      const investmentPercentage = property.amount_raised > 0 
        ? (investment.amount / property.amount_raised) * 100 
        : 0;
      const individualReturn = (investorDistribution * investmentPercentage) / 100;
      
      return {
        profile_id: investment.profile_id,
        investment_id: investment.id,
        investment_amount: investment.amount,
        tokens: investment.tokens,
        percentage: investmentPercentage,
        return_amount: individualReturn,
      };
    }) || [];

    console.log('Investor returns calculated:', investorReturns.length);

    // 7. Calculate ROI
    const totalInvested = property.amount_raised || 0;
    const roi = totalInvested > 0 ? (investorDistribution / totalInvested) * 100 : 0;

    return new Response(
      JSON.stringify({
        success: true,
        property_id,
        period: {
          start: revenue_data.period_start,
          end: revenue_data.period_end,
        },
        revenue: {
          student: revenue_data.student_revenue,
          tourist: revenue_data.tourist_revenue,
          other: revenue_data.other_revenue,
          total: totalRevenue,
        },
        expenses: {
          total: totalExpenses,
          breakdown: {
            mortgage: revenue_data.mortgage_payment,
            tax: revenue_data.property_tax,
            insurance: revenue_data.insurance,
            utilities: revenue_data.utilities,
            maintenance: revenue_data.maintenance,
            platform_fees: revenue_data.platform_fees,
            management_fees: revenue_data.management_fees,
          },
        },
        distribution: {
          net_income: netIncome,
          investor_share_percentage: investorSharePercentage,
          investor_total: investorDistribution,
          jungle_rent_share: jungleRentShare,
        },
        investors: investorReturns,
        metrics: {
          roi_percentage: roi,
          total_invested: totalInvested,
        },
        revenue_record_id: revenueRecord.id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error calculating property returns:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});