
import React from 'react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface PropertyListingCardProps {
  title: string;
  location: string;
  distance: string;
  price: number;
  originalPrice?: number;
  savings?: number;
  features: string[];
}

const PropertyListingCard = ({
  title,
  location,
  distance,
  price,
  originalPrice,
  savings,
  features,
}: PropertyListingCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{distance}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Prezzo mensile</p>
            <p className="font-bold">€{price} {originalPrice && (
              <span className="text-sm font-normal text-gray-500 line-through">€{originalPrice}</span>
            )}</p>
          </div>
          {savings && (
            <div>
              <p className="text-sm text-gray-500">Risparmio</p>
              <p className="font-bold text-green-600">{savings}%</p>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((feature, index) => (
            <span key={index} className="bg-gray-100 px-2 py-1 rounded-md text-sm">{feature}</span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Dettagli</Button>
        <Button>Prenota Visita</Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyListingCard;
