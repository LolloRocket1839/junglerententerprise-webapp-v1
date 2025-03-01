
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Wifi, Wind, DoorClosed, Coffee, Users, Bath, Clock } from 'lucide-react';
import { TouristProperty } from './types';

interface PropertyCardProps {
  property: TouristProperty;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wi-fi':
        return <Wifi className="h-4 w-4" />;
      case 'aria condizionata':
        return <Wind className="h-4 w-4" />;
      case 'cucina':
        return <Coffee className="h-4 w-4" />;
      default:
        return <DoorClosed className="h-4 w-4" />;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        {property.rating && (
          <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{property.rating}</span>
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{property.title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {property.location.address}, {property.location.city}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-gray-600 text-sm mb-4">{property.short_description}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items
-center gap-1 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>Max {property.capacity} ospiti</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <DoorClosed className="h-4 w-4" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'camera' : 'camere'}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'bagno' : 'bagni'}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>Check-in: {property.rules.check_in_time}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {property.amenities.slice(0, 4).map((amenity, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded-md flex items-center gap-1"
            >
              {getAmenityIcon(amenity)}
              {amenity}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold">€{property.price_per_night}</span>
          <span className="text-gray-500">/notte</span>
        </div>
        <Button variant="outline">Dettagli</Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
