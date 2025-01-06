import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

interface InvestmentControlsProps {
  amount: number;
  onAmountChange: (amount: number) => void;
  minInvestment: number;
  maxInvestment: number;
  roi: number;
}

const InvestmentControls: React.FC<InvestmentControlsProps> = ({
  amount,
  onAmountChange,
  minInvestment,
  maxInvestment,
  roi,
}) => {
  const [inputValue, setInputValue] = useState(amount.toString());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setInputValue(amount.toString());
  }, [amount]);

  const validateAmount = (value: number): string | null => {
    if (value < minInvestment) {
      return `L'importo minimo è €${minInvestment}`;
    }
    if (value > maxInvestment) {
      return `L'importo massimo è €${maxInvestment}`;
    }
    return null;
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      const validationError = validateAmount(numericValue);
      setError(validationError);
      
      if (!validationError) {
        onAmountChange(numericValue);
      }
    }
  };

  const handleConfirmAmount = () => {
    const numericValue = parseFloat(inputValue);
    if (!isNaN(numericValue)) {
      const validationError = validateAmount(numericValue);
      if (validationError) {
        toast.error(validationError);
        return;
      }
      onAmountChange(numericValue);
      toast.success("Importo confermato");
    }
  };

  const handleSliderChange = (value: number[]) => {
    setError(null);
    onAmountChange(value[0]);
  };

  const calculateUnits = (amount: number) => {
    return (amount / 100).toFixed(2); // 100€ per unit
  };

  const calculateExpectedReturn = (amount: number) => {
    return ((roi / 100) * amount).toFixed(2);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <label className="text-sm text-gray-300 mb-2 block">
          Importo Investimento (€)
        </label>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                type="number"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                min={minInvestment}
                max={maxInvestment}
                step="100"
                className="pr-20"
                placeholder={`Min: €${minInvestment}`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-sm text-gray-400">EUR</span>
              </div>
            </div>
            <Button 
              onClick={handleConfirmAmount}
              className="whitespace-nowrap"
              variant="secondary"
            >
              <Check className="w-4 h-4 mr-2" />
              Conferma
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Slider
            value={[amount]}
            onValueChange={handleSliderChange}
            max={maxInvestment}
            min={minInvestment}
            step={100}
            className="flex-1"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <span className="block font-medium">Unità acquistate:</span>
              <span className="text-white">{calculateUnits(amount)} unità</span>
            </div>
            <div>
              <span className="block font-medium">Rendimento annuo stimato:</span>
              <span className="text-green-400">€{calculateExpectedReturn(amount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentControls;