import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, TrendingUp } from "lucide-react";
import InvestmentOpportunities from "@/components/invest/InvestmentOpportunities";
import StatsCard from "@/components/invest/StatsCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Invest = () => {
  // Fetch investment stats
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

      // Calculate stats from hubs data
      const totalProperties = hubs?.length || 0;
      const averageRoi = hubs?.reduce((acc, hub) => acc + (hub.rating || 0), 0) / totalProperties || 0;
      
      return {
        totalProperties,
        averageRoi: `${averageRoi.toFixed(1)}%`,
        activeInvestors: '1.2K', // This would come from a real calculation in production
      };
    }
  });

  return (
    <div className="min-h-screen relative pb-20">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-xl opacity-20" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-xl opacity-20" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-8 space-y-8">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-8 text-left">
          Investment Dashboard
        </h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Properties"
            value={statsLoading ? "Loading..." : stats?.totalProperties.toString() || "0"}
            icon={Building2}
            trend="up"
            className="h-full"
          />
          <StatsCard
            title="Average ROI"
            value={statsLoading ? "Loading..." : stats?.averageRoi || "0%"}
            icon={TrendingUp}
            trend="up"
            className="h-full"
          />
          <StatsCard
            title="Active Investors"
            value={statsLoading ? "Loading..." : stats?.activeInvestors || "0"}
            icon={Users}
            trend="up"
            className="h-full"
          />
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="opportunities" className="w-full space-y-8">
          <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 p-2 bg-white/5 backdrop-blur-sm rounded-lg">
            <TabsTrigger value="opportunities">
              Opportunities
            </TabsTrigger>
            <TabsTrigger value="my-investments">
              My Investments
            </TabsTrigger>
            <TabsTrigger value="tokenization">
              Tokenization
            </TabsTrigger>
            <TabsTrigger value="analytics">
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="opportunities" className="mt-8 focus:outline-none">
            <InvestmentOpportunities />
          </TabsContent>
          
          <TabsContent value="my-investments" className="mt-8 focus:outline-none">
            <Card className="glass p-6">
              <div className="text-white/60">
                Coming soon in Phase 2
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="tokenization" className="mt-8 focus:outline-none">
            <Card className="glass p-6">
              <div className="text-white/60">
                Coming soon in Phase 2
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-8 focus:outline-none">
            <Card className="glass p-6">
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