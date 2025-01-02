import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info } from 'lucide-react';
import { Property } from './types';

interface PropertyCardProps {
  property: Property;
  onInvest: (property: Property) => void;
  onInfo: (propertyId: string) => void;
  className?: string; // Added className prop as optional
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onInvest, onInfo, className }) => {
  return (
    <Card className={className}>
      <div className="aspect-video relative">
        {property.images?.[0] ? (
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-white/5" />
        )}
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{property.name}</h3>
          <p className="text-sm text-white/60">{property.location}</p>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-white/60">Price per night</p>
            <p className="text-base font-semibold text-white">
              ${property.price_per_night}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/60">Expected ROI</p>
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
            Invest Now
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