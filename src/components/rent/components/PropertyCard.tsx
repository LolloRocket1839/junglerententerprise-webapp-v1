import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Heart, MapPin, School, ArrowRight } from 'lucide-react';
import { Property } from '../types';
import { useLanguage } from '@/contexts/LanguageContext';
import { rentalTranslations } from '@/translations/rental';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
  onSelect: (property: Property) => void;
}

export const PropertyCard = ({
  property,
  isFavorite,
  onFavoriteToggle,
  onSelect
}: PropertyCardProps) => {
  const { language } = useLanguage();
  const t = (key: string) => rentalTranslations[language]?.[key] || key;
  
  return (
    <Card className="glass-card overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white"
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(property.id);
          }}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>
        <div className="absolute top-2 left-2">
          <Badge className="bg-green-500 text-white">
            -{property.savings_percentage}%
          </Badge>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-white mb-1">{property.title}</h3>
          <div className="flex items-center text-white/60 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {property.address}
          </div>
          <div className="flex items-center text-white/60 text-sm mt-1">
            <School className="w-4 h-4 mr-1" />
            {property.distance_to_university}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="glass p-2 rounded text-center">
            <span className="text-white text-sm font-semibold">{property.rooms}</span>
            <span className="block text-white/60 text-xs">{t('rooms')}</span>
          </div>
          <div className="glass p-2 rounded text-center">
            <span className="text-white text-sm font-semibold">{property.bathrooms}</span>
            <span className="block text-white/60 text-xs">{t('bathrooms')}</span>
          </div>
          <div className="glass p-2 rounded text-center">
            <span className="text-white text-sm font-semibold">{property.size_sqm}m²</span>
            <span className="block text-white/60 text-xs">{t('surface')}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-white/60 text-sm">{t('marketPrice')}</span>
            <div className="flex items-center">
              <span className="text-white/60 text-sm line-through mr-2">
                €{property.market_price_monthly}{t('perMonth')}
              </span>
              <span className="text-lg font-bold text-white">
                €{property.discounted_price_monthly}{t('perMonth')}
              </span>
            </div>
          </div>
          <Button onClick={() => onSelect(property)}>
            {t('details')} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
