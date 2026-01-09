import { useState } from "react";
import InvestmentOpportunities from "@/components/invest/InvestmentOpportunities";
import { MyInvestments } from "@/components/invest/MyInvestments";
import { TokenizationView } from "@/components/invest/TokenizationView";
import { InvestorAnalytics } from "@/components/invest/InvestorAnalytics";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export const SimpleInvestmentTabs = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("opportunities");

  const tabs = [
    { id: "opportunities", label: t('opportunities') },
    { id: "my-investments", label: t('myInvestments') },
    { id: "tokenization", label: t('tokenization') },
    { id: "analytics", label: t('analytics') }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Tab Navigation */}
      <div className="sticky top-20 z-50 bg-background/95 backdrop-blur-sm rounded-lg">
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 p-1 bg-muted border border-border rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "text-sm py-2 px-4 rounded-md transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground font-medium shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="focus:outline-none">
        {activeTab === "opportunities" && <InvestmentOpportunities />}
        {activeTab === "my-investments" && <MyInvestments />}
        {activeTab === "tokenization" && <TokenizationView />}
        {activeTab === "analytics" && <InvestorAnalytics />}
      </div>
    </div>
  );
};
