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
    <div className="space-y-4 bg-white/5 p-5 rounded-lg border border-white/10">
      <h4 className="font-semibold text-lg flex items-center gap-2 text-white">
        <ShieldCheck className="w-5 h-5 text-emerald-400" />
        Riepilogo Investimento
      </h4>
      <ul className="space-y-3">
        <li className="flex justify-between items-center">
          <span className="text-gray-300 font-medium">Importo:</span>
          <span className="text-lg font-semibold text-white">€{parseFloat(amount || "0").toLocaleString()}</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-gray-300 font-medium">ROI Previsto:</span>
          <span className="text-lg font-semibold text-emerald-400">{roi}%</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-gray-300 font-medium">Prima Distribuzione:</span>
          <span className="text-lg font-semibold text-white">{estimatedDate}</span>
        </li>
      </ul>
    </div>
  );
};

export default InvestmentSummaryBox;