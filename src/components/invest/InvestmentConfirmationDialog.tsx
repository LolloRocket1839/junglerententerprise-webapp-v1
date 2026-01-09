import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Coins, TrendingUp } from "lucide-react";
import { useMediaQuery } from '@/hooks/useMediaQuery';

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
  const isMobile = useMediaQuery('(max-width: 768px)');

  const SummaryContent = () => (
    <div className="space-y-4 py-4">
      <div className="grid gap-4">
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Coins className="h-5 w-5 text-primary" />
            </div>
            <span className="text-base font-medium text-gray-300">Importo</span>
          </div>
          <span className="text-xl font-bold text-white">€{amount.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <CheckCircle className="h-5 w-5 text-blue-400" />
            </div>
            <span className="text-base font-medium text-gray-300">Unità</span>
          </div>
          <span className="text-xl font-bold text-white">{units}</span>
        </div>
        
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <span className="text-base font-medium text-gray-300">ROI Stimato</span>
          </div>
          <span className="text-xl font-bold text-green-500">{expectedReturn}/anno</span>
        </div>
      </div>
    </div>
  );

  const ActionButtons = () => (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <Button 
        variant="outline" 
        onClick={() => onOpenChange(false)} 
        className="h-12 sm:h-11 font-semibold flex-1 touch-manipulation"
      >
        Annulla
      </Button>
      <Button 
        onClick={onConfirm} 
        className="h-14 sm:h-11 font-bold bg-green-500 hover:bg-green-600 flex-1 text-base sm:text-sm touch-manipulation"
      >
        Conferma e Procedi
      </Button>
    </div>
  );

  // Use Drawer on mobile for bottom sheet experience
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="bg-gradient-to-br from-background to-background/95 border-white/10">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-2xl font-bold tracking-tight text-white">
              Conferma Investimento
            </DrawerTitle>
          </DrawerHeader>
          
          <div className="px-4">
            <SummaryContent />
          </div>

          <DrawerFooter className="pb-8">
            <ActionButtons />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  // Use Dialog on desktop
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight text-white">
            Conferma Investimento
          </DialogTitle>
        </DialogHeader>
        
        <SummaryContent />

        <DialogFooter>
          <ActionButtons />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentConfirmationDialog;
