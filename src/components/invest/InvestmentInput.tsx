
import React from 'react';
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriceInput } from "@/components/ui/price-input";

interface InvestmentInputProps {
  value: string;
  onChange: (value: string) => void;
  onConfirm: () => void;
  disabled?: boolean;
}

const InvestmentInput: React.FC<InvestmentInputProps> = ({
  value,
  onChange,
  onConfirm,
  disabled
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <PriceInput
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-xl font-semibold tracking-wide"
          placeholder="Min: €100"
          disabled={disabled}
          min={100}
          step={100}
        />
      </div>
      <Button 
        onClick={onConfirm}
        className="whitespace-nowrap bg-gradient-to-r from-green-500 to-green-600
                   hover:from-green-600 hover:to-green-700
                   transition-all duration-[250ms]
                   text-lg font-bold tracking-wide text-white/90
                   shadow-[0_2px_8px_hsl(0_0%_0%_/_0.08)] hover:shadow-[0_16px_32px_hsl(0_0%_0%_/_0.16)]
                   px-8 py-6 rounded-xl border border-white/10
                   backdrop-blur-sm hover:text-white
                   hover:-translate-y-1 active:translate-y-0 active:scale-[0.96]"
        disabled={disabled}
      >
        <Check className="w-5 h-5 mr-2.5 stroke-[2.5]" />
        <span className="drop-shadow-sm">Conferma</span>
      </Button>
    </div>
  );
};

export default InvestmentInput;
