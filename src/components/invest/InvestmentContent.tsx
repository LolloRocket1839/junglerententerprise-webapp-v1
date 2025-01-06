import React from 'react';
import { Property } from './types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyGallery from './PropertyGallery';
import PropertyStats from './PropertyStats';
import ProgressBar from './ProgressBar';
import InvestmentControls from './InvestmentControls';
import InvestmentSummary from './InvestmentSummary';
import PropertyDetailsTab from './PropertyDetailsTab';
import LegalDocumentsTab from './LegalDocumentsTab';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

interface InvestmentContentProps {
  property: Property;
  currentImageIndex: number;
  onToggleImage: () => void;
  investmentAmount: number;
  setInvestmentAmount: (amount: number) => void;
  onInvest: () => void;
}

const InvestmentContent: React.FC<InvestmentContentProps> = ({
  property,
  currentImageIndex,
  onToggleImage,
  investmentAmount,
  setInvestmentAmount,
  onInvest
}) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="space-y-4">
        <PropertyGallery
          images={property.images || []}
          currentImageIndex={currentImageIndex}
          onToggleImage={onToggleImage}
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
                minInvestment={100}
                maxInvestment={property.investment_goal}
                roi={property.rating || 8}
              />

              <InvestmentSummary
                amount={investmentAmount}
                roi={`€${calculateROI(investmentAmount)}`}
                units={calculateUnits(investmentAmount)}
                estimatedDate={getEstimatedPaymentDate()}
              />

              <Button 
                onClick={onInvest}
                disabled={investmentAmount < 100 || investmentAmount > property.investment_goal}
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
  );
};

export default InvestmentContent;