import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, TrendingUp } from "lucide-react";
import InvestmentOpportunities from "@/components/invest/InvestmentOpportunities";
import StatsCard from "@/components/invest/StatsCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Invest = () => {
  const [selectedTab, setSelectedTab] = useState("opportunities");
  const { t } = useLanguage();

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

  const setupRealtimeSubscription = useCallback(async () => {
    const channel = supabase.channel('investment-stats-v2', {
      config: {
        broadcast: { self: true },
        presence: { key: 'investment-stats' },
      }
    });

    try {
      channel
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'hubs'
          },
          () => {
            console.log('Received realtime update, refetching stats...');
            refetchStats();
          }
        )
        .subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            console.log('Successfully subscribed to realtime changes');
            await channel.track({ online: true });
          }
        });

      return () => {
        console.log('Cleaning up realtime subscription...');
        channel.unsubscribe();
      };
    } catch (error) {
      console.error('Error setting up realtime subscription:', error);
      return () => {};
    }
  }, [refetchStats]);

  useEffect(() => {
    const cleanup = setupRealtimeSubscription();
    return () => {
      cleanup.then(cleanupFn => cleanupFn());
    };
  }, [setupRealtimeSubscription]);

  return <div className="min-h-screen relative pb-20 md:pb-0">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-xl" />
      </div>

      <div className="relative container mx-auto px-4 pt-28 md:pt-32 pb-6 md:pb-8 space-y-6">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 text-left">
          {t('investmentDashboard')}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <StatsCard 
            title={t('totalProperties')} 
            value={statsLoading ? t('loading') : stats?.totalProperties.toString() || "0"} 
            icon={Building2} 
            trend="up" 
            className="glass-card backdrop-blur-md bg-black/40 border-white/10" 
          />
          <StatsCard 
            title={t('averageROI')} 
            value={statsLoading ? t('loading') : stats?.averageRoi || "0%"} 
            icon={TrendingUp} 
            trend="up" 
            className="glass-card backdrop-blur-md bg-black/40 border-white/10" 
          />
          <StatsCard 
            title={t('activeInvestors')} 
            value={statsLoading ? t('loading') : stats?.activeInvestors || "0"} 
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
                {t('opportunities')}
              </TabsTrigger>
              <TabsTrigger value="my-investments" className="text-sm data-[state=active]:bg-primary data-[state=active]:text-white">
                {t('myInvestments')}
              </TabsTrigger>
              <TabsTrigger value="tokenization" className="text-sm data-[state=active]:bg-primary data-[state=active]:text-white">
                {t('tokenization')}
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-sm data-[state=active]:bg-primary data-[state=active]:text-white">
                {t('analytics')}
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="opportunities" className="focus:outline-none">
            <InvestmentOpportunities />
          </TabsContent>
          
          <TabsContent value="my-investments" className="focus:outline-none">
            <Card className="glass-card backdrop-blur-md bg-black/40 border-white/10 p-6">
              <div className="text-white/60">
                {t('availablePhase2')}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="tokenization" className="focus:outline-none">
            <Card className="glass-card backdrop-blur-md bg-black/40 border-white/10 p-6">
              <div className="text-white/60">
                {t('availablePhase2')}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="focus:outline-none">
            <Card className="glass-card backdrop-blur-md bg-black/40 border-white/10 p-6">
              <div className="text-white/60">
                {t('availablePhase2')}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};

export default Invest;
