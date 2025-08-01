import React from 'react';
import { DollarSign, TrendingUp, Building2, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { investTranslations } from '@/translations/invest';

interface InvestmentSummaryProps {
  amount: number;
  roi: string;
  units: number;
  estimatedDate: string;
}

const SummaryItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm">
    <div className="p-2 rounded-full bg-primary/20">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-300">{label}</p>
      <p className="text-2xl font-semibold text-white tracking-tight">{value}</p>
    </div>
  </div>
);

const InvestmentSummary: React.FC<InvestmentSummaryProps> = ({
  amount,
  roi,
  units,
  estimatedDate,
}) => {
  const { language } = useLanguage();
  const t = (key: string) => investTranslations[language]?.[key] || key;
  
  // Format units to remove decimal places if it's a whole number
  const formattedUnits = Number.isInteger(units) ? units.toString() : units.toFixed(2);

  return (
    <div className="grid grid-cols-1 gap-4">
      <SummaryItem
        icon={DollarSign}
        label={t('selectedAmount')}
        value={`€${amount.toLocaleString()}`}
      />
      <SummaryItem
        icon={TrendingUp}
        label={t('estimatedROI')}
        value={roi}
      />
      <SummaryItem
        icon={Building2}
        label={t('purchasedUnits')}
        value={`${formattedUnits} ${t('units')}`}
      />
      <SummaryItem
        icon={Calendar}
        label={t('firstDistribution')}
        value={estimatedDate}
      />
    </div>
  );
};

export default InvestmentSummary;