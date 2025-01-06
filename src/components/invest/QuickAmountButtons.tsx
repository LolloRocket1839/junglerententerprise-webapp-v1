import React from 'react';
import { Button } from "@/components/ui/button";

interface QuickAmountButtonsProps {
  onSelect: (amount: number) => void;
  selectedAmount: number;
}

const QuickAmountButtons: React.FC<QuickAmountButtonsProps> = ({ onSelect, selectedAmount }) => {
  const amounts = [100, 500, 1000, 5000];

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {amounts.map((amount) => (
        <Button
          key={amount}
          variant={selectedAmount === amount ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(amount)}
          className="bg-white/5 hover:bg-white/10 border-white/10"
        >
          €{amount}
        </Button>
      ))}
    </div>
  );
};

export default QuickAmountButtons;