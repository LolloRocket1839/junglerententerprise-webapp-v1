import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface UserInvestment {
  id: string;
  amount: number;
  tokens: number;
  status: string;
  payment_status: string;
  created_at: string;
  property_id: string;
  property_title: string;
  property_city: string;
  property_images: string[];
  investor_share_percentage: number;
}

export interface InvestmentStats {
  totalInvested: number;
  totalTokens: number;
  propertiesCount: number;
  averageROI: number;
}

export const useUserInvestments = () => {
  const { session } = useAuth();
  
  return useQuery({
    queryKey: ['user-investments', session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select(`
          id,
          amount,
          tokens,
          status,
          payment_status,
          created_at,
          property_id,
          unified_properties (
            title,
            city,
            images,
            investor_share_percentage
          )
        `)
        .eq('profile_id', session!.user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user investments:', error);
        throw error;
      }

      return (data || []).map((inv: any) => ({
        id: inv.id,
        amount: inv.amount,
        tokens: inv.tokens,
        status: inv.status,
        payment_status: inv.payment_status,
        created_at: inv.created_at,
        property_id: inv.property_id,
        property_title: inv.unified_properties?.title || 'Proprietà',
        property_city: inv.unified_properties?.city || '',
        property_images: inv.unified_properties?.images || [],
        investor_share_percentage: inv.unified_properties?.investor_share_percentage || 70,
      })) as UserInvestment[];
    },
  });
};

export const useInvestmentStats = () => {
  const { session } = useAuth();
  
  return useQuery({
    queryKey: ['investment-stats-user', session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('investments')
        .select(`
          amount,
          tokens,
          property_id,
          unified_properties (
            investor_share_percentage
          )
        `)
        .eq('profile_id', session!.user.id)
        .eq('status', 'active');

      if (error) {
        console.error('Error fetching investment stats:', error);
        throw error;
      }

      const investments = data || [];
      const totalInvested = investments.reduce((sum, inv) => sum + (inv.amount || 0), 0);
      const totalTokens = investments.reduce((sum, inv) => sum + (inv.tokens || 0), 0);
      const uniqueProperties = new Set(investments.map(inv => inv.property_id)).size;
      
      const avgROI = investments.length > 0
        ? investments.reduce((sum, inv: any) => 
            sum + (inv.unified_properties?.investor_share_percentage || 70), 0
          ) / investments.length
        : 0;

      return {
        totalInvested,
        totalTokens,
        propertiesCount: uniqueProperties,
        averageROI: avgROI,
      } as InvestmentStats;
    },
  });
};
