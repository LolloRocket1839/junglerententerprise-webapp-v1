import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, Maximize2 } from 'lucide-react';
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
        title: "Errore",
        description: "Devi accettare i termini e le condizioni per procedere",
        variant: "destructive"
      });
      return;
    }

    if (!property.id || !isValidUUID(property.id)) {
      toast({
        title: "Errore",
        description: "ID proprietà non valido",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsProcessing(true);
      console.log('Creazione checkout per proprietà:', property.id, 'importo:', investmentAmount);

      const response = await supabase.functions.invoke('create-checkout', {
        body: {
          amount: parseFloat(investmentAmount),
          hub_id: property.id
        }
      });

      if (response.error) {
        console.error('Errore checkout:', response.error);
        throw new Error(response.error.message);
      }

      if (!response.data?.url) {
        throw new Error("Nessun URL di checkout ricevuto");
      }

      setIsSuccess(true);
      
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Errore pagamento:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'elaborazione del pagamento. Riprova più tardi.",
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
    <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-[#1a2e2a] to-[#2a3f35] backdrop-blur-xl border border-white/10">
      <DialogHeader className="space-y-4">
        <DialogTitle className="text-3xl font-bold tracking-tight text-white drop-shadow-xl">
          Investi in {property.name}
        </DialogTitle>
        <DialogDescription className="text-lg text-gray-200 font-medium border-b border-white/20 pb-4">
          Inserisci l'importo che desideri investire in questa proprietà.
          Investimento minimo €1.000.
        </DialogDescription>
      </DialogHeader>

      {error && (
        <Alert variant="destructive" className="mb-4 border-red-500/50 bg-red-950/50">
          <AlertDescription className="text-white font-medium">{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 py-4">
        <div className="space-y-4">
          <Label htmlFor="amount" className="text-xl font-bold text-white drop-shadow-xl">
            Importo Investimento (€)
          </Label>
          <Input
            id="amount"
            type="number"
            min="1000"
            step="1000"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
            placeholder="Inserisci importo..."
            disabled={isSubmitting}
            className="text-lg font-medium bg-black/30 border-emerald-500/40 text-white 
                     placeholder:text-gray-400 focus:ring-emerald-500/40 focus:border-emerald-500/60
                     shadow-xl transition-all duration-200 h-12"
          />
          <p className="text-sm font-semibold text-emerald-400 drop-shadow-lg">
            Riceverai {investmentAmount ? Math.floor(parseFloat(investmentAmount) / 1000) : 0} token
          </p>
        </div>

        <InvestmentTerms />

        <InvestmentSummaryBox
          amount={investmentAmount}
          roi={property.rating?.toString() || "0"}
          estimatedDate={formattedDate}
        />

        <div className="flex items-center space-x-3 bg-black/30 p-4 rounded-xl border border-white/10 shadow-xl">
          <Checkbox 
            id="terms" 
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
            disabled={isSubmitting}
            className="border-emerald-500/40 data-[state=checked]:bg-emerald-500 
                     data-[state=checked]:border-emerald-600"
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed 
                     peer-disabled:opacity-70"
          >
            Accetto i termini e le condizioni
          </label>
        </div>
      </div>

      <DialogFooter>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !termsAccepted}
          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white 
                   font-bold py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300
                   hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-50 rounded-xl
                   border border-emerald-400/20"
        >
          {isSubmitting && (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          )}
          {isSubmitting ? 'Elaborazione...' : 'Conferma Investimento'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default InvestmentDialog;