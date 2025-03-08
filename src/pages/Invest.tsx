
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { StatsSection } from "@/components/invest/StatsSection";
import { InvestmentTabs } from "@/components/invest/InvestmentTabs";
import BackgroundDecorations from "@/components/invest/BackgroundDecorations";

const Invest = () => {
  console.log("Invest component mounting");
  const { t } = useLanguage();

  useEffect(() => {
    console.log("Invest component mounted");
  }, []);

  return (
    <div className="relative min-h-screen">
      <BackgroundDecorations />

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-24 pb-12 space-y-8 md:space-y-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {t('investmentDashboard')}
        </h1>
        
        <StatsSection />
        <InvestmentTabs />
      </div>
    </div>
  );
};

export default Invest;
