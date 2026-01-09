import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface PortfolioInvestment {
  id: string;
  amount: number;
  tokens: number;
  status: string;
  created_at: string;
  property: {
    id: string;
    title: string;
    address: string;
    city: string;
    investor_share_percentage: number | null;
    images: string[] | null;
  } | null;
}

export interface InvestorPortfolio {
  totalInvested: number;
  propertiesCount: number;
  investments: PortfolioInvestment[];
}

export function useInvestorPortfolio() {
  return useQuery({
    queryKey: ['investor-portfolio'],
    queryFn: async (): Promise<InvestorPortfolio> => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return {
          totalInvested: 0,
          propertiesCount: 0,
          investments: [],
        };
      }

      // Fetch investments with property details
      const { data: investments, error } = await supabase
        .from('investments')
        .select(`
          id,
          amount,
          tokens,
          status,
          created_at,
          property_id,
          unified_properties (
            id,
            title,
            address,
            city,
            investor_share_percentage,
            images
          )
        `)
        .eq('profile_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching portfolio:', error);
        throw error;
      }

      // Calculate stats
      const totalInvested = investments?.reduce((sum, inv) => sum + (inv.amount || 0), 0) || 0;
      
      // Get unique property IDs
      const uniquePropertyIds = new Set(investments?.map(inv => inv.property_id).filter(Boolean));
      const propertiesCount = uniquePropertyIds.size;

      // Map investments with property data
      const mappedInvestments: PortfolioInvestment[] = (investments || []).map(inv => ({
        id: inv.id,
        amount: inv.amount,
        tokens: inv.tokens,
        status: inv.status,
        created_at: inv.created_at,
        property: inv.unified_properties as PortfolioInvestment['property'],
      }));

      return {
        totalInvested,
        propertiesCount,
        investments: mappedInvestments,
      };
    },
  });
}
