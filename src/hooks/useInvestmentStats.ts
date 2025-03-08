
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useInvestmentStats = () => {
  return useQuery({
    queryKey: ['investment-stats'],
    queryFn: async () => {
      try {
        const {
          data: hubs,
          error: hubsError
        } = await supabase.from('hubs').select('*');
        
        if (hubsError) {
          console.error('Error fetching hubs:', hubsError);
          toast.error("Impossibile caricare le statistiche degli investimenti");
          return {
            totalProperties: 0,
            averageRoi: '0%',
            activeInvestors: '0'
          };
        }

        const totalProperties = hubs?.length || 0;
        const averageRoi = hubs?.reduce((acc, hub) => acc + (hub.rating || 0), 0) / totalProperties || 0;
        
        return {
          totalProperties,
          averageRoi: `${averageRoi.toFixed(1)}%`,
          activeInvestors: '1.2K'
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
