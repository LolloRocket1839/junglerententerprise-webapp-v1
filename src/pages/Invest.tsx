import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { StatsSection } from "@/components/invest/StatsSection";
import { SimpleInvestmentTabs } from "@/components/invest/SimpleInvestmentTabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Users } from "lucide-react";

const FeatureCard = ({ icon, title, description, badge }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}) => (
  <Card className="group hover:border-primary/50 hover:shadow-lg transition-all duration-300">
    <CardContent className="p-6">
      <div className="flex items-start space-x-4">
        <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            {badge && (
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                {badge}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Invest = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
      title: t('guaranteedReturns'),
      description: t('guaranteedReturnsDesc'),
      badge: "8-12%"
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: t('secureInvestments'),
      description: t('secureInvestmentsDesc'),
      badge: t('verified')
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: t('investorCommunity'),
      description: t('investorCommunityDesc'),
      badge: "1000+"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Content */}
      <div className="container mx-auto px-4 pt-24 pb-12 space-y-8 md:space-y-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            {t('investmentPlatform')}
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('investInFuture')}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-2 leading-relaxed">
            {t('smartRealEstate')}
          </p>
          <p className="text-lg text-primary font-medium">
            {t('startFrom')}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-muted/50 rounded-2xl p-6">
          <StatsSection />
        </div>

        {/* Investment Tabs */}
        <Card>
          <CardContent className="p-6">
            <SimpleInvestmentTabs />
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="text-center p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t('readyToInvest')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('readyToInvestDesc')}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>{t('zeroCommissions')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>{t('immediateLiquidity')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
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
