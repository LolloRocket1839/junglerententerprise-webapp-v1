import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import QuickAmountButtons from './QuickAmountButtons';
import { toast } from "sonner";

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
  const [inputValue, setInputValue] = useState(amount.toString());

  useEffect(() => {
    setInputValue(amount.toString());
  }, [amount]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      if (numericValue < minInvestment) {
        toast.error(`L'importo minimo è €${minInvestment}`);
        return;
      }
      if (numericValue > maxInvestment) {
        toast.error(`L'importo massimo è €${maxInvestment}`);
        return;
      }
      onAmountChange(numericValue);
    }
  };

  const handleSliderChange = (value: number[]) => {
    onAmountChange(value[0]);
  };

  const calculateUnits = (amount: number) => {
    return (amount / 100).toFixed(2); // 100€ per unit
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm text-gray-300 mb-2 block">
          Importo Investimento (€)
        </label>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Input
              type="number"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              min={minInvestment}
              max={maxInvestment}
              step="100"
              className="flex-1"
              placeholder={`Min: €${minInvestment}`}
            />
            <span className="text-white font-mono w-24 text-right">
              €{parseFloat(inputValue).toLocaleString()}
            </span>
          </div>
          
          <Slider
            value={[amount]}
            onValueChange={handleSliderChange}
            max={maxInvestment}
            min={minInvestment}
            step={100}
            className="flex-1"
          />

          <div className="text-sm text-gray-300">
            Unità acquistate: {calculateUnits(amount)} unità
          </div>

          <QuickAmountButtons
            onSelect={onAmountChange}
            selectedAmount={amount}
            maxAmount={maxInvestment}
          />
        </div>
      </div>
    </div>
  );
};

export default InvestmentControls;