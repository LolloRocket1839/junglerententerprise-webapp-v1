import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { UnifiedProperty } from '@/hooks/useUnifiedProperties';
import InvestmentHeader from './InvestmentHeader';
import InvestmentContent from './InvestmentContent';
import InvestmentFooter from './InvestmentFooter';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface InvestmentOpportunityDialogProps {
  property: UnifiedProperty;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvest: (amount: number) => void;
}

const InvestmentOpportunityDialog: React.FC<InvestmentOpportunityDialogProps> = ({
  property,
  open,
  onOpenChange,
  onInvest
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState(1000);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const toggleImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0));
  };

  const handleInvest = () => {
    onInvest(investmentAmount);
  };

  const content = (
    <div className="flex flex-col h-full">
      <InvestmentHeader 
        propertyName={property.title}
        location={`${property.address}, ${property.city}`}
      />
      
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <InvestmentContent
          property={property}
          currentImageIndex={currentImageIndex}
          onToggleImage={toggleImage}
          investmentAmount={investmentAmount}
          setInvestmentAmount={setInvestmentAmount}
          onInvest={handleInvest}
        />
      </div>

      <InvestmentFooter />
    </div>
  );

  // Use Drawer on mobile for better UX
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="h-[95vh] bg-gradient-to-br from-black/98 to-green-950/98 backdrop-blur-xl border-white/10">
          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  // Use Dialog on desktop
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-full bg-gradient-to-br from-black/95 to-green-950/95 backdrop-blur-xl border border-white/10 p-0 gap-0 max-h-[90vh] overflow-hidden">
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentOpportunityDialog;
