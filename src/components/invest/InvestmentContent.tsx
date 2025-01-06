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
    return amount / 100;
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      <div className="space-y-8">
        <PropertyGallery
          images={property.images || []}
          currentImageIndex={currentImageIndex}
          onToggleImage={onToggleImage}
        />
        <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <h3 className="text-3xl font-bold text-white tracking-tight mb-6">{property.name}</h3>
          <p className="text-lg font-light text-gray-300 mb-6 leading-relaxed">{property.description}</p>
          <PropertyStats
            units={12}
            reviewsCount={property.reviews_count || 0}
            rating={property.rating || 8}
          />
          <div className="mt-6">
            <ProgressBar 
              value={property.amount_raised}
              max={property.investment_goal}
            />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Dettagli</TabsTrigger>
            <TabsTrigger value="legal">Legale</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 pt-6">
            <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm border border-white/10">
              <InvestmentControls
                amount={investmentAmount}
                onAmountChange={setInvestmentAmount}
                minInvestment={100}
                maxInvestment={property.investment_goal}
                roi={property.rating || 8}
                onInvest={onInvest}
              />

              <div className="mt-8">
                <InvestmentSummary
                  amount={investmentAmount}
                  roi={`€${calculateROI(investmentAmount)}`}
                  units={calculateUnits(investmentAmount)}
                  estimatedDate={getEstimatedPaymentDate()}
                />
              </div>
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