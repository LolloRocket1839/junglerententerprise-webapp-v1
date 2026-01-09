import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import InvestmentInput from './InvestmentInput';
import InvestmentConfirmationDialog from './InvestmentConfirmationDialog';
import QuickAmountButtons from './QuickAmountButtons';
import { useLanguage } from '@/contexts/LanguageContext';
import { investTranslations } from '@/translations/invest';

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
  const { language } = useLanguage();
  const t = (key: string) => investTranslations[language]?.[key] || key;
  
  const [inputValue, setInputValue] = useState(amount.toString());
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setInputValue(amount.toString());
  }, [amount]);

  const validateAmount = (value: number): string | null => {
    if (value < minInvestment) {
      return `${t('minAmountError')}${minInvestment}`;
    }
    if (value > maxInvestment) {
      return `${t('maxAmountError')}${maxInvestment}`;
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
      toast.success(t('amountConfirmed'));
    }
  };

  const handleSliderChange = (value: number[]) => {
    setError(null);
    onAmountChange(value[0]);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 1000);
  };

  const handleQuickAmountSelect = (selectedAmount: number) => {
    setError(null);
    onAmountChange(selectedAmount);
    setInputValue(selectedAmount.toString());
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
    <div className="space-y-5 sm:space-y-6 animate-fade-in">
      <div className="space-y-4">
        <label className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight antialiased block 
                         bg-gradient-to-r from-white via-white/90 to-white bg-clip-text 
                         drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {t('investmentAmount')}
        </label>
        
        <div className="flex flex-col gap-4">
          {/* Quick amount buttons - prominent on mobile */}
          <QuickAmountButtons
            onSelect={handleQuickAmountSelect}
            selectedAmount={amount}
            maxAmount={maxInvestment}
            minAmount={minInvestment}
          />

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
          
          {/* Slider with larger touch target on mobile */}
          <div className="relative pt-4 sm:pt-6 pb-2">
            {showTooltip && (
              <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1.5 rounded text-sm font-medium">
                €{amount.toLocaleString()}
              </div>
            )}
            <Slider
              value={[amount]}
              onValueChange={handleSliderChange}
              max={maxInvestment}
              min={minInvestment}
              step={100}
              className="relative z-10 touch-manipulation [&_[role=slider]]:h-6 [&_[role=slider]]:w-6 sm:[&_[role=slider]]:h-5 sm:[&_[role=slider]]:w-5"
            />
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-300 ease-out"
              style={{ 
                width: `${progressPercentage}%`,
                height: '2px',
                top: '20px'
              }}
            />
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-6 glass-card backdrop-blur-xl">
            <div>
              <span className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">{t('unitsPurchased')}</span>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                {calculateUnits(amount)} <span className="text-sm sm:text-base font-medium">{t('units')}</span>
              </span>
            </div>
            <div>
              <span className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">{t('estimatedAnnualReturn')}</span>
              <span className="text-lg sm:text-xl font-semibold text-green-500 tracking-tight">€{calculateExpectedReturn(amount)}</span>
            </div>
          </div>

          {/* Invest button - large touch target */}
          <Button 
            onClick={handleInvestClick}
            disabled={!!error || amount < minInvestment}
            className="w-full h-14 sm:h-16 text-base sm:text-lg lg:text-xl font-extrabold bg-gradient-to-r from-green-500 to-green-600 
                     active:scale-[0.98] hover:scale-[1.02] hover:shadow-xl transition-all duration-200 
                     disabled:opacity-50 disabled:hover:scale-100 
                     shadow-xl tracking-wide touch-manipulation
                     text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
                     uppercase"
          >
            {t('investNow')}
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
