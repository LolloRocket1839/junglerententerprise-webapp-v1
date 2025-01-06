import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info, ImageIcon } from 'lucide-react';
import { Property } from './types';

interface PropertyCardProps {
  property: Property;
  onInvest: (property: Property) => void;
  onInfo: (propertyId: string) => void;
  className?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onInvest, onInfo, className }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <Card className={className}>
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
              onClick={(e) => {
                e.stopPropagation();
                toggleImage();
              }}
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
        <div className="flex gap-3">
          <Button 
            className="flex-1 py-5 text-sm"
            onClick={() => onInvest(property)}
          >
            Investi Ora
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-[42px] w-[42px] bg-white/5 border-white/10"
            onClick={() => onInfo(property.id)}
          >
            <Info className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;