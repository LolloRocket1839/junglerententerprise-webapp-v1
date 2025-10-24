import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvestmentOpportunities from "@/components/invest/InvestmentOpportunities";
import { Phase2Placeholder } from "@/components/invest/Phase2Placeholder";
import { useLanguage } from "@/contexts/LanguageContext";
import { Suspense } from "react";

export const InvestmentTabs = () => {
  const { t } = useLanguage();

  return (
    <Suspense fallback={<div className="text-center text-white p-8">Loading...</div>}>
      <Tabs defaultValue="opportunities" className="w-full space-y-6">
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
          <Phase2Placeholder />
        </TabsContent>
        
        <TabsContent value="tokenization" className="focus:outline-none">
          <Phase2Placeholder />
        </TabsContent>
        
        <TabsContent value="analytics" className="focus:outline-none">
          <Phase2Placeholder />
        </TabsContent>
      </Tabs>
    </Suspense>
  );
};

