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
          <DialogTitle>Conferma Investimento</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid gap-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Importo:</span>
              <span className="font-medium">€{amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Unità:</span>
              <span className="font-medium">{units}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">ROI Stimato:</span>
              <span className="font-medium text-green-400">{expectedReturn}/anno</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annulla
          </Button>
          <Button onClick={onConfirm}>
            Conferma e Procedi al Pagamento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentConfirmationDialog;