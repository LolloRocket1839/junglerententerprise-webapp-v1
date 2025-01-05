import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Property } from './types';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface InvestmentDialogProps {
  property: Property;
  investmentAmount: string;
  setInvestmentAmount: (amount: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  error?: string;
}

const InvestmentDialog: React.FC<InvestmentDialogProps> = ({
  property,
  investmentAmount,
  setInvestmentAmount,
  onSubmit,
  isSubmitting,
  error
}) => {
  return (
    <DialogContent className="sm:max-w-[425px] bg-background">
      <DialogHeader>
        <DialogTitle>Invest in {property.name}</DialogTitle>
        <DialogDescription>
          Enter the amount you'd like to invest in this property.
          Minimum investment is $100.
        </DialogDescription>
      </DialogHeader>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Investment Amount ($)</Label>
          <Input
            id="amount"
            type="number"
            min="100"
            step="100"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
            placeholder="Enter amount..."
            disabled={isSubmitting}
          />
          <p className="text-sm text-muted-foreground">
            You will receive {investmentAmount ? Math.floor(parseFloat(investmentAmount) / 100) : 0} tokens
          </p>
        </div>
      </div>

      <DialogFooter>
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="relative"
        >
          {isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {isSubmitting ? 'Processing...' : 'Confirm Investment'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default InvestmentDialog;