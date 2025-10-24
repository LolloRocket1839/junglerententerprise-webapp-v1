import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Heart, MapPin, Sparkles, ArrowRight, Sun } from 'lucide-react';
import { UnifiedProperty } from '@/hooks/useUnifiedProperties';
import { useLanguage } from '@/contexts/LanguageContext';
import { rentalTranslations } from '@/translations/rental';

interface PropertyCardProps {
  property: UnifiedProperty;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
  onSelect: (property: UnifiedProperty) => void;
}

export const PropertyCard = ({
  property,
  isFavorite,
  onFavoriteToggle,
  onSelect
}: PropertyCardProps) => {
  const { language } = useLanguage();
  const t = (key: string) => rentalTranslations[language]?.[key] || key;
  
  // Calculate discount if applicable
  const hasDiscount = property.usage_mode === 'student_only' && 
    property.student_price_monthly && 
    property.student_price_monthly < (property.current_value || 0);

  return (
    <Card className="glass-card overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.images[0] || '/placeholder.svg'} 
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
        
        {/* Hybrid Property Badge */}
        {property.usage_mode === 'hybrid' && (
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Hybrid Property
            </Badge>
            {property.summer_period_start && property.summer_period_end && (
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white flex items-center gap-1">
                <Sun className="h-3 w-3" />
                Estate disponibile
              </Badge>
            )}
          </div>
        )}
        
        {hasDiscount && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-green-500 text-white">
              Sconto Studenti
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-white mb-1">{property.title}</h3>
          <div className="flex items-center text-white/60 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {property.address}, {property.city}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="glass p-2 rounded text-center">
            <span className="text-white text-sm font-semibold">{property.rooms}</span>
            <span className="block text-white/60 text-xs">{t('rooms')}</span>
          </div>
          <div className="glass p-2 rounded text-center">
            <span className="text-white text-sm font-semibold">{property.bathrooms || 1}</span>
            <span className="block text-white/60 text-xs">{t('bathrooms')}</span>
          </div>
          <div className="glass p-2 rounded text-center">
            <span className="text-white text-sm font-semibold">
              {property.size_sqm ? `${property.size_sqm}m²` : '-'}
            </span>
            <span className="block text-white/60 text-xs">{t('surface')}</span>
          </div>
        </div>
        
        {/* Hybrid property info */}
        {property.usage_mode === 'hybrid' && property.academic_year_start && property.academic_year_end && (
          <div className="mb-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <p className="text-sm text-purple-200 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Anno accademico: {new Date(property.academic_year_start).toLocaleDateString()} - {new Date(property.academic_year_end).toLocaleDateString()}
            </p>
            {property.summer_period_start && property.summer_period_end && (
              <p className="text-xs text-purple-200/70 mt-1 flex items-center gap-2">
                <Sun className="h-3 w-3" />
                Estate: {new Date(property.summer_period_start).toLocaleDateString()} - {new Date(property.summer_period_end).toLocaleDateString()}
              </p>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-white/60 text-sm">
              {property.usage_mode === 'hybrid' ? 'Prezzo studente' : t('marketPrice')}
            </span>
            <div className="flex items-center">
              <span className="text-lg font-bold text-white">
                €{property.student_price_monthly || 0}{t('perMonth')}
              </span>
            </div>
            {property.usage_mode === 'hybrid' && property.tourist_price_nightly && (
              <p className="text-xs text-white/60 mt-1">
                Estate: €{property.tourist_price_nightly}/notte
              </p>
            )}
          </div>
          <Button onClick={() => onSelect(property)}>
            {t('details')} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
