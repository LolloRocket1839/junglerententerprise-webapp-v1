import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface PropertyRevenue {
  id: string;
  property_id: string;
  period_start: string;
  period_end: string;
  
  // Revenue Breakdown
  student_revenue: number;
  tourist_revenue: number;
  other_revenue: number;
  total_revenue: number;
  
  // Expenses
  mortgage_payment: number;
  property_tax: number;
  insurance: number;
  utilities: number;
  maintenance: number;
  platform_fees: number;
  management_fees: number;
  total_expenses: number;
  
  // Net Income
  net_income: number;
  
  // Distribution
  investor_distribution: number | null;
  jungle_rent_share: number | null;
  
  created_at: string;
  updated_at: string;
}

export interface RevenueBreakdown {
  totalRevenue: number;
  studentRevenue: number;
  touristRevenue: number;
  otherRevenue: number;
  totalExpenses: number;
  netIncome: number;
  investorShare: number;
  jungleRentShare: number;
  roi: number;
  periods: PropertyRevenue[];
}

export const usePropertyRevenue = (propertyId: string | null, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['property-revenue', propertyId],
    queryFn: async (): Promise<RevenueBreakdown | null> => {
      if (!propertyId) return null;

      try {
        // Fetch property details for investor_share_percentage
        const { data: property, error: propertyError } = await supabase
          .from('unified_properties')
          .select('investor_share_percentage, investment_goal, amount_raised')
          .eq('id', propertyId)
          .single();

        if (propertyError) {
          console.error('Error fetching property:', propertyError);
          throw propertyError;
        }

        // Fetch all revenue periods for this property
        const { data: revenues, error: revenueError } = await supabase
          .from('property_revenue_tracking')
          .select('*')
          .eq('property_id', propertyId)
          .order('period_start', { ascending: false });

        if (revenueError) {
          console.error('Error fetching revenue:', revenueError);
          throw revenueError;
        }

        if (!revenues || revenues.length === 0) {
          return {
            totalRevenue: 0,
            studentRevenue: 0,
            touristRevenue: 0,
            otherRevenue: 0,
            totalExpenses: 0,
            netIncome: 0,
            investorShare: 0,
            jungleRentShare: 0,
            roi: 0,
            periods: [],
          };
        }

        // Calculate totals
        const totalRevenue = revenues.reduce((sum, r) => sum + (r.total_revenue || 0), 0);
        const studentRevenue = revenues.reduce((sum, r) => sum + (r.student_revenue || 0), 0);
        const touristRevenue = revenues.reduce((sum, r) => sum + (r.tourist_revenue || 0), 0);
        const otherRevenue = revenues.reduce((sum, r) => sum + (r.other_revenue || 0), 0);
        const totalExpenses = revenues.reduce((sum, r) => sum + (r.total_expenses || 0), 0);
        const netIncome = revenues.reduce((sum, r) => sum + (r.net_income || 0), 0);

        // Calculate distribution
        const investorSharePercentage = property.investor_share_percentage || 70;
        const investorShare = (netIncome * investorSharePercentage) / 100;
        const jungleRentShare = netIncome - investorShare;

        // Calculate ROI based on amount raised
        const roi = property.amount_raised > 0 
          ? (investorShare / property.amount_raised) * 100 
          : 0;

        return {
          totalRevenue,
          studentRevenue,
          touristRevenue,
          otherRevenue,
          totalExpenses,
          netIncome,
          investorShare,
          jungleRentShare,
          roi,
          periods: revenues as PropertyRevenue[],
        };
      } catch (error) {
        console.error('Error in revenue query:', error);
        toast.error("Errore nel caricamento dei dati finanziari");
        return null;
      }
    },
    enabled: enabled && !!propertyId,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useAllPropertiesRevenue = () => {
  return useQuery({
    queryKey: ['all-properties-revenue'],
    queryFn: async () => {
      try {
        const { data: revenues, error } = await supabase
          .from('property_revenue_tracking')
          .select(`
            *,
            property:unified_properties(id, title, city, usage_mode)
          `)
          .order('period_start', { ascending: false });

        if (error) {
          console.error('Error fetching all revenues:', error);
          throw error;
        }

        return revenues;
      } catch (error) {
        console.error('Error in all revenues query:', error);
        toast.error("Errore nel caricamento dei dati finanziari");
        return [];
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};