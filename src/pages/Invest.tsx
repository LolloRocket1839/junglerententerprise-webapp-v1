import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, TrendingUp } from "lucide-react";
import InvestmentOpportunities from "@/components/invest/InvestmentOpportunities";
import StatsCard from "@/components/invest/StatsCard";

const Invest = () => {
  return (
    <div className="min-h-screen relative">
      {/* Decorative Elements - Optimized for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-2xl md:blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-2xl md:blur-3xl opacity-50" />
      </div>

      {/* Content */}
      <div className="relative px-4 py-4 md:container md:mx-auto md:py-8">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-8 text-left">
          Investment Dashboard
        </h1>
        
        {/* Stats Overview - Mobile optimized grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
          <StatsCard
            title="Total Properties"
            value="24"
            icon={Building2}
            trend="up"
          />
          <StatsCard
            title="Average ROI"
            value="10%"
            icon={TrendingUp}
            trend="up"
          />
          <StatsCard
            title="Active Investors"
            value="1,234"
            icon={Users}
            trend="up"
            className="col-span-1 sm:col-span-2 md:col-span-1"
          />
        </div>

        {/* Navigation Tabs - Mobile optimized */}
        <Tabs defaultValue="opportunities" className="w-full space-y-4">
          <TabsList className="w-full grid grid-cols-2 md:inline-flex gap-2 p-1 bg-white/5 backdrop-blur-sm rounded-lg">
            <TabsTrigger 
              value="opportunities" 
              className="px-4 py-2 text-sm md:text-base"
            >
              Opportunities
            </TabsTrigger>
            <TabsTrigger 
              value="my-investments" 
              className="px-4 py-2 text-sm md:text-base"
            >
              My Investments
            </TabsTrigger>
            <TabsTrigger 
              value="tokenization" 
              className="px-4 py-2 text-sm md:text-base"
            >
              Tokenization
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="px-4 py-2 text-sm md:text-base"
            >
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="opportunities" className="mt-4 focus:outline-none">
            <InvestmentOpportunities />
          </TabsContent>
          
          <TabsContent value="my-investments" className="mt-4 focus:outline-none">
            <Card className="glass p-4">
              <div className="text-white/60">
                Coming soon in Phase 2
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="tokenization" className="mt-4 focus:outline-none">
            <Card className="glass p-4">
              <div className="text-white/60">
                Coming soon in Phase 2
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-4 focus:outline-none">
            <Card className="glass p-4">
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