import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Property } from './types';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  HelpCircle,
  ExternalLink,
  ArrowRight,
  ImageIcon
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const minInvestment = 100;
  const maxInvestment = 10000;

  const toggleImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0));
  };

  const handleInvest = () => {
    onInvest(investmentAmount);
  };

  const calculateROI = (amount: number) => {
    return ((property.rating || 8) / 100 * amount).toFixed(2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full bg-gradient-to-br from-black/95 to-green-950/95 backdrop-blur-xl border border-white/10 p-0 gap-0">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
            Investment Opportunity
          </h2>
          <p className="text-lg text-gray-300 text-center">
            {property.location}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left Column - Image */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden group">
              <img
                src={property.images?.[currentImageIndex]}
                alt={property.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70"
                onClick={toggleImage}
              >
                <ImageIcon className="w-4 h-4" />
              </Button>
              <div className="absolute top-2 left-2 bg-black/50 px-2 py-1 rounded text-xs text-white">
                {currentImageIndex === 0 ? 'Esterno' : 'Interno'}
              </div>
            </div>

            {/* Property Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm">Units</span>
                </div>
                <p className="text-xl font-bold text-white">12</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Investors</span>
                </div>
                <p className="text-xl font-bold text-white">{property.reviews_count}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">ROI</span>
                </div>
                <p className="text-xl font-bold text-white">{property.rating}%</p>
              </div>
            </div>
          </div>

          {/* Right Column - Investment Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">{property.name}</h3>
              <p className="text-gray-300">{property.description}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Investment Amount (€)
                </label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[investmentAmount]}
                    onValueChange={(value) => setInvestmentAmount(value[0])}
                    max={maxInvestment}
                    min={minInvestment}
                    step={100}
                    className="flex-1"
                  />
                  <span className="text-white font-mono w-24 text-right">
                    €{investmentAmount}
                  </span>
                </div>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm cursor-help">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Expected Annual Return</span>
                        <TrendingUp className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-2xl font-bold text-primary">
                        €{calculateROI(investmentAmount)}
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Based on historical performance and current market conditions</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button 
                onClick={handleInvest}
                className="w-full py-6 text-lg bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300 hover:scale-[1.02] group"
              >
                Invest Now
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
              Terms & Conditions
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
              Privacy Policy
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/5 hover:bg-white/10"
          >
            <HelpCircle className="w-5 h-5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentOpportunityDialog;