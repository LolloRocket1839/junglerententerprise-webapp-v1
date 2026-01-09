import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickAmountButtonsProps {
  onSelect: (amount: number) => void;
  selectedAmount: number;
  maxAmount: number;
  minAmount?: number;
}

const QuickAmountButtons: React.FC<QuickAmountButtonsProps> = ({
  onSelect,
  selectedAmount,
  maxAmount,
  minAmount = 100
}) => {
  // Quick amounts for easy mobile selection
  const quickAmounts = [100, 500, 1000, 2500, 5000, 10000];
  
  // Filter amounts that are within range
  const availableAmounts = quickAmounts.filter(
    amount => amount >= minAmount && amount <= maxAmount
  );

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {availableAmounts.map((amount) => (
        <Button
          key={amount}
          variant={selectedAmount === amount ? "default" : "outline"}
          size="lg"
          onClick={() => onSelect(amount)}
          className={cn(
            "h-12 sm:h-14 text-sm sm:text-base font-bold transition-all duration-200",
            "active:scale-95 touch-manipulation",
            selectedAmount === amount
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
          )}
        >
          €{amount.toLocaleString('it-IT')}
        </Button>
      ))}
    </div>
  );
};

export default QuickAmountButtons;
