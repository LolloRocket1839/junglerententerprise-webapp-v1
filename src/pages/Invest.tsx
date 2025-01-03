import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, TrendingUp } from "lucide-react";
import InvestmentOpportunities from "@/components/invest/InvestmentOpportunities";
import StatsCard from "@/components/invest/StatsCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

const Invest = () => {
  const [selectedTab, setSelectedTab] = useState("opportunities");
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['investment-stats'],
    queryFn: async () => {
      const { data: hubs, error: hubsError } = await supabase
        .from('hubs')
        .select('*');

      if (hubsError) {
        toast.error("Failed to load investment stats");
        throw hubsError;
      }

      const totalProperties = hubs?.length || 0;
      const averageRoi = hubs?.reduce((acc, hub) => acc + (hub.rating || 0), 0) / totalProperties || 0;
      
      return {
        totalProperties,
        averageRoi: `${averageRoi.toFixed(1)}%`,
        activeInvestors: '1.2K',
      };
    }
  });

  return (
    <div className="min-h-screen relative pb-20 md:pb-0">
      {/* Decorative Elements with increased opacity for better contrast */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-xl" />
      </div>

      {/* Content with improved contrast and spacing */}
      <div className="relative container mx-auto px-4 py-6 md:py-8 space-y-6">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 text-left">
          Investment Dashboard
        </h1>
        
        {/* Stats Overview with improved mobile layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <StatsCard
            title="Total Properties"
            value={statsLoading ? "Loading..." : stats?.totalProperties.toString() || "0"}
            icon={Building2}
            trend="up"
            className="glass-card backdrop-blur-md bg-black/40 border-white/10"
          />
          <StatsCard
            title="Average ROI"
            value={statsLoading ? "Loading..." : stats?.averageRoi || "0%"}
            icon={TrendingUp}
            trend="up"
            className="glass-card backdrop-blur-md bg-black/40 border-white/10"
          />
          <StatsCard
            title="Active Investors"
            value={statsLoading ? "Loading..." : stats?.activeInvestors || "0"}
            icon={Users}
            trend="up"
            className="glass-card backdrop-blur-md bg-black/40 border-white/10"
          />
        </div>

        {/* Navigation Tabs with improved contrast and mobile interaction */}
        <Tabs 
          defaultValue="opportunities" 
          className="w-full space-y-6"
          value={selectedTab}
          onValueChange={(value) => {
            setSelectedTab(value);
            // Scroll to top when changing tabs on mobile
            if (window.innerWidth < 768) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 p-1 bg-black/60 backdrop-blur-lg border border-white/10 rounded-lg sticky top-16 z-10">
            <TabsTrigger 
              value="opportunities" 
              className="text-sm data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Opportunities
            </TabsTrigger>
            <TabsTrigger 
              value="my-investments" 
              className="text-sm data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              My Investments
            </TabsTrigger>
            <TabsTrigger 
              value="tokenization" 
              className="text-sm data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Tokenization
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="text-sm data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="opportunities" className="focus:outline-none">
            <InvestmentOpportunities />
          </TabsContent>
          
          <TabsContent value="my-investments" className="focus:outline-none">
            <Card className="glass-card backdrop-blur-md bg-black/40 border-white/10 p-6">
              <div className="text-white/60">
                Coming soon in Phase 2
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="tokenization" className="focus:outline-none">
            <Card className="glass-card backdrop-blur-md bg-black/40 border-white/10 p-6">
              <div className="text-white/60">
                Coming soon in Phase 2
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="focus:outline-none">
            <Card className="glass-card backdrop-blur-md bg-black/40 border-white/10 p-6">
              <div className="text-white/60">
                Coming soon in Phase 2
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Invest;