import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, TrendingUp } from "lucide-react";
import InvestmentOpportunities from "@/components/invest/InvestmentOpportunities";
import StatsCard from "@/components/invest/StatsCard";

const Invest = () => {
  return (
    <div className="min-h-screen relative bg-gradient-dark">
      {/* Ambient Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[rgba(76,175,80,0.03)]" />
        <div className="absolute inset-0 bg-[rgba(24,41,35,0.5)]" />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white/90 mb-8 animate-fade-in">
          Investment Dashboard
        </h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatsCard
            title="Total Properties"
            value="24"
            icon={<Building2 className="w-6 h-6" />}
          />
          <StatsCard
            title="Average ROI"
            value="10%"
            icon={<TrendingUp className="w-6 h-6" />}
          />
          <StatsCard
            title="Active Investors"
            value="1,234"
            icon={<Users className="w-6 h-6" />}
          />
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="opportunities" className="w-full animate-fade-in">
          <TabsList className="w-full bg-white/[0.05] border border-white/[0.08] mb-6">
            <TabsTrigger 
              value="opportunities" 
              className="text-white/70 data-[state=active]:bg-success/15 
                       data-[state=active]:text-white/90 hover:bg-success/[0.08]"
            >
              Opportunities
            </TabsTrigger>
            <TabsTrigger 
              value="my-investments" 
              className="text-white/70 data-[state=active]:bg-success/15 
                       data-[state=active]:text-white/90 hover:bg-success/[0.08]"
            >
              My Investments
            </TabsTrigger>
            <TabsTrigger 
              value="tokenization" 
              className="text-white/70 data-[state=active]:bg-success/15 
                       data-[state=active]:text-white/90 hover:bg-success/[0.08]"
            >
              Tokenization
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="text-white/70 data-[state=active]:bg-success/15 
                       data-[state=active]:text-white/90 hover:bg-success/[0.08]"
            >
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="opportunities">
            <InvestmentOpportunities />
          </TabsContent>
          
          <TabsContent value="my-investments">
            <Card className="bg-white/[0.03] border border-white/[0.08] p-6">
              <div className="text-white/70">
                Coming soon in Phase 2
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="tokenization">
            <Card className="bg-white/[0.03] border border-white/[0.08] p-6">
              <div className="text-white/70">
                Coming soon in Phase 2
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card className="bg-white/[0.03] border border-white/[0.08] p-6">
              <div className="text-white/70">
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