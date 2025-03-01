
import React from 'react';
import { StudentProperty } from './types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Bed, Bath, Wifi, Euro } from 'lucide-react';

interface PropertyCardProps {
  property: StudentProperty;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const savingsAmount = property.market_price_monthly - property.discounted_price_monthly;
  const savingsPercentage = Math.round((savingsAmount / property.market_price_monthly) * 100);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={property.images[0] || '/placeholder.svg'}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <Badge 
          className="absolute top-2 right-2 bg-green-600"
          variant="secondary"
        >
          Risparmio {savingsPercentage}%
        </Badge>
      </div>
      
      <CardHeader>
        <h3 className="text-xl font-semibold">{property.title}</h3>
        <p className="text-gray-500">{property.address}</p>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span>{property.size_sqm}m²</span>
          </div>
          <div className="flex items-center gap-2">
            <Bed className="h-4 w-4" />
            <span>{property.rooms} stanze</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms} bagni</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            <span>{property.internet_available ? 'Wi-Fi' : 'No Wi-Fi'}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-gray-500 line-through">
            €{property.market_price_monthly}/mese
          </div>
          <div className="text-2xl font-bold text-green-600">
            €{property.discounted_price_monthly}/mese
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50">
        <div className="flex items-center gap-2">
          <Euro className="h-4 w-4 text-green-600" />
          <span className="text-sm">
            Risparmi €{savingsAmount} al mese
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};
