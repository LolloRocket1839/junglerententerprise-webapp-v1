import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, FileText, Info, ShieldCheck } from 'lucide-react';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const { toast } = useToast();
  
  const estimatedDate = new Date();
  estimatedDate.setMonth(estimatedDate.getMonth() + 3);
  const formattedDate = estimatedDate.toLocaleDateString('it-IT', { 
    month: 'long', 
    year: 'numeric' 
  });

  const handleSubmit = async () => {
    if (!termsAccepted) {
      toast({
        title: "Errore",
        description: "Devi accettare i termini e le condizioni per procedere",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsProcessing(true);
      
      const response = await supabase.functions.invoke('create-checkout', {
        body: {
          amount: parseFloat(investmentAmount),
          hub_id: property.id
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      // Redirect to Stripe Checkout
      window.location.href = response.data.url;
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'elaborazione del pagamento. Riprova più tardi.",
        variant: "destructive"
      });
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

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

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="terms">
            <AccordionTrigger className="text-sm">
              <FileText className="w-4 h-4 mr-2" />
              Termini e Condizioni
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              <p className="mb-2">
                Investendo in questa proprietà, accetti i nostri termini e condizioni completi. Punti chiave:
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Periodo minimo di investimento: 24 mesi</li>
                <li>Commissioni di gestione: 2% annuo</li>
                <li>Distribuzione dei rendimenti: trimestrale</li>
              </ul>
              <a 
                href="#" 
                className="text-primary hover:underline mt-2 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Leggi i termini completi
              </a>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Riepilogo Investimento
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span className="text-muted-foreground">Importo:</span>
              <span className="font-medium">€{parseFloat(investmentAmount || "0").toLocaleString()}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">ROI Previsto:</span>
              <span className="font-medium text-primary">{property.rating}%</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Prima Distribuzione:</span>
              <span className="font-medium">{formattedDate}</span>
            </li>
          </ul>
        </div>

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