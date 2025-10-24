
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useInvestmentStats = () => {
  return useQuery({
    queryKey: ['investment-stats'],
    queryFn: async () => {
      try {
        // Fetch investment properties from unified_properties
        const {
          data: properties,
          error: propertiesError
        } = await supabase
          .from('unified_properties')
          .select('*')
          .eq('status', 'active')
          .gt('investment_goal', 0);
        
        if (propertiesError) {
          console.error('Error fetching investment properties:', propertiesError);
          toast.error("Impossibile caricare le statistiche degli investimenti");
          return {
            totalProperties: 0,
            averageRoi: '0%',
            activeInvestors: '0'
          };
        }

        // Fetch total investors count
        const {
          data: investments,
          error: investmentsError
        } = await supabase
          .from('investments')
          .select('profile_id', { count: 'exact', head: false });

        if (investmentsError) {
          console.error('Error fetching investments:', investmentsError);
        }

        const totalProperties = properties?.length || 0;
        const averageRoi = properties?.reduce((acc, prop) => acc + (prop.investor_share_percentage || 0), 0) / totalProperties || 0;
        const uniqueInvestors = investments ? new Set(investments.map(inv => inv.profile_id)).size : 0;
        
        return {
          totalProperties,
          averageRoi: `${averageRoi.toFixed(1)}%`,
          activeInvestors: uniqueInvestors > 0 ? uniqueInvestors.toString() : '0'
        };
      } catch (error) {
        console.error('Error in stats query:', error);
        toast.error("Si è verificato un errore nel caricamento delle statistiche");
        return {
          totalProperties: 0,
          averageRoi: '0%',
          activeInvestors: '0'
        };
      }
    },
    retry: 1
  });
};
