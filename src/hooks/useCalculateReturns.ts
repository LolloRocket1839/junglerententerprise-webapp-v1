import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RevenueData {
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

interface CalculateReturnsResponse {
  success: boolean;
  property_id: string;
  period: {
    start: string;
    end: string;
  };
  revenue: {
    student: number;
    tourist: number;
    other: number;
    total: number;
  };
  expenses: {
    total: number;
    breakdown: {
      mortgage: number;
      tax: number;
      insurance: number;
      utilities: number;
      maintenance: number;
      platform_fees: number;
      management_fees: number;
    };
  };
  distribution: {
    net_income: number;
    investor_share_percentage: number;
    investor_total: number;
    jungle_rent_share: number;
  };
  investors: Array<{
    profile_id: string;
    investment_id: string;
    investment_amount: number;
    tokens: number;
    percentage: number;
    return_amount: number;
  }>;
  metrics: {
    roi_percentage: number;
    total_invested: number;
  };
  revenue_record_id: string;
}

export const useCalculateReturns = () => {
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateReturns = async (revenueData: RevenueData): Promise<CalculateReturnsResponse | null> => {
    setIsCalculating(true);
    try {
      const { data, error } = await supabase.functions.invoke('calculate-property-returns', {
        body: {
          property_id: revenueData.property_id,
          revenue_data: revenueData,
        },
      });

      if (error) {
        console.error('Error calculating returns:', error);
        toast.error('Failed to calculate property returns');
        return null;
      }

      if (!data.success) {
        toast.error(data.error || 'Failed to calculate returns');
        return null;
      }

      toast.success('Property returns calculated successfully');
      return data as CalculateReturnsResponse;
    } catch (error) {
      console.error('Error calling calculate-property-returns:', error);
      toast.error('An error occurred while calculating returns');
      return null;
    } finally {
      setIsCalculating(false);
    }
  };

  return {
    calculateReturns,
    isCalculating,
  };
};