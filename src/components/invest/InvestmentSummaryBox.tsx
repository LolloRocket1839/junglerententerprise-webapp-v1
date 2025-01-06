import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface InvestmentSummaryBoxProps {
  amount: string;
  roi: string;
  estimatedDate: string;
}

const InvestmentSummaryBox: React.FC<InvestmentSummaryBoxProps> = ({
  amount,
  roi,
  estimatedDate,
}) => {
  return (
    <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
      <h4 className="font-medium flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-primary" />
        Riepilogo Investimento
      </h4>
      <ul className="space-y-2 text-sm">
        <li className="flex justify-between">
          <span className="text-muted-foreground">Importo:</span>
          <span className="font-medium">€{parseFloat(amount || "0").toLocaleString()}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-muted-foreground">ROI Previsto:</span>
          <span className="font-medium text-primary">{roi}%</span>
        </li>
        <li className="flex justify-between">
          <span className="text-muted-foreground">Prima Distribuzione:</span>
          <span className="font-medium">{estimatedDate}</span>
        </li>
      </ul>
    </div>
  );
};

export default InvestmentSummaryBox;