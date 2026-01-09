import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calculator, PiggyBank, Wallet, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { InvestmentWizard } from "./InvestmentWizard";

const DEDUCTION_RATE = 0.65;
const MAX_DEDUCTIBLE = 100000;

export const TaxCalculator = () => {
  const { t } = useLanguage();
  const [investmentAmount, setInvestmentAmount] = useState<number>(10000);
  const [wizardOpen, setWizardOpen] = useState(false);

  const calculations = useMemo(() => {
    const cappedAmount = Math.min(investmentAmount, MAX_DEDUCTIBLE);
    const deduction = cappedAmount * DEDUCTION_RATE;
    const netCost = investmentAmount - deduction;

    return {
      deduction: Math.round(deduction),
      netCost: Math.round(netCost),
    };
  }, [investmentAmount]);

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
      <Card className="border-primary/30 bg-gradient-to-br from-green-500/5 via-primary/5 to-transparent overflow-hidden h-full">
        <CardContent className="p-4 md:p-5 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-full bg-primary/10">
              <Calculator className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">
              {t('taxCalculatorTitle')}
            </h3>
          </div>

          {/* Amount Display */}
          <div className="text-center mb-3">
            <p className="text-2xl md:text-3xl font-bold text-primary">
              {formatCurrency(investmentAmount)}
            </p>
          </div>

          {/* Slider */}
          <div className="space-y-2 mb-4">
            <Slider
              value={[investmentAmount]}
              onValueChange={handleSliderChange}
              max={200000}
              min={500}
              step={500}
              className="py-2"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>€500</span>
              <span>€100k</span>
              <span>€200k</span>
            </div>
          </div>

          {/* Results Section */}
          <div className="grid grid-cols-2 gap-2 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={`deduction-${calculations.deduction}`}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="p-2.5 rounded-lg bg-green-500/10 border border-green-500/20 text-center"
              >
                <PiggyBank className="w-4 h-4 text-green-600 mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">Risparmi</p>
                <p className="text-base md:text-lg font-bold text-green-600">
                  {formatCurrency(calculations.deduction)}
                </p>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`netcost-${calculations.netCost}`}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-center"
              >
                <Wallet className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground">Paghi</p>
                <p className="text-base md:text-lg font-bold text-primary">
                  {formatCurrency(calculations.netCost)}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={() => setWizardOpen(true)}
            className="w-full mt-4 h-10 text-sm gap-1.5"
          >
            Mostra Interesse
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
