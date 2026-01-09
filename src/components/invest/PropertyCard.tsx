import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info, ImageIcon, EuroIcon } from 'lucide-react';
import { UnifiedProperty } from '@/hooks/useUnifiedProperties';
import ProgressBar from './ProgressBar';
import { useLanguage } from '@/contexts/LanguageContext';
import { investTranslations } from '@/translations/invest';

// Import local property images
import propertyExterior1 from '@/assets/invest-property-exterior-1.jpg';
import propertyInterior1 from '@/assets/invest-property-interior-1.jpg';
import propertyExterior2 from '@/assets/invest-property-exterior-2.jpg';
import propertyInterior2 from '@/assets/invest-property-interior-2.jpg';
import propertyExterior3 from '@/assets/invest-property-exterior-3.jpg';
import propertyInterior3 from '@/assets/invest-property-interior-3.jpg';

// Default images for properties without images
const defaultPropertyImages = [
  [propertyExterior1, propertyInterior1],
  [propertyExterior2, propertyInterior2],
  [propertyExterior3, propertyInterior3],
];

interface PropertyCardProps {
  property: UnifiedProperty;
  onInvest: (property: UnifiedProperty) => void;
  onInfo: (property: UnifiedProperty) => void;
  className?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onInvest, onInfo, className }) => {
  const { language } = useLanguage();
  const t = (key: string) => investTranslations[language]?.[key] || key;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get images - use property images if available, otherwise use defaults based on property id
  const getPropertyImages = () => {
    if (property.images && property.images.length > 0) {
      return property.images;
    }
    // Use deterministic default images based on property id
    const index = property.id.charCodeAt(0) % defaultPropertyImages.length;
    return defaultPropertyImages[index];
  };

  const images = getPropertyImages();

  const toggleImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleCardClick = () => {
    onInfo(property);
  };

  const calculatePercentage = () => {
    return Math.round((property.amount_raised / property.investment_goal) * 100);
  };

  return (
    <Card 
      className={`${className} cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] touch-manipulation`}
      onClick={handleCardClick}
    >
      {/* Image - larger aspect ratio on mobile */}
      <div className="aspect-[4/3] sm:aspect-video relative group overflow-hidden rounded-t-lg">
        {images[currentImageIndex] ? (
          <>
            <img
              src={images[currentImageIndex]}
              alt={`${property.title} - ${currentImageIndex === 0 ? t('exterior') : t('interior')}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {images.length > 1 && (
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-3 right-3 h-10 w-10 sm:h-9 sm:w-9 bg-black/50 hover:bg-black/70 transition-colors touch-manipulation"
                onClick={toggleImage}
              >
                <ImageIcon className="w-5 h-5 sm:w-4 sm:h-4 text-white" />
              </Button>
            )}
            <div className="absolute top-3 left-3 bg-black/60 px-3 py-1.5 rounded-full text-xs sm:text-sm text-white font-medium">
              {currentImageIndex === 0 ? t('exterior') : t('interior')}
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-white/5 flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-white/20" />
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-1">{property.title}</h3>
          <p className="text-sm text-white/60">{property.city}</p>
        </div>
        <p className="text-sm text-white/80 line-clamp-2">{property.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <EuroIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span className="text-base sm:text-lg font-bold text-white">
              {property.investment_goal.toLocaleString()}
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/60">{t('expectedROI')}</p>
            <p className="text-sm sm:text-base font-semibold text-primary">
              {property.investor_share_percentage ? `${property.investor_share_percentage}%` : t('tbd')}
            </p>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-white/60">{t('subscription')}</span>
            <span className="text-xs sm:text-sm font-semibold text-white">{calculatePercentage()}%</span>
          </div>
          <ProgressBar 
            value={property.amount_raised || 0}
            max={property.investment_goal || 100000}
            showLabel={false}
            className="mt-2"
          />
          <div className="flex justify-between text-xs text-white/60">
            <span>€{property.amount_raised.toLocaleString()}</span>
            <span>€{property.investment_goal.toLocaleString()}</span>
          </div>
        </div>
        
        {/* Action buttons - larger on mobile */}
        <div className="flex gap-3">
          <Button 
            className="flex-1 h-12 sm:h-11 text-sm sm:text-base group touch-manipulation"
            onClick={(e) => {
              e.stopPropagation();
              onInvest(property);
            }}
          >
            {t('investNow')}
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-12 w-12 sm:h-11 sm:w-11 bg-white/5 border-white/10 touch-manipulation"
            onClick={(e) => {
              e.stopPropagation();
              onInfo(property);
            }}
          >
            <Info className="w-5 h-5 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;
