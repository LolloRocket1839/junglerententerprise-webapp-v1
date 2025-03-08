
import * as React from "react"
import { Euro } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "./input"

export interface PriceInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const PriceInput = React.forwardRef<HTMLInputElement, PriceInputProps>(
  ({ className, error, onChange, placeholder, ...props }, ref) => {
    const [hasFocus, setHasFocus] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="relative group animate-in">
        <div className={cn(
          "relative rounded-xl transition-all duration-300",
          hasFocus && "ring-2 ring-primary/50",
          error && "ring-2 ring-destructive/50"
        )}>
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Euro className="h-4 w-4 text-white/50 group-hover:text-white/70 transition-colors" />
          </div>
          <Input
            type="number"
            className={cn(
              "pl-9 pr-4 h-12 bg-white/5 border-white/10 text-white",
              "placeholder:text-white/30 rounded-xl",
              "transition-all duration-300",
              "hover:bg-white/10 hover:border-white/20",
              "focus-visible:ring-0 focus-visible:border-primary/50",
              "disabled:opacity-50 disabled:hover:bg-white/5",
              error && "border-destructive/50",
              className
            )}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            onChange={handleChange}
            placeholder={placeholder || "Inserisci importo"}
            min={0}
            step={10}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-destructive mt-1.5 ml-1 animate-shake">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PriceInput.displayName = "PriceInput";

export { PriceInput };
