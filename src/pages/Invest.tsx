import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, TrendingUp } from "lucide-react";
import InvestmentOpportunities from "@/components/invest/InvestmentOpportunities";
import StatsCard from "@/components/invest/StatsCard";

const Invest = () => {
  return (
    <div className="min-h-screen relative">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float-slower" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-4 md:py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-8 animate-fade-in">
          Investment Dashboard
        </h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
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
            className="col-span-2 md:col-span-1"
          />
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="opportunities" className="w-full animate-fade-in">
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-full md:w-auto glass mb-4 md:mb-6 inline-flex whitespace-nowrap">
              <TabsTrigger value="opportunities" className="text-white px-3 md:px-4">
                Opportunities
              </TabsTrigger>
              <TabsTrigger value="my-investments" className="text-white px-3 md:px-4">
                My Investments
              </TabsTrigger>
              <TabsTrigger value="tokenization" className="text-white px-3 md:px-4">
                Tokenization
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-white px-3 md:px-4">
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="opportunities">
            <InvestmentOpportunities />
          </TabsContent>
          
          <TabsContent value="my-investments">
            <Card className="glass p-4 md:p-6">
              <div className="text-white/60">
                Coming soon in Phase 2
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="tokenization">
            <Card className="glass p-4 md:p-6">
              <div className="text-white/60">
                Coming soon in Phase 2
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card className="glass p-4 md:p-6">
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