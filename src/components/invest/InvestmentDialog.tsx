import React, { useState } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { UnifiedProperty } from '@/hooks/useUnifiedProperties';
import { Clock, Users } from 'lucide-react';
import WaitlistForm from './WaitlistForm';
import { useWaitlistCount } from '@/hooks/useWaitlist';
import { useLanguage } from '@/contexts/LanguageContext';

interface InvestmentDialogProps {
  property: UnifiedProperty;
  investmentAmount: string;
  setInvestmentAmount: (amount: string) => void;
  onClose: () => void;
  isSubmitting: boolean;
  error?: string;
}

const InvestmentDialog: React.FC<InvestmentDialogProps> = ({
  property,
  onClose,
}) => {
  const { t } = useLanguage();
  const { data: waitlistCount } = useWaitlistCount(property.id);

  return (
    <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-[#1a2e2a] to-[#2a3f35] backdrop-blur-xl border border-white/10 max-h-[90vh] overflow-y-auto">
      <DialogHeader className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
            <Clock className="w-3 h-3 mr-1" />
            {t('comingSoon')}
          </Badge>
          {waitlistCount !== undefined && waitlistCount > 0 && (
            <Badge className="bg-primary/20 text-primary border-primary/30">
              <Users className="w-3 h-3 mr-1" />
              {waitlistCount} {t('peopleInterested')}
            </Badge>
          )}
        </div>
        
        <DialogTitle className="text-2xl font-bold tracking-tight text-white">
          {t('waitlistTitle')}
        </DialogTitle>
        <DialogDescription className="text-base text-gray-200/80 border-b border-white/20 pb-4">
          {t('waitlistSubtitle')}
          <span className="block mt-2 text-white font-medium">
            {property.title} - {property.city}
          </span>
        </DialogDescription>
      </DialogHeader>

      <div className="py-4">
        <WaitlistForm property={property} onClose={onClose} />
      </div>
    </DialogContent>
  );
};

export default InvestmentDialog;
