import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, TrendingUp } from "lucide-react";
import InvestmentOpportunities from "@/components/invest/InvestmentOpportunities";
import StatsCard from "@/components/invest/StatsCard";

const Invest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#065f46] to-[#047857] px-4 py-8">
      {/* Stats Overview */}
      <div className="container mx-auto mb-8">
        <h1 className="text-4xl font-bold text-white mb-8 animate-fade-in">
          Investment Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            title="Total Properties"
            value="24"
            icon={<Building2 className="w-6 h-6" />}
          />
          <StatsCard
            title="Average ROI"
            value="8.5%"
            icon={<TrendingUp className="w-6 h-6" />}
          />
          <StatsCard
            title="Active Investors"
            value="1,234"
            icon={<Users className="w-6 h-6" />}
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto">
        <Tabs defaultValue="opportunities" className="w-full">
          <TabsList className="w-full bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="opportunities" className="text-white">
              Opportunities
            </TabsTrigger>
            <TabsTrigger value="my-investments" className="text-white">
              My Investments
            </TabsTrigger>
            <TabsTrigger value="tokenization" className="text-white">
              Tokenization
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white">
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="opportunities">
            <InvestmentOpportunities />
          </TabsContent>
          <TabsContent value="my-investments">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <div className="p-6 text-white/60">
                Coming soon in Phase 2
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="tokenization">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <div className="p-6 text-white/60">
                Coming soon in Phase 2
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="analytics">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <div className="p-6 text-white/60">
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