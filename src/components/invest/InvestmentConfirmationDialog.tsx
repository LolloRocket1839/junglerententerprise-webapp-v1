import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InvestmentConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  units: number;
  expectedReturn: string;
  onConfirm: () => void;
}

const InvestmentConfirmationDialog: React.FC<InvestmentConfirmationDialogProps> = ({
  open,
  onOpenChange,
  amount,
  units,
  expectedReturn,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight">Conferma Investimento</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid gap-3">
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-gray-400">Importo:</span>
              <span className="text-lg font-semibold">€{amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-gray-400">Unità:</span>
              <span className="text-lg font-semibold">{units}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-gray-400">ROI Stimato:</span>
              <span className="text-lg font-semibold text-green-400">{expectedReturn}/anno</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="font-medium">
            Annulla
          </Button>
          <Button onClick={onConfirm} className="font-semibold">
            Conferma e Procedi al Pagamento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentConfirmationDialog;