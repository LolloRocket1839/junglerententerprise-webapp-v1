import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, TrendingUp } from "lucide-react";
import InvestmentOpportunities from "@/components/invest/InvestmentOpportunities";
import StatsCard from "@/components/invest/StatsCard";

const Invest = () => {
  return (
    <div className="min-h-screen relative pb-20">
      {/* Decorative Elements - Reduced blur and opacity for better readability */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-xl opacity-30" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-xl opacity-30" />
      </div>

      {/* Content - Improved mobile spacing */}
      <div className="relative px-4 py-6 md:container md:mx-auto md:py-8">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-8 text-left">
          Investment Dashboard
        </h1>
        
        {/* Stats Overview - Improved grid spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatsCard
            title="Total Properties"
            value="24"
            icon={Building2}
            trend="up"
            className="h-full"
          />
          <StatsCard
            title="Average ROI"
            value="10%"
            icon={TrendingUp}
            trend="up"
            className="h-full"
          />
          <StatsCard
            title="Active Investors"
            value="1,234"
            icon={Users}
            trend="up"
            className="h-full"
          />
        </div>

        {/* Navigation Tabs - Improved mobile layout */}
        <Tabs defaultValue="opportunities" className="w-full space-y-6">
          <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 p-1 bg-white/5 backdrop-blur-sm rounded-lg">
            <TabsTrigger 
              value="opportunities" 
              className="px-3 py-2 text-sm"
            >
              Opportunities
            </TabsTrigger>
            <TabsTrigger 
              value="my-investments" 
              className="px-3 py-2 text-sm"
            >
              My Investments
            </TabsTrigger>
            <TabsTrigger 
              value="tokenization" 
              className="px-3 py-2 text-sm"
            >
              Tokenization
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="px-3 py-2 text-sm"
            >
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="opportunities" className="mt-6 focus:outline-none">
            <InvestmentOpportunities />
          </TabsContent>
          
          <TabsContent value="my-investments" className="mt-6 focus:outline-none">
            <Card className="glass p-6">
              <div className="text-white/60">
                Coming soon in Phase 2
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="tokenization" className="mt-6 focus:outline-none">
            <Card className="glass p-6">
              <div className="text-white/60">
                Coming soon in Phase 2
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6 focus:outline-none">
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