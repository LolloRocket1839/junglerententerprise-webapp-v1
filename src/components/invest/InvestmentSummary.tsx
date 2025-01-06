import React from 'react';
import { DollarSign, TrendingUp, Building2, Calendar } from 'lucide-react';

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
  return (
    <div className="grid grid-cols-1 gap-4">
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
        value={`${units.toFixed(2)} unità`}
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