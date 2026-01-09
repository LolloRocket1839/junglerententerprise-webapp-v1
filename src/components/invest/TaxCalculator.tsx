import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calculator, PiggyBank, TrendingUp, Wallet, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { InvestmentWizard } from "./InvestmentWizard";

const DEDUCTION_RATE = 0.65; // 65% deduction
const MAX_DEDUCTIBLE = 100000; // €100,000 annual limit

export const TaxCalculator = () => {
  const { t } = useLanguage();
  const [investmentAmount, setInvestmentAmount] = useState<number>(10000);
  const [wizardOpen, setWizardOpen] = useState(false);

  const calculations = useMemo(() => {
    const cappedAmount = Math.min(investmentAmount, MAX_DEDUCTIBLE);
    const deduction = cappedAmount * DEDUCTION_RATE;
    const netCost = investmentAmount - deduction;
    const effectiveRate = investmentAmount > 0 ? ((deduction / investmentAmount) * 100) : 0;

    return {
      deduction: Math.round(deduction),
      netCost: Math.round(netCost),
      effectiveRate: effectiveRate.toFixed(1),
      isOverLimit: investmentAmount > MAX_DEDUCTIBLE,
      excessAmount: Math.max(0, investmentAmount - MAX_DEDUCTIBLE)
    };
  }, [investmentAmount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    const numValue = parseInt(value) || 0;
    setInvestmentAmount(Math.min(numValue, 500000));
  };

  const handleSliderChange = (value: number[]) => {
    setInvestmentAmount(value[0]);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      <Card className="border-primary/30 bg-gradient-to-br from-green-500/5 via-primary/5 to-transparent overflow-hidden">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-full bg-primary/10">
              <Calculator className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {t('taxCalculatorTitle')}
            </h3>
          </div>

          {/* Input Section */}
          <div className="space-y-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="investment-amount" className="text-sm font-medium">
                {t('investmentAmountLabel')}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                <Input
                  id="investment-amount"
                  type="text"
                  inputMode="numeric"
                  value={investmentAmount.toLocaleString('it-IT')}
                  onChange={handleInputChange}
                  className="pl-8 text-lg font-semibold"
                  maxLength={10}
                />
              </div>
            </div>

            <Slider
              value={[investmentAmount]}
              onValueChange={handleSliderChange}
              max={200000}
              min={1000}
              step={1000}
              className="py-2"
            />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>€1.000</span>
              <span>€100.000</span>
              <span>€200.000</span>
            </div>
          </div>

          {/* Results Section */}
          <div className="grid grid-cols-2 gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={`deduction-${calculations.deduction}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-4 rounded-lg bg-green-500/10 border border-green-500/20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <PiggyBank className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-green-700">{t('taxSavings')}</span>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(calculations.deduction)}
                </p>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`netcost-${calculations.netCost}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                className="p-4 rounded-lg bg-primary/10 border border-primary/20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-primary">{t('netCost')}</span>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(calculations.netCost)}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Effective Rate */}
          <div className="mt-4 p-3 rounded-lg bg-muted/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{t('effectiveDeduction')}</span>
            </div>
            <span className="text-lg font-bold text-foreground">{calculations.effectiveRate}%</span>
          </div>

          {/* Over Limit Warning */}
          {calculations.isOverLimit && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20"
            >
              <p className="text-sm text-amber-700">
                {t('overLimitWarning').replace('{amount}', formatCurrency(calculations.excessAmount))}
              </p>
            </motion.div>
          )}

          {/* CTA Button */}
          <Button 
            onClick={() => setWizardOpen(true)}
            className="w-full mt-6 h-12 text-base gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            {t('wizardContactCTA')}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>

      <InvestmentWizard 
        open={wizardOpen} 
        onOpenChange={setWizardOpen}
        initialAmount={investmentAmount}
      />
    </>
  );
};
