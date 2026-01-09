import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Loader2, Mail, Phone, User, Coins } from 'lucide-react';
import { useJoinWaitlist } from '@/hooks/useWaitlist';
import { useLanguage } from '@/contexts/LanguageContext';
import { UnifiedProperty } from '@/hooks/useUnifiedProperties';
import WaitlistSuccessNotification from './WaitlistSuccessNotification';

interface WaitlistFormProps {
  property: UnifiedProperty;
  onSuccess?: () => void;
  onClose?: () => void;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ property, onSuccess, onClose }) => {
  const { t } = useLanguage();
  const joinWaitlist = useJoinWaitlist();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investment_amount: 1000,
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!termsAccepted) return;

    try {
      await joinWaitlist.mutateAsync({
        property_id: property.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        investment_amount: formData.investment_amount,
      });
      
      setShowSuccess(true);
    } catch (error) {
      // Error handled in hook
    }
  };

  if (showSuccess) {
    return (
      <WaitlistSuccessNotification
        investmentAmount={formData.investment_amount}
        propertyName={property.title}
        onClose={onClose}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name Input */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-white/90 flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          {t('waitlistName')}
        </Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Mario Rossi"
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
        />
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white/90 flex items-center gap-2">
          <Mail className="h-4 w-4 text-primary" />
          {t('waitlistEmail')}
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="mario@email.com"
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
        />
      </div>

      {/* Phone Input (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-white/90 flex items-center gap-2">
          <Phone className="h-4 w-4 text-primary" />
          {t('waitlistPhone')}
        </Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          placeholder="+39 333 1234567"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
        />
      </div>

      {/* Investment Amount */}
      <div className="space-y-4">
        <Label className="text-white/90 flex items-center gap-2">
          <Coins className="h-4 w-4 text-primary" />
          {t('yourInterest')}
        </Label>
        
        <div className="flex items-center gap-4">
          <Input
            type="number"
            min={100}
            max={100000}
            step={100}
            value={formData.investment_amount}
            onChange={(e) => setFormData(prev => ({ ...prev, investment_amount: Number(e.target.value) }))}
            className="w-32 bg-white/10 border-white/20 text-white text-center"
          />
          <span className="text-white/60">€</span>
        </div>

        <Slider
          value={[formData.investment_amount]}
          onValueChange={([value]) => setFormData(prev => ({ ...prev, investment_amount: value }))}
          min={100}
          max={50000}
          step={100}
          className="py-2"
        />

        <div className="flex justify-between text-xs text-white/50">
          <span>€100</span>
          <span>€50.000</span>
        </div>
      </div>

      {/* Terms Checkbox */}
      <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(checked) => setTermsAccepted(checked === true)}
          className="mt-0.5 border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <Label htmlFor="terms" className="text-sm text-white/70 leading-relaxed cursor-pointer">
          Accetto di essere contattato da Jungle Rent quando la campagna di investimento sarà attiva.
          I miei dati saranno trattati secondo la Privacy Policy.
        </Label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!termsAccepted || joinWaitlist.isPending || !formData.name || !formData.email}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-medium"
      >
        {joinWaitlist.isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            {t('loading')}
          </>
        ) : (
          t('joinWaitlist')
        )}
      </Button>
    </form>
  );
};

export default WaitlistForm;
