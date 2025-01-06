import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Property } from './types';
import InvestmentHeader from './InvestmentHeader';
import InvestmentContent from './InvestmentContent';
import InvestmentFooter from './InvestmentFooter';

interface InvestmentOpportunityDialogProps {
  property: Property;
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

  const toggleImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0));
  };

  const handleInvest = () => {
    onInvest(investmentAmount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-full bg-gradient-to-br from-black/95 to-green-950/95 backdrop-blur-xl border border-white/10 p-0 gap-0 max-h-[90vh] overflow-y-auto">
        <InvestmentHeader 
          propertyName={property.name}
          location={property.location}
        />
        
        <InvestmentContent
          property={property}
          currentImageIndex={currentImageIndex}
          onToggleImage={toggleImage}
          investmentAmount={investmentAmount}
          setInvestmentAmount={setInvestmentAmount}
          onInvest={handleInvest}
        />

        <InvestmentFooter />
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentOpportunityDialog;