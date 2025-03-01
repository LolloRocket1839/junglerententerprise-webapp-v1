
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Wifi, Wind, DoorClosed, Coffee } from 'lucide-react';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    rating: number;
    features: string[];
    description: string;
    imageUrl: string;
  }
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const getAmenityIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'wi-fi':
        return <Wifi className="h-4 w-4" />;
      case 'aria condizionata':
        return <Wind className="h-4 w-4" />;
      case 'camera singola':
      case 'camera doppia':
        return <DoorClosed className="h-4 w-4" />;
      default:
        return <Coffee className="h-4 w-4" />;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 relative">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{property.rating}</span>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{property.title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {property.location}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-gray-600 text-sm mb-4">{property.description}</p>
        <div className="flex flex-wrap gap-2">
          {property.features.map((feature, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded-md flex items-center gap-1"
            >
              {getAmenityIcon(feature)}
              {feature}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold">€{property.price}</span>
          <span className="text-gray-500"> /notte</span>
        </div>
        <Button variant="outline">Dettagli</Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
