import React from 'react';
import { ShieldCheck, BarChart3, Wallet } from 'lucide-react';

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
    <div className="space-y-4 bg-black/20 p-6 rounded-xl border border-white/10 shadow-lg">
      <h4 className="font-bold text-xl flex items-center gap-2 text-white drop-shadow">
        <ShieldCheck className="w-5 h-5 text-emerald-400" />
        Riepilogo Investimento
      </h4>
      <ul className="grid grid-cols-1 gap-4">
        <li className="flex justify-between items-center p-3 bg-black/20 rounded-lg border border-white/5">
          <span className="text-gray-300 font-medium flex items-center gap-2">
            <Wallet className="w-4 h-4 text-emerald-400" />
            Importo:
          </span>
          <span className="text-lg font-bold text-white">
            €{parseFloat(amount || "0").toLocaleString()}
          </span>
        </li>
        <li className="flex justify-between items-center p-3 bg-black/20 rounded-lg border border-white/5">
          <span className="text-gray-300 font-medium flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            ROI Previsto:
          </span>
          <span className="text-lg font-bold text-emerald-400">
            {roi}%
          </span>
        </li>
        <li className="flex justify-between items-center p-3 bg-black/20 rounded-lg border border-white/5">
          <span className="text-gray-300 font-medium">
            Prima Distribuzione:
          </span>
          <span className="text-lg font-bold text-white">
            {estimatedDate}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default InvestmentSummaryBox;