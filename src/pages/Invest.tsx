
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvestmentOpportunities from "@/components/invest/InvestmentOpportunities";
import { StatsSection } from "@/components/invest/StatsSection";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Invest = () => {
  console.log("Invest component mounting");
  const [selectedTab, setSelectedTab] = useState("opportunities");
  const { t } = useLanguage();

  useEffect(() => {
    console.log("Invest component mounted");
  }, []);

  return (
    <div className="min-h-screen relative pb-20 md:pb-0">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-xl" />
      </div>

      <div className="relative container mx-auto px-4 pt-28 md:pt-32 pb-6 md:pb-8 space-y-6">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 text-left">
          {t('investmentDashboard')}
        </h1>
        
        <StatsSection />

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
    </div>
  );
};

export default Invest;
