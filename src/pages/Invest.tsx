import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { StatsSection } from "@/components/invest/StatsSection";
import { SimpleInvestmentTabs } from "@/components/invest/SimpleInvestmentTabs";
import { TaxBenefitsSection } from "@/components/invest/TaxBenefitsSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Invest = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Content */}
      <div className="container mx-auto px-4 pt-16 md:pt-20 pb-8 md:pb-12 space-y-6 md:space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs">
            {t('investmentPlatform')}
          </Badge>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            {t('investInFuture')}
          </h1>
          
          <p className="text-base md:text-lg text-muted-foreground mb-1.5 leading-relaxed">
            {t('smartRealEstate')}
          </p>
          <p className="text-sm md:text-base text-primary font-medium">
            {t('startFrom')}
          </p>
        </div>

        {/* Tax Benefits Section */}
        <TaxBenefitsSection />

        {/* Stats Section */}
        <div className="bg-muted/50 rounded-xl p-4 md:p-5">
          <StatsSection />
        </div>

        {/* Investment Tabs */}
        <Card>
          <CardContent className="p-4 md:p-5">
            <SimpleInvestmentTabs />
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="text-center p-5 md:p-6">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              {t('readyToInvest')}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('readyToInvestDesc')}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1.5">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span>{t('zeroCommissions')}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span>{t('immediateLiquidity')}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span>{t('support247')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Invest;
