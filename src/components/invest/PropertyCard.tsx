import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info, ImageIcon } from 'lucide-react';
import { Property } from './types';
import ProgressBar from './ProgressBar';

interface PropertyCardProps {
  property: Property;
  onInvest: (property: Property) => void;
  onInfo: (property: Property) => void;
  className?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onInvest, onInfo, className }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0));
  };

  const handleCardClick = () => {
    onInfo(property);
  };

  return (
    <Card 
      className={`${className} cursor-pointer transition-transform duration-200 hover:scale-[1.02]`}
      onClick={handleCardClick}
    >
      <div className="aspect-video relative group">
        {property.images?.[currentImageIndex] ? (
          <>
            <img
              src={property.images[currentImageIndex]}
              alt={`${property.name} - ${currentImageIndex === 0 ? 'Esterno' : 'Interno'}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70 transition-colors"
              onClick={toggleImage}
            >
              <ImageIcon className="w-4 h-4 text-white" />
            </Button>
            <div className="absolute top-2 left-2 bg-black/50 px-2 py-1 rounded text-xs text-white">
              {currentImageIndex === 0 ? 'Esterno' : 'Interno'}
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-white/5" />
        )}
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{property.name}</h3>
          <p className="text-sm text-white/60">{property.location}</p>
        </div>
        <p className="text-sm text-white/80 line-clamp-2">{property.description}</p>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-white/60">Prezzo per notte</p>
              <p className="text-base font-semibold text-white">
                €{property.price_per_night}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/60">ROI Previsto</p>
              <p className="text-base font-semibold text-primary">
                {property.rating ? `${property.rating}%` : 'TBD'}
              </p>
            </div>
          </div>
          <ProgressBar 
            value={property.amount_raised || 0}
            max={property.investment_goal || 100000}
            showLabel={false}
            className="mt-2"
          />
        </div>
        <div className="flex gap-3">
          <Button 
            className="flex-1 py-5 text-sm group"
            onClick={(e) => {
              e.stopPropagation();
              onInvest(property);
            }}
          >
            Investi Ora
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-[42px] w-[42px] bg-white/5 border-white/10"
            onClick={(e) => {
              e.stopPropagation();
              onInfo(property);
            }}
          >
            <Info className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;