
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { rentalTranslations } from '@/translations/rental';
import { StudentProperty } from '@/types/rental';

interface PropertyCardProps {
  property: StudentProperty;
  onSelect: (property: StudentProperty) => void;
}

export const PropertyCard = ({ property, onSelect }: PropertyCardProps) => {
  const { language } = useLanguage();
  const t = (key: string) => rentalTranslations[language]?.[key] || key;
  const savings = property.market_price_monthly - property.discounted_price_monthly;

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
            {property.current_status === 'available' ? t('available') : t('notAvailable')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
        <p className="text-sm text-gray-300 mb-4">{property.address}</p>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-400">{t('marketPrice')}</p>
            <p className="text-lg line-through text-gray-500">€{property.market_price_monthly}{t('perMonth')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">{t('discountedPrice')}</p>
            <p className="text-lg font-bold text-green-500">€{property.discounted_price_monthly}{t('perMonth')}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm mb-4">
          <div className="text-center p-2 glass rounded-lg">
            <p className="font-semibold">{property.rooms}</p>
            <p className="text-gray-400">{t('rooms')}</p>
          </div>
          <div className="text-center p-2 glass rounded-lg">
            <p className="font-semibold">{property.bathrooms}</p>
            <p className="text-gray-400">{t('bathrooms')}</p>
          </div>
          <div className="text-center p-2 glass rounded-lg">
            <p className="font-semibold">{property.size_sqm}m²</p>
            <p className="text-gray-400">{t('surface')}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full"
          onClick={() => onSelect(property)}
        >
          {t('viewDetails')}
        </Button>
      </CardFooter>
    </Card>
  );
};
