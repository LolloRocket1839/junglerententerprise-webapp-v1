import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, PiggyBank, Wallet, Send, Sparkles } from "lucide-react";
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
    if (step < 2) {
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
    setTimeout(() => {
      setStep(1);
      setIsSuccess(false);
      setFormData({ name: '', email: '', phone: '' });
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {/* Progress Indicator - 2 steps */}
        <div className="px-4 md:px-6 pt-4 md:pt-5 pb-3 border-b bg-muted/30">
          <div className="flex items-center justify-center gap-2">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
                    step >= s 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 2 && (
                  <div className={`w-16 md:w-20 h-0.5 mx-2 rounded transition-colors duration-200 ${
                    step > s ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 min-h-[320px] md:min-h-[360px]">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center h-full py-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {t('wizardSuccess')}
                </h2>
                <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                  {t('wizardSuccessMessage')}
                </p>
                <div className="space-y-1.5 text-sm bg-muted/50 rounded-lg p-3 w-full max-w-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Investimento:</span>
                    <span className="font-semibold">{formatCurrency(investmentAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risparmi:</span>
                    <span className="font-semibold text-green-600">{formatCurrency(calculations.deduction)}</span>
                  </div>
                  <div className="flex justify-between pt-1.5 border-t">
                    <span className="text-muted-foreground">Costo netto:</span>
                    <span className="font-bold text-primary">{formatCurrency(calculations.netCost)}</span>
                  </div>
                </div>
                <Button onClick={handleClose} className="mt-6 h-10">
                  Chiudi
                </Button>
              </motion.div>
            ) : (
              <>
                {/* Step 1: Investment Amount + Savings Preview */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div className="text-center">
                      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                        Quanto vuoi investire?
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Scegli l'importo e vedi il risparmio IRPEF
                      </p>
                    </div>

                    {/* Amount Display + Slider */}
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 md:p-5 text-center">
                      <p className="text-4xl md:text-5xl font-bold text-primary mb-4">
                        {formatCurrency(investmentAmount)}
                      </p>
                      <Slider
                        value={[investmentAmount]}
                        onValueChange={handleSliderChange}
                        max={200000}
                        min={MIN_INVESTMENT}
                        step={500}
                        className="py-3"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>€500</span>
                        <span>€100k</span>
                        <span>€200k</span>
                      </div>
                    </div>

                    {/* Savings Preview Cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div
                        key={calculations.deduction}
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 1 }}
                        className="bg-green-500/5 rounded-lg p-3 text-center border border-green-500/10"
                      >
                        <PiggyBank className="w-5 h-5 text-green-600 mx-auto mb-1.5" />
                        <p className="text-xs text-muted-foreground">Risparmi</p>
                        <p className="text-lg md:text-xl font-bold text-green-600">
                          {formatCurrency(calculations.deduction)}
                        </p>
                        <p className="text-[10px] text-green-600/70">65% IRPEF</p>
                      </motion.div>

                      <motion.div
                        key={calculations.netCost}
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 1 }}
                        className="bg-primary/5 rounded-lg p-3 text-center border border-primary/10"
                      >
                        <Wallet className="w-5 h-5 text-primary mx-auto mb-1.5" />
                        <p className="text-xs text-muted-foreground">Paghi solo</p>
                        <p className="text-lg md:text-xl font-bold text-primary">
                          {formatCurrency(calculations.netCost)}
                        </p>
                        <p className="text-[10px] text-primary/70">costo netto</p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Contact Form */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="text-center">
                      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                        I tuoi dati
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Ti contatteremo per la campagna
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="wizard-name" className="text-sm">Nome completo *</Label>
                        <Input
                          id="wizard-name"
                          placeholder="Mario Rossi"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="wizard-email" className="text-sm">Email *</Label>
                        <Input
                          id="wizard-email"
                          type="email"
                          placeholder="mario.rossi@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="wizard-phone" className="text-sm">Telefono (opzionale)</Label>
                        <Input
                          id="wizard-phone"
                          type="tel"
                          placeholder="+39 123 456 7890"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="h-11"
                        />
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-muted/50 rounded-lg p-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Investimento:</span>
                        <span className="font-semibold">{formatCurrency(investmentAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-muted-foreground">Risparmio IRPEF:</span>
                        <span className="font-semibold text-green-600">{formatCurrency(calculations.deduction)}</span>
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
          <div className="px-4 md:px-6 pb-4 md:pb-5 pt-3 border-t bg-muted/30 flex justify-between gap-3">
            {step > 1 ? (
              <Button variant="outline" onClick={handleBack} className="gap-1.5 h-10">
                <ArrowLeft className="w-4 h-4" />
                Indietro
              </Button>
            ) : (
              <div />
            )}

            {step === 1 ? (
              <Button onClick={handleNext} className="h-10 px-6">
                Continua
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting || !formData.name || !formData.email}
                className="gap-1.5 h-10 bg-green-600 hover:bg-green-700"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Invio...' : 'Invia Richiesta'}
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
