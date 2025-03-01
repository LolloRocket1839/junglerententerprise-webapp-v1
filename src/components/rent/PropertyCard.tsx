
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, School, Wifi, Home, Bath, Euro } from 'lucide-react';
import { StudentProperty } from './types';

interface PropertyCardProps {
  property: StudentProperty;
  onViewDetails?: (id: string) => void;
}

const PropertyCard = ({ property, onViewDetails }: PropertyCardProps) => {
  const savings = property.pricing.marketPriceMonthly - property.pricing.discountedPriceMonthly;
  const savingsPercentage = property.pricing.discountPercentage;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Property Image */}
      <div className="relative h-48">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <Badge 
          variant="secondary" 
          className="absolute top-2 right-2 bg-green-100 text-green-800"
        >
          {property.currentStatus}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">{property.title}</h3>
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{property.location.address}</span>
        </div>
      </CardHeader>

      <CardContent>
        {/* Key Features */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1 text-sm">
            <School className="h-4 w-4" />
            <span>
              {property.location.universities[0].distance}km to {property.location.universities[0].name}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Home className="h-4 w-4" />
            <span>{property.features.rooms} rooms</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Bath className="h-4 w-4" />
            <span>{property.features.bathrooms} bathrooms</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Wifi className="h-4 w-4" />
            <span>{property.features.internet.available ? `${property.features.internet.speed}Mbps` : 'No WiFi'}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">€{property.pricing.discountedPriceMonthly}</span>
            <span className="text-sm text-muted-foreground line-through">
              €{property.pricing.marketPriceMonthly}
            </span>
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <Euro className="h-4 w-4" />
            <span className="text-sm font-medium">
              Save €{savings}/month ({savingsPercentage}% off)
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => onViewDetails?.(property.id)}
        >
          View Details
        </Button>
        <Button>Book Visit</Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
