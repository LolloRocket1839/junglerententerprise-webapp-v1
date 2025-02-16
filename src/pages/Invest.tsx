
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, TrendingUp } from "lucide-react";
import InvestmentOpportunities from "@/components/invest/InvestmentOpportunities";
import StatsCard from "@/components/invest/StatsCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";

const Invest = () => {
  const [selectedTab, setSelectedTab] = useState("opportunities");
  const channelRef = useRef<any>(null);

  const {
    data: stats,
    isLoading: statsLoading,
    refetch: refetchStats
  } = useQuery({
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

  // Imposta il listener per i cambiamenti realtime
  useEffect(() => {
    // Cleanup any existing channel before creating a new one
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    channelRef.current = supabase.channel('investment-stats')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'hubs'
        },
        () => {
          refetchStats();
        }
      )
      .subscribe((status: string) => {
        if (status === 'SUBSCRIBED') {
          console.log('Successfully subscribed to realtime changes');
        }
      });

    return () => {
      // Cleanup: rimuovi il channel quando il componente viene smontato
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [refetchStats]);

  return <div className="min-h-screen relative pb-20 md:pb-0">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-xl" />
      </div>

      <div className="relative container mx-auto px-4 pt-28 md:pt-32 pb-6 md:pb-8 space-y-6">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 text-left">
          Dashboard Investimenti
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <StatsCard 
            title="Proprietà Totali" 
            value={statsLoading ? "Caricamento..." : stats?.totalProperties.toString() || "0"} 
            icon={Building2} 
            trend="up" 
            className="glass-card backdrop-blur-md bg-black/40 border-white/10" 
          />
          <StatsCard 
            title="ROI Medio" 
            value={statsLoading ? "Caricamento..." : stats?.averageRoi || "0%"} 
            icon={TrendingUp} 
            trend="up" 
            className="glass-card backdrop-blur-md bg-black/40 border-white/10" 
          />
          <StatsCard 
            title="Investitori Attivi" 
            value={statsLoading ? "Caricamento..." : stats?.activeInvestors || "0"} 
            icon={Users} 
            trend="up" 
            className="glass-card backdrop-blur-md bg-black/40 border-white/10" 
          />
        </div>

        <Tabs defaultValue="opportunities" className="w-full space-y-6" value={selectedTab} onValueChange={value => {
          setSelectedTab(value);
          if (window.innerWidth < 768) {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }
        }}>
          <div className="sticky top-20 z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md mx-0 my-0 py-0 px-0 rounded-sm">
            <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 p-1 bg-black/60 backdrop-blur-lg border border-white/10 rounded-lg">
              <TabsTrigger value="opportunities" className="text-sm data-[state=active]:bg-primary data-[state=active]:text-white">
                Opportunità
              </TabsTrigger>
              <TabsTrigger value="my-investments" className="text-sm data-[state=active]:bg-primary data-[state=active]:text-white">
                I Miei Investimenti
              </TabsTrigger>
              <TabsTrigger value="tokenization" className="text-sm data-[state=active]:bg-primary data-[state=active]:text-white">
                Tokenizzazione
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-sm data-[state=active]:bg-primary data-[state=active]:text-white">
                Analisi
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="opportunities" className="focus:outline-none">
            <InvestmentOpportunities />
          </TabsContent>
          
          <TabsContent value="my-investments" className="focus:outline-none">
            <Card className="glass-card backdrop-blur-md bg-black/40 border-white/10 p-6">
              <div className="text-white/60">
                Disponibile nella Fase 2
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="tokenization" className="focus:outline-none">
            <Card className="glass-card backdrop-blur-md bg-black/40 border-white/10 p-6">
              <div className="text-white/60">
                Disponibile nella Fase 2
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="focus:outline-none">
            <Card className="glass-card backdrop-blur-md bg-black/40 border-white/10 p-6">
              <div className="text-white/60">
                Disponibile nella Fase 2
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};

export default Invest;
