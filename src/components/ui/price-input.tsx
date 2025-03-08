import * as React from "react"
import { Euro, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "./input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
import { Button } from "./button"

export interface PriceInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  step?: number;
}

const PriceInput = React.forwardRef<HTMLInputElement, PriceInputProps>(
  ({ className, error, onChange, placeholder, step = 10, value, ...props }, ref) => {
    const [hasFocus, setHasFocus] = React.useState(false);
    const numericValue = typeof value === 'string' ? parseFloat(value) : (Array.isArray(value) ? 0 : value ?? 0);

    const handleIncrement = () => {
      if (onChange && typeof numericValue === 'number') {
        const event = {
          target: { value: (numericValue + step).toString() }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    const handleDecrement = () => {
      if (onChange && typeof numericValue === 'number' && numericValue >= step) {
        const event = {
          target: { value: (numericValue - step).toString() }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
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

          <div className="flex items-center">
            <Input
              type="number"
              className={cn(
                "pl-9 pr-20 h-12 bg-white/5 border-white/10 text-white",
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
              onChange={onChange}
              value={value}
              placeholder={placeholder || "Inserisci importo"}
              min={0}
              step={step}
              ref={ref}
              {...props}
            />

            <div className="absolute right-2 flex gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
                      onClick={handleDecrement}
                      disabled={typeof numericValue !== 'number' || !numericValue || numericValue < step}
                    >
                      <Minus className="h-4 w-4" />
                      <span className="sr-only">Diminuisci valore</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Diminuisci di {step}€</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
                      onClick={handleIncrement}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Aumenta valore</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Aumenta di {step}€</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
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
