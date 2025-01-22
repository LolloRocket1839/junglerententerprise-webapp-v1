import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

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
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pr-20 text-xl font-semibold tracking-wide rounded-xl 
                     border-2 border-white/20 shadow-lg
                     focus:ring-4 focus:ring-green-500/30 focus:border-green-500/50
                     transition-all duration-300 ease-in-out
                     bg-black/40 backdrop-blur-xl text-white
                     placeholder:text-white/50 placeholder:font-normal
                     hover:border-white/30"
          placeholder="Min: €100"
          disabled={disabled}
          min={100}
          step={100}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <span className="text-base font-medium text-white/70">EUR</span>
        </div>
      </div>
      <Button 
        onClick={onConfirm}
        className="whitespace-nowrap bg-gradient-to-r from-green-500 to-green-600
                   hover:from-green-600 hover:to-green-700
                   hover:scale-105 transition-all duration-300 
                   text-lg font-bold tracking-wide text-white/90
                   shadow-lg hover:shadow-xl px-8 py-6
                   rounded-xl border border-white/10
                   backdrop-blur-sm hover:text-white
                   active:scale-95"
        disabled={disabled}
      >
        <Check className="w-5 h-5 mr-2.5 stroke-[2.5]" />
        <span className="drop-shadow-sm">Conferma</span>
      </Button>
    </div>
  );
};

export default InvestmentInput;