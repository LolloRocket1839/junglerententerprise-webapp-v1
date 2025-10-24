import { useState } from "react";
import InvestmentOpportunities from "@/components/invest/InvestmentOpportunities";
import { Phase2Placeholder } from "@/components/invest/Phase2Placeholder";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

// Simple tabs without Radix context issues
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
      <div className="sticky top-20 z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md rounded-sm">
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 p-1 bg-black/60 backdrop-blur-lg border border-white/10 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "text-sm py-2 px-4 rounded-md transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                activeTab === tab.id
                  ? "bg-primary text-white font-medium"
                  : "text-white/70 hover:text-white hover:bg-white/5"
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
        {activeTab === "my-investments" && <Phase2Placeholder />}
        {activeTab === "tokenization" && <Phase2Placeholder />}
        {activeTab === "analytics" && <Phase2Placeholder />}
      </div>
    </div>
  );
};
