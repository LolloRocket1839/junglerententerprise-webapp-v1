
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TouristProperty } from '@/types/tourist';

interface TouristPropertyCardProps {
  property: TouristProperty;
  onSelect: (property: TouristProperty) => void;
}

export const TouristPropertyCard = ({ property, onSelect }: TouristPropertyCardProps) => {
  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.02] bg-white/5 border-white/10"
      onClick={() => onSelect(property)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge 
          className="absolute top-2 right-2 bg-green-500"
          variant="secondary"
        >
          Da €{property.price_per_night}/notte
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-white">{property.title}</h3>
        <p className="text-sm text-gray-300 mb-4">{property.address}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-gray-300">
            <span>{property.capacity} ospiti</span>
          </div>
          <div className="text-gray-300">
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'camera' : 'camere'}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
          <div>
            <p className="text-sm text-gray-400">Pulizie</p>
            <p className="text-base text-white">€{property.cleaning_fee}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Totale da</p>
            <p className="text-lg font-bold text-green-500">€{property.price_per_night + property.cleaning_fee}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
