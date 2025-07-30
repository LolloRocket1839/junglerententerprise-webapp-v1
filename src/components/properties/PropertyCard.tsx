import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Calendar, 
  Home, 
  Star, 
  MapPin, 
  Euro,
  Users,
  Bed
} from 'lucide-react';
import { UnifiedProperty } from './UnifiedPropertyGrid';
import PropertyActionDialog from './PropertyActionDialog';

interface PropertyCardProps {
  property: UnifiedProperty;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'invest' | 'book' | 'rent' | null>(null);

  const handleAction = (action: 'invest' | 'book' | 'rent') => {
    setSelectedAction(action);
    setActionDialogOpen(true);
  };

  const getUsageTypeBadges = () => {
    const badges: { type: string; label: string; variant: string; icon: any }[] = [];
    
    if (property.usage_types.includes('investment')) {
      badges.push({
        type: 'investment',
        label: 'Investi',
        variant: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        icon: TrendingUp
      });
    }
    
    if (property.usage_types.includes('short_term')) {
      badges.push({
        type: 'short_term',
        label: 'Prenota',
        variant: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        icon: Calendar
      });
    }
    
    if (property.usage_types.includes('long_term')) {
      badges.push({
        type: 'long_term',
        label: 'Affitta',
        variant: 'bg-green-500/20 text-green-400 border-green-500/30',
        icon: Home
      });
    }
    
    return badges;
  };

  const getMainPrice = () => {
    if (property.price_per_night) {
      return `€${property.price_per_night}/notte`;
    }
    if (property.discounted_price_monthly) {
      return `€${property.discounted_price_monthly}/mese`;
    }
    if (property.market_price_monthly) {
      return `€${property.market_price_monthly}/mese`;
    }
    return 'Prezzo su richiesta';
  };

  const getInvestmentProgress = () => {
    if (property.investment_goal && property.amount_raised) {
      return (property.amount_raised / property.investment_goal) * 100;
    }
    return 0;
  };

  const primaryImage = property.images?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500';

  return (
    <>
      <Card className="overflow-hidden bg-black/50 border-white/10 hover:border-white/20 transition-all duration-300 group">
        {/* Image */}
        <div className="aspect-video relative overflow-hidden">
          <img
            src={primaryImage}
            alt={property.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Usage Type Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {getUsageTypeBadges().map((badge) => {
              const Icon = badge.icon;
              return (
                <Badge 
                  key={badge.type}
                  className={`${badge.variant} text-xs flex items-center gap-1 px-2 py-1`}
                >
                  <Icon className="h-3 w-3" />
                  {badge.label}
                </Badge>
              );
            })}
          </div>

          {/* Rating */}
          {property.rating && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-full">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-white text-xs">{property.rating}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Header */}
          <div>
            <h3 className="text-lg font-semibold text-white line-clamp-1">{property.name}</h3>
            <div className="flex items-center gap-1 text-white/60 text-sm">
              <MapPin className="h-3 w-3" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-white">{getMainPrice()}</span>
            {property.discounted_price_monthly && property.market_price_monthly && (
              <span className="text-sm text-white/60 line-through">
                €{property.market_price_monthly}/mese
              </span>
            )}
          </div>

          {/* Investment Progress */}
          {property.usage_types.includes('investment') && property.investment_goal && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-white/60">
                <span>Raccolti: €{property.amount_raised?.toLocaleString() || 0}</span>
                <span>Obiettivo: €{property.investment_goal.toLocaleString()}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div 
                  className="bg-primary h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(getInvestmentProgress(), 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {property.amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-white/5 border-white/10">
                  {amenity}
                </Badge>
              ))}
              {property.amenities.length > 3 && (
                <Badge variant="outline" className="text-xs bg-white/5 border-white/10">
                  +{property.amenities.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {property.usage_types.includes('investment') && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20"
                onClick={() => handleAction('invest')}
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                Investi
              </Button>
            )}
            
            {property.usage_types.includes('short_term') && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                onClick={() => handleAction('book')}
              >
                <Calendar className="h-3 w-3 mr-1" />
                Prenota
              </Button>
            )}
            
            {property.usage_types.includes('long_term') && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20"
                onClick={() => handleAction('rent')}
              >
                <Home className="h-3 w-3 mr-1" />
                Affitta
              </Button>
            )}
          </div>
        </div>
      </Card>

      <PropertyActionDialog
        open={actionDialogOpen}
        onOpenChange={setActionDialogOpen}
        property={property}
        action={selectedAction}
      />
    </>
  );
};

export default PropertyCard;