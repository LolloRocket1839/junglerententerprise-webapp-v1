import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Percent, Receipt, Coins, Scale, Info, ExternalLink } from "lucide-react";
import { TaxCalculator } from "./TaxCalculator";

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
}

const BenefitCard = ({ icon, title, description, highlight }: BenefitCardProps) => (
  <Card className="group hover:border-primary/50 hover:shadow-lg transition-all duration-300 bg-primary/5 border-primary/10">
    <CardContent className="p-5">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
          {icon}
        </div>
        <div className="space-y-1">
          <h4 className="font-semibold text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
          {highlight && (
            <p className="text-sm font-medium text-primary mt-2">{highlight}</p>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

export const TaxBenefitsSection = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: <Percent className="w-6 h-6 text-primary" />,
      title: t('irpefDeduction'),
      description: t('irpefDeductionDesc'),
      highlight: t('irpefExample')
    },
    {
      icon: <Receipt className="w-6 h-6 text-primary" />,
      title: t('taxCredit'),
      description: t('taxCreditDesc')
    },
    {
      icon: <Coins className="w-6 h-6 text-primary" />,
      title: t('annualLimit'),
      description: t('annualLimitDesc')
    },
    {
      icon: <Scale className="w-6 h-6 text-primary" />,
      title: t('italianLaw'),
      description: t('italianLawDesc')
    }
  ];

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardContent className="p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <Badge className="mb-3 bg-green-500/10 text-green-600 border-green-500/20">
              {t('taxBenefits2025')}
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {t('taxBenefitsTitle')}
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              {t('taxBenefitsSubtitle')}
            </p>
          </div>
          <a 
            href="https://www.mimit.gov.it/it/impresa/competitivita-e-nuove-imprese/start-up-innovative" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline shrink-0"
          >
            {t('learnMore')}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Main Content: Benefits + Calculator */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Benefits Grid */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>

          {/* Tax Calculator */}
          <div className="lg:col-span-1">
            <TaxCalculator />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-muted">
          <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            {t('taxDisclaimer')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
