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
  <Card className="group hover:border-primary/50 transition-all duration-200 bg-primary/5 border-primary/10">
    <CardContent className="p-3 md:p-4">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
          {icon}
        </div>
        <div className="space-y-0.5 min-w-0">
          <h4 className="font-semibold text-foreground text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
          {highlight && (
            <p className="text-xs font-medium text-primary mt-1">{highlight}</p>
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
      icon: <Percent className="w-5 h-5 text-primary" />,
      title: t('irpefDeduction'),
      description: t('irpefDeductionDesc'),
      highlight: t('irpefExample')
    },
    {
      icon: <Receipt className="w-5 h-5 text-primary" />,
      title: t('taxCredit'),
      description: t('taxCreditDesc')
    },
    {
      icon: <Coins className="w-5 h-5 text-primary" />,
      title: t('annualLimit'),
      description: t('annualLimitDesc')
    },
    {
      icon: <Scale className="w-5 h-5 text-primary" />,
      title: t('italianLaw'),
      description: t('italianLawDesc')
    }
  ];

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardContent className="p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div>
            <Badge className="mb-2 bg-green-500/10 text-green-600 border-green-500/20 text-xs">
              {t('taxBenefits2025')}
            </Badge>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {t('taxBenefitsTitle')}
            </h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">
              {t('taxBenefitsSubtitle')}
            </p>
          </div>
          <a 
            href="https://www.mimit.gov.it/it/impresa/competitivita-e-nuove-imprese/start-up-innovative" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline shrink-0"
          >
            {t('learnMore')}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Main Content: Benefits + Calculator */}
        <div className="grid lg:grid-cols-3 gap-4 mb-4">
          {/* Benefits Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-2 md:gap-3">
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
        <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 border border-muted">
          <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t('taxDisclaimer')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
