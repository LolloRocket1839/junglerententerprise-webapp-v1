import React from 'react';
import { Slider } from "@/components/ui/slider";
import QuickAmountButtons from './QuickAmountButtons';

interface InvestmentControlsProps {
  amount: number;
  onAmountChange: (amount: number) => void;
  minInvestment: number;
  maxInvestment: number;
}

const InvestmentControls: React.FC<InvestmentControlsProps> = ({
  amount,
  onAmountChange,
  minInvestment,
  maxInvestment,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm text-gray-300 mb-2 block">
          Importo Investimento (€)
        </label>
        <div className="flex items-center gap-4">
          <Slider
            value={[amount]}
            onValueChange={(value) => onAmountChange(value[0])}
            max={maxInvestment}
            min={minInvestment}
            step={100}
            className="flex-1"
          />
          <span className="text-white font-mono w-24 text-right">
            €{amount}
          </span>
        </div>
        <QuickAmountButtons
          onSelect={onAmountChange}
          selectedAmount={amount}
        />
      </div>
    </div>
  );
};

export default InvestmentControls;