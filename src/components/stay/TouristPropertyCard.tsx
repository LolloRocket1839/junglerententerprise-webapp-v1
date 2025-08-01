
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TouristProperty } from '@/types/tourist';
import { Bed, Bath, Users, MapPin, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { stayTranslations } from '@/translations/stay';

interface TouristPropertyCardProps {
  property: TouristProperty;
  onSelect: (property: TouristProperty) => void;
}

export const TouristPropertyCard = ({ property, onSelect }: TouristPropertyCardProps) => {
  const { language } = useLanguage();
  const t = (key: string) => stayTranslations[language]?.[key] || key;
  
  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] bg-white/5 border-white/10 shadow-md"
      onClick={() => onSelect(property)}
      tabIndex={0}
      role="button"
      aria-label={`${t('select')} ${property.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(property);
          e.preventDefault();
        }
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-start">
          <Badge 
            className="bg-primary text-white"
            variant="secondary"
          >
            {t('from')} €{property.price_per_night}/{t('night')}
          </Badge>
          
          {property.capacity >= 3 && (
            <Badge 
              className="bg-pink-600/80 text-white"
              variant="secondary"
            >
              {t('perfectForGroups')}
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-xl font-semibold mb-1 text-white group-hover:text-primary transition-colors">{property.title}</h3>
        <p className="text-sm text-gray-300 mb-3 flex items-center gap-1">
          <MapPin size={14} className="text-gray-400" /> 
          {property.address}
        </p>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center gap-1 text-sm text-gray-300">
            <Users size={14} className="text-gray-400" />
            <span>{property.capacity} {property.capacity === 1 ? t('guest') : t('guestsPlural')}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-300">
            <Bed size={14} className="text-gray-400" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? t('room') : t('rooms')}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-300">
            <Bath size={14} className="text-gray-400" />
            <span>{property.bathrooms} {property.bathrooms === 1 ? t('bathroom') : t('bathrooms')}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
          <div>
            <p className="text-sm text-gray-400">{t('cleaning')}</p>
            <p className="text-base text-white">€{property.cleaning_fee}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1 justify-end">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-white text-sm">4.8</span>
            </div>
            <p className="text-lg font-bold text-green-500">€{property.price_per_night + property.cleaning_fee}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
