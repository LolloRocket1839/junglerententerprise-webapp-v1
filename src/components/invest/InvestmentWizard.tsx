import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, PiggyBank, Wallet, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const DEDUCTION_RATE = 0.65;
const MAX_DEDUCTIBLE = 100000;
const MIN_INVESTMENT = 500;

interface InvestmentWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialAmount?: number;
}

export const InvestmentWizard = ({ open, onOpenChange, initialAmount = 10000 }: InvestmentWizardProps) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [investmentAmount, setInvestmentAmount] = useState(initialAmount);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const calculations = useMemo(() => {
    const cappedAmount = Math.min(investmentAmount, MAX_DEDUCTIBLE);
    const deduction = cappedAmount * DEDUCTION_RATE;
    const netCost = investmentAmount - deduction;
    return {
      deduction: Math.round(deduction),
      netCost: Math.round(netCost),
    };
  }, [investmentAmount]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSliderChange = (value: number[]) => {
    setInvestmentAmount(value[0]);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      toast.error('Per favore compila tutti i campi obbligatori');
      return;
    }

    setIsSubmitting(true);
    try {
      // Save to investment_waitlist table
      const { error } = await supabase.from('investment_waitlist').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        investment_amount: investmentAmount,
        property_id: 'general-interest',
        notes: `Risparmio IRPEF: ${formatCurrency(calculations.deduction)}, Costo netto: ${formatCurrency(calculations.netCost)}`
      });

      if (error) throw error;

      setIsSuccess(true);
      toast.success(t('wizardSuccess'));
    } catch (error) {
      console.error('Error submitting investment interest:', error);
      toast.error('Errore nell\'invio della richiesta');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after close animation
    setTimeout(() => {
      setStep(1);
      setIsSuccess(false);
      setFormData({ name: '', email: '', phone: '' });
    }, 300);
  };

  const stepVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        {/* Progress Indicator */}
        <div className="px-6 pt-6 pb-4 border-b bg-muted/30">
          <div className="flex items-center justify-center gap-3">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step >= s 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-12 h-1 mx-2 rounded transition-colors duration-300 ${
                    step > s ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 min-h-[400px]">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-12 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {t('wizardSuccess')}
                </h2>
                <p className="text-muted-foreground mb-8 max-w-sm">
                  {t('wizardSuccessMessage')}
                </p>
                <div className="space-y-2 text-sm bg-muted/50 rounded-lg p-4 w-full max-w-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('wizardYouInvest')}:</span>
                    <span className="font-semibold">{formatCurrency(investmentAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('wizardYouSave')}:</span>
                    <span className="font-semibold text-green-600">{formatCurrency(calculations.deduction)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-muted-foreground">{t('wizardNetCost')}:</span>
                    <span className="font-bold text-primary">{formatCurrency(calculations.netCost)}</span>
                  </div>
                </div>
                <Button onClick={handleClose} className="mt-8">
                  Chiudi
                </Button>
              </motion.div>
            ) : (
              <>
                {/* Step 1: Choose Amount */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        {t('wizardStep1Title')}
                      </h2>
                      <p className="text-muted-foreground">
                        {t('wizardStep1Subtitle')}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 text-center">
                      <p className="text-sm text-muted-foreground mb-2">{t('wizardInvestmentLabel')}</p>
                      <p className="text-5xl font-bold text-primary mb-6">
                        {formatCurrency(investmentAmount)}
                      </p>
                      <Slider
                        value={[investmentAmount]}
                        onValueChange={handleSliderChange}
                        max={200000}
                        min={MIN_INVESTMENT}
                        step={500}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>€500</span>
                        <span>€100.000</span>
                        <span>€200.000</span>
                      </div>
                    </div>

                    <p className="text-center text-sm text-muted-foreground">
                      {t('wizardMinInvestment')}
                    </p>
                  </motion.div>
                )}

                {/* Step 2: Tax Savings */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        {t('wizardStep2Title')}
                      </h2>
                      <p className="text-muted-foreground">
                        {t('wizardStep2Subtitle')}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-2xl p-6 text-center border border-green-500/20"
                      >
                        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                          <PiggyBank className="w-6 h-6 text-green-600" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{t('wizardYouSave')}</p>
                        <p className="text-3xl font-bold text-green-600">
                          {formatCurrency(calculations.deduction)}
                        </p>
                        <p className="text-xs text-green-600/70 mt-1">65% IRPEF</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 text-center border border-primary/20"
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <Wallet className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{t('netCost')}</p>
                        <p className="text-3xl font-bold text-primary">
                          {formatCurrency(calculations.netCost)}
                        </p>
                        <p className="text-xs text-primary/70 mt-1">{t('wizardNetCost')}</p>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-muted/50 rounded-xl p-4 text-center"
                    >
                      <p className="text-sm text-foreground">
                        Investendo <span className="font-bold">{formatCurrency(investmentAmount)}</span>, 
                        risparmierai <span className="font-bold text-green-600">{formatCurrency(calculations.deduction)}</span> in IRPEF.
                        Il costo effettivo sarà solo <span className="font-bold text-primary">{formatCurrency(calculations.netCost)}</span>.
                      </p>
                    </motion.div>
                  </motion.div>
                )}

                {/* Step 3: Contact Form */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        {t('wizardStep3Title')}
                      </h2>
                      <p className="text-muted-foreground">
                        {t('wizardStep3Subtitle')}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="wizard-name">{t('wizardNameLabel')} *</Label>
                        <Input
                          id="wizard-name"
                          placeholder="Mario Rossi"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="wizard-email">{t('wizardEmailLabel')} *</Label>
                        <Input
                          id="wizard-email"
                          type="email"
                          placeholder="mario.rossi@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="wizard-phone">{t('wizardPhoneLabel')}</Label>
                        <Input
                          id="wizard-phone"
                          type="tel"
                          placeholder="+39 123 456 7890"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="h-12"
                        />
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-muted/50 rounded-xl p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('wizardYouInvest')}:</span>
                        <span className="font-semibold">{formatCurrency(investmentAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('wizardYouSave')}:</span>
                        <span className="font-semibold text-green-600">{formatCurrency(calculations.deduction)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-muted-foreground">{t('wizardNetCost')}:</span>
                        <span className="font-bold text-primary">{formatCurrency(calculations.netCost)}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        {!isSuccess && (
          <div className="px-6 pb-6 pt-4 border-t bg-muted/30 flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={handleBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                {t('wizardBack')}
              </Button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <Button onClick={handleNext} className="gap-2">
                {t('wizardNext')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting || !formData.name || !formData.email}
                className="gap-2 bg-green-600 hover:bg-green-700"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Invio...' : t('wizardSubmit')}
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
