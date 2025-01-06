import React from 'react';
import { Button } from "@/components/ui/button";

interface QuickAmountButtonsProps {
  onSelect: (amount: number) => void;
  selectedAmount: number;
  maxAmount: number;
}

const QuickAmountButtons: React.FC<QuickAmountButtonsProps> = ({
  onSelect,
  selectedAmount,
  maxAmount
}) => {
  // Calculate suggested amounts based on property value
  const suggestedAmounts = [
    5000,
    10000,
    Math.min(25000, maxAmount),
    Math.min(50000, maxAmount)
  ].filter(amount => amount <= maxAmount);

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {suggestedAmounts.map((amount) => (
        <Button
          key={amount}
          variant={selectedAmount === amount ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(amount)}
          className="flex-1 min-w-[80px]"
        >
          €{amount.toLocaleString()}
        </Button>
      ))}
    </div>
  );
};

export default QuickAmountButtons;