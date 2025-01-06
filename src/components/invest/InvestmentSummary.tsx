import React from 'react';
import { DollarSign, TrendingUp, Building2, Calendar } from 'lucide-react';

interface InvestmentSummaryProps {
  amount: number;
  roi: string;
  units: number;
  estimatedDate: string;
}

const SummaryItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
    <div className="p-2 rounded-full bg-primary/20">
      <Icon className="w-4 h-4 text-primary" />
    </div>
    <div>
      <p className="text-sm text-white/60">{label}</p>
      <p className="text-base font-semibold text-white">{value}</p>
    </div>
  </div>
);

const InvestmentSummary: React.FC<InvestmentSummaryProps> = ({
  amount,
  roi,
  units,
  estimatedDate,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
      <SummaryItem
        icon={DollarSign}
        label="Importo selezionato"
        value={`€${amount.toLocaleString()}`}
      />
      <SummaryItem
        icon={TrendingUp}
        label="ROI stimato"
        value={roi}
      />
      <SummaryItem
        icon={Building2}
        label="Unità acquistate"
        value={`${units} unità`}
      />
      <SummaryItem
        icon={Calendar}
        label="Prima distribuzione"
        value={estimatedDate}
      />
    </div>
  );
};

export default InvestmentSummary;