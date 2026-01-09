import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, PartyPopper, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WaitlistSuccessNotificationProps {
  investmentAmount: number;
  propertyName: string;
  onClose?: () => void;
}

const WaitlistSuccessNotification: React.FC<WaitlistSuccessNotificationProps> = ({
  investmentAmount,
  propertyName,
  onClose
}) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center text-center py-8 px-6"
    >
      {/* Success Icon with Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="mb-6"
      >
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-2 -right-2"
          >
            <PartyPopper className="w-8 h-8 text-yellow-400" />
          </motion.div>
        </div>
      </motion.div>

      {/* Success Message */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-semibold text-white mb-3"
      >
        {t('waitlistSuccess')}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-white/70 mb-6 max-w-sm"
      >
        {t('waitlistSuccessMessage')}
      </motion.p>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-sm bg-white/5 border border-white/10 rounded-xl p-4 mb-6"
      >
        <div className="flex justify-between items-center mb-3">
          <span className="text-white/60 text-sm">Proprietà</span>
          <span className="text-white font-medium text-sm">{propertyName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/60 text-sm">{t('yourInterest')}</span>
          <span className="text-primary font-semibold text-lg">
            €{investmentAmount.toLocaleString('it-IT')}
          </span>
        </div>
      </motion.div>

      {/* What Happens Next */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-sm text-left mb-6"
      >
        <h4 className="text-white/80 text-sm font-medium mb-3">Cosa succede ora?</h4>
        <ul className="space-y-2">
          {[
            'Riceverai un\'email di conferma',
            'Ti contatteremo quando la campagna sarà attiva',
            'Avrai priorità nell\'accesso all\'investimento'
          ].map((step, index) => (
            <li key={index} className="flex items-center gap-2 text-white/60 text-sm">
              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
              {step}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Close Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-sm"
      >
        <Button
          onClick={onClose}
          variant="outline"
          className="w-full border-white/20 text-white hover:bg-white/10"
        >
          Chiudi
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default WaitlistSuccessNotification;
