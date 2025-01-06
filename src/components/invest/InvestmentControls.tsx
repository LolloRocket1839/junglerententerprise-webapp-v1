import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import InvestmentInput from './InvestmentInput';
import InvestmentConfirmationDialog from './InvestmentConfirmationDialog';

interface InvestmentControlsProps {
  amount: number;
  onAmountChange: (amount: number) => void;
  minInvestment: number;
  maxInvestment: number;
  roi: number;
  onInvest: () => void;
}

const InvestmentControls: React.FC<InvestmentControlsProps> = ({
  amount,
  onAmountChange,
  minInvestment,
  maxInvestment,
  roi,
  onInvest
}) => {
  const [inputValue, setInputValue] = useState(amount.toString());
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

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
    return (amount / 100).toFixed(2);
  };

  const calculateExpectedReturn = (amount: number) => {
    return ((roi / 100) * amount).toFixed(2);
  };

  const handleInvestClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmInvestment = () => {
    setShowConfirmation(false);
    onInvest();
  };

  const progressPercentage = (amount / maxInvestment) * 100;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-xl font-bold text-white tracking-wide block">
          Importo Investimento (€)
        </label>
        
        <div className="flex flex-col gap-4">
          <InvestmentInput
            value={inputValue}
            onChange={handleInputChange}
            onConfirm={handleConfirmAmount}
          />

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm font-semibold">{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="relative pt-6 pb-2">
            <Slider
              value={[amount]}
              onValueChange={handleSliderChange}
              max={maxInvestment}
              min={minInvestment}
              step={100}
              className="relative z-10"
            />
            <div 
              className="absolute inset-y-0 left-0 bg-green-500/30 rounded-full transition-all duration-300 ease-out"
              style={{ 
                width: `${progressPercentage}%`,
                height: '2px',
                top: '24px'
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-black/20 rounded-lg backdrop-blur-sm">
            <div>
              <span className="block text-sm font-medium text-gray-300 mb-1">Unità acquistate:</span>
              <span className="text-2xl font-semibold text-white tracking-tight">{calculateUnits(amount)} unità</span>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-300 mb-1">Rendimento annuo stimato:</span>
              <span className="text-2xl font-semibold text-green-500 tracking-tight">€{calculateExpectedReturn(amount)}</span>
            </div>
          </div>

          <Button 
            onClick={handleInvestClick}
            disabled={!!error || amount < minInvestment}
            className="w-full py-6 text-lg font-bold bg-green-500 hover:bg-green-600 
                     transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 
                     disabled:hover:scale-100 shadow-lg shadow-green-500/20"
          >
            Investi Ora
          </Button>
        </div>
      </div>

      <InvestmentConfirmationDialog
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        amount={amount}
        units={parseFloat(calculateUnits(amount))}
        expectedReturn={`€${calculateExpectedReturn(amount)}`}
        onConfirm={handleConfirmInvestment}
      />
    </div>
  );
};

export default InvestmentControls;