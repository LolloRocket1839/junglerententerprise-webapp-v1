import React, { useState } from 'react';
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
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import InvestmentTerms from './InvestmentTerms';
import InvestmentSummaryBox from './InvestmentSummaryBox';
import InvestmentSuccessNotification from './InvestmentSuccessNotification';

interface InvestmentDialogProps {
  property: Property;
  investmentAmount: string;
  setInvestmentAmount: (amount: string) => void;
  onClose: () => void;
  isSubmitting: boolean;
  error?: string;
}

const InvestmentDialog: React.FC<InvestmentDialogProps> = ({
  property,
  investmentAmount,
  setInvestmentAmount,
  onClose,
  isSubmitting,
  error
}) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const estimatedDate = new Date();
  estimatedDate.setMonth(estimatedDate.getMonth() + 3);
  const formattedDate = estimatedDate.toLocaleDateString('it-IT', { 
    month: 'long', 
    year: 'numeric' 
  });

  const isValidUUID = (uuid: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  };

  const handleSubmit = async () => {
    if (!termsAccepted) {
      toast({
        title: "Error",
        description: "You must accept the terms and conditions to proceed",
        variant: "destructive"
      });
      return;
    }

    if (!property.id || !isValidUUID(property.id)) {
      toast({
        title: "Error",
        description: "Invalid property ID",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsProcessing(true);
      console.log('Creating checkout for property:', property.id, 'amount:', investmentAmount);

      const response = await supabase.functions.invoke('create-checkout', {
        body: {
          amount: parseFloat(investmentAmount),
          hub_id: property.id
        }
      });

      if (response.error) {
        console.error('Checkout error:', response.error);
        throw new Error(response.error.message);
      }

      if (!response.data?.url) {
        throw new Error("No checkout URL received");
      }

      setIsSuccess(true);
      
      // Redirect to Stripe Checkout
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Error",
        description: "An error occurred while processing the payment. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <InvestmentSuccessNotification
        amount={investmentAmount}
        propertyName={property.name}
      />
    );
  }

  return (
    <DialogContent className="sm:max-w-[425px] bg-background">
      <DialogHeader>
        <DialogTitle>Investi in {property.name}</DialogTitle>
        <DialogDescription>
          Inserisci l'importo che desideri investire in questa proprietà.
          Investimento minimo €1.000.
        </DialogDescription>
      </DialogHeader>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Importo Investimento (€)</Label>
          <Input
            id="amount"
            type="number"
            min="1000"
            step="1000"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
            placeholder="Inserisci importo..."
            disabled={isProcessing}
          />
          <p className="text-sm text-muted-foreground">
            Riceverai {investmentAmount ? Math.floor(parseFloat(investmentAmount) / 1000) : 0} token
          </p>
        </div>

        <InvestmentTerms />

        <InvestmentSummaryBox
          amount={investmentAmount}
          roi={property.rating?.toString() || "0"}
          estimatedDate={formattedDate}
        />

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
            disabled={isProcessing}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accetto i termini e le condizioni
          </label>
        </div>
      </div>

      <DialogFooter>
        <Button
          onClick={handleSubmit}
          disabled={isProcessing || !termsAccepted}
          className="relative w-full"
        >
          {isProcessing && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {isProcessing ? 'Elaborazione...' : 'Conferma Investimento'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default InvestmentDialog;