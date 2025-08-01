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
import { useLanguage } from '@/contexts/LanguageContext';
import { investTranslations } from '@/translations/invest';

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
      <div className="space-y-6">
        <PropertyGallery
          images={property.images || []}
          currentImageIndex={currentImageIndex}
          onToggleImage={onToggleImage}
        />
        <div className="glass-card p-6 space-y-6 shadow-xl backdrop-blur-2xl">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-white tracking-tight antialiased">
              {property.name}
            </h3>
            <p className="text-lg text-white/90 leading-relaxed font-medium antialiased">
              {property.description}
            </p>
          </div>
          
          <PropertyStats
            units={12}
            reviewsCount={property.reviews_count || 0}
            rating={property.rating || 8}
          />
          
          <div className="pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-white/90 antialiased">
                {t('fundingProgress')}
              </span>
              <span className="text-sm font-bold text-white antialiased">
                €{property.amount_raised.toLocaleString()} / €{property.investment_goal.toLocaleString()}
              </span>
            </div>
            <ProgressBar 
              value={property.amount_raised}
              max={property.investment_goal}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-black/60 backdrop-blur-2xl border border-white/20 rounded-xl p-1">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/90 font-semibold rounded-lg transition-all antialiased"
            >
              {t('overview')}
            </TabsTrigger>
            <TabsTrigger 
              value="details"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/90 font-semibold rounded-lg transition-all antialiased"
            >
              {t('details')}
            </TabsTrigger>
            <TabsTrigger 
              value="legal"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/90 font-semibold rounded-lg transition-all antialiased"
            >
              {t('legal')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 pt-6">
            <div className="glass-card p-6 space-y-8 shadow-xl backdrop-blur-2xl">
              <InvestmentControls
                amount={investmentAmount}
                onAmountChange={setInvestmentAmount}
                minInvestment={100}
                maxInvestment={property.investment_goal}
                roi={property.rating || 8}
                onInvest={onInvest}
              />

              <div className="pt-4 border-t border-white/20">
                <InvestmentSummary
                  amount={investmentAmount}
                  roi={`€${calculateROI(investmentAmount)}`}
                  units={calculateUnits(investmentAmount)}
                  estimatedDate={getEstimatedPaymentDate()}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="pt-6">
            <div className="glass-card p-6 shadow-xl backdrop-blur-2xl">
              <PropertyDetailsTab />
            </div>
          </TabsContent>
          
          <TabsContent value="legal" className="pt-6">
            <div className="glass-card p-6 shadow-xl backdrop-blur-2xl">
              <LegalDocumentsTab />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestmentContent;