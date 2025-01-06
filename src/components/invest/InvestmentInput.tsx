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
          className="pr-20 rounded-lg shadow-sm border-gray-200 
                     focus:border-green-500 focus:ring-2 focus:ring-green-500/20 
                     transition-all duration-200"
          placeholder="Min: €100"
          disabled={disabled}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span className="text-sm text-gray-400 font-medium">EUR</span>
        </div>
      </div>
      <Button 
        onClick={onConfirm}
        className="whitespace-nowrap bg-green-500 hover:bg-green-600 
                   transition-colors duration-200 text-white font-medium"
        disabled={disabled}
      >
        <Check className="w-4 h-4 mr-2" />
        Conferma
      </Button>
    </div>
  );
};

export default InvestmentInput;