
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { StatsSection } from "@/components/invest/StatsSection";
import { InvestmentTabs } from "@/components/invest/InvestmentTabs";

const Invest = () => {
  console.log("Invest component mounting");
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
        <InvestmentTabs />
      </div>
    </div>
  );
};

export default Invest;
