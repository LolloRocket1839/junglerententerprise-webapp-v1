import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Property } from './types';
import { 
  ExternalLink,
  ArrowRight,
  ChevronRight,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvestmentControls from './InvestmentControls';
import InvestmentSummary from './InvestmentSummary';
import ProgressBar from './ProgressBar';
import PropertyStats from './PropertyStats';
import PropertyGallery from './PropertyGallery';
import PropertyDetailsTab from './PropertyDetailsTab';
import LegalDocumentsTab from './LegalDocumentsTab';

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
  const minInvestment = 100; // Minimum investment of 100€
  const maxInvestment = property.investment_goal || 140000;

  const toggleImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0));
  };

  const handleInvest = () => {
    onInvest(investmentAmount);
  };

  const calculateROI = (amount: number) => {
    return ((property.rating || 8) / 100 * amount).toFixed(2);
  };

  const calculateUnits = (amount: number) => {
    return amount / 100; // 1 unit = 100€
  };

  const getEstimatedPaymentDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    return date.toLocaleDateString('it-IT', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-full bg-gradient-to-br from-black/95 to-green-950/95 backdrop-blur-xl border border-white/10 p-0 gap-0">
        <div className="p-4 border-b border-white/10">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/invest">Dashboard Investimenti</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{property.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
            {property.name}
          </h2>
          <p className="text-lg text-gray-300 text-center">
            {property.location}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="space-y-4">
            <PropertyGallery
              images={property.images || []}
              currentImageIndex={currentImageIndex}
              onToggleImage={toggleImage}
            />
            <PropertyStats
              units={12}
              reviewsCount={property.reviews_count || 0}
              rating={property.rating || 8}
            />
            <ProgressBar 
              value={property.amount_raised}
              max={property.investment_goal}
              className="mt-4"
            />
          </div>

          <div className="space-y-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Dettagli</TabsTrigger>
                <TabsTrigger value="legal">Legale</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{property.name}</h3>
                  <p className="text-gray-300">{property.description}</p>
                </div>

                <div className="space-y-4">
                  <InvestmentControls
                    amount={investmentAmount}
                    onAmountChange={setInvestmentAmount}
                    minInvestment={minInvestment}
                    maxInvestment={maxInvestment}
                    roi={property.rating || 8}
                  />

                  <InvestmentSummary
                    amount={investmentAmount}
                    roi={`€${calculateROI(investmentAmount)}`}
                    units={calculateUnits(investmentAmount)}
                    estimatedDate={getEstimatedPaymentDate()}
                  />

                  <Button 
                    onClick={handleInvest}
                    className="w-full py-6 text-lg bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300 hover:scale-[1.02] group"
                  >
                    Investi Ora
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="details">
                <PropertyDetailsTab />
              </TabsContent>
              
              <TabsContent value="legal">
                <LegalDocumentsTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
              Termini & Condizioni
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
              Privacy Policy
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/5 hover:bg-white/10"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/5 hover:bg-white/10"
            >
              <HelpCircle className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentOpportunityDialog;
