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
  const [showTooltip, setShowTooltip] = useState(false);

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
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 1000);
  };

  const calculateUnits = (amount: number) => {
    const units = amount / 100;
    return Number.isInteger(units) ? units.toString() : units.toFixed(2);
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
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <label className="text-3xl font-bold text-white tracking-tight antialiased block 
                         bg-gradient-to-r from-white via-white/90 to-white bg-clip-text 
                         drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Importo Investimento (€)
        </label>
        
        <div className="flex flex-col gap-4">
          <InvestmentInput
            value={inputValue}
            onChange={handleInputChange}
            onConfirm={handleConfirmAmount}
          />

          {error && (
            <Alert variant="destructive" className="animate-scale-in">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm font-semibold">{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="relative pt-6 pb-2">
            {showTooltip && (
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                €{amount.toLocaleString()}
              </div>
            )}
            <Slider
              value={[amount]}
              onValueChange={handleSliderChange}
              max={maxInvestment}
              min={minInvestment}
              step={100}
              className="relative z-10"
            />
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-300 ease-out"
              style={{ 
                width: `${progressPercentage}%`,
                height: '2px',
                top: '24px'
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 glass-card backdrop-blur-xl">
            <div>
              <span className="block text-sm font-medium text-gray-300 mb-2">Unità acquistate:</span>
              <span className="text-2xl font-bold text-white tracking-tight drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] bg-gradient-to-r from-white via-white/90 to-white bg-clip-text">
                {calculateUnits(amount)} unità
              </span>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-300 mb-2">Rendimento annuo stimato:</span>
              <span className="text-xl font-semibold text-green-500 tracking-tight shadow-sm">€{calculateExpectedReturn(amount)}</span>
            </div>
          </div>

          <Button 
            onClick={handleInvestClick}
            disabled={!!error || amount < minInvestment}
            className="w-full py-6 text-lg font-bold bg-gradient-to-r from-green-500 to-green-600 
                     hover:scale-105 hover:shadow-lg transition-all duration-300 
                     disabled:opacity-50 disabled:hover:scale-100 shadow-xl px-8"
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