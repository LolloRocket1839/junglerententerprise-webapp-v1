
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";
import { TouristProperty } from '@/types/tourist';

interface TouristPropertyCardProps {
  property: TouristProperty;
  onSelect: (property: TouristProperty) => void;
}

export const TouristPropertyCard = ({ property, onSelect }: TouristPropertyCardProps) => {
  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          <Badge 
            className="absolute top-2 right-2 bg-green-500"
            variant="secondary"
          >
            Da €{property.price_per_night}/notte
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
        <p className="text-sm text-gray-300 mb-4">{property.address}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{property.capacity} ospiti</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'camera' : 'camere'}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-400">Pulizie</p>
            <p className="text-base">€{property.cleaning_fee}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Totale da</p>
            <p className="text-lg font-bold text-green-500">€{property.price_per_night + property.cleaning_fee}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full"
          onClick={() => onSelect(property)}
        >
          Visualizza dettagli
        </Button>
      </CardFooter>
    </Card>
  );
};
