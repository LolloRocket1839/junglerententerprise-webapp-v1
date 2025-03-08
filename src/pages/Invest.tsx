
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
    <div className="relative min-h-screen">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse"
          style={{ animationDuration: '5s' }}
        />
      </div>

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
