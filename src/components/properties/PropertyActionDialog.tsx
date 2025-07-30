import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Calendar, 
  Home, 
  MapPin,
  Star,
  Users,
  Wifi,
  Car,
  Coffee
} from 'lucide-react';
import { UnifiedProperty } from './UnifiedPropertyGrid';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

interface PropertyActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: UnifiedProperty;
  action: 'invest' | 'book' | 'rent' | null;
}

const PropertyActionDialog = ({ 
  open, 
  onOpenChange, 
  property, 
  action 
}: PropertyActionDialogProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const getActionConfig = () => {
    switch (action) {
      case 'invest':
        return {
          title: 'Investimento',
          icon: TrendingUp,
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/30',
          description: 'Investi in questa proprietà e ottieni rendimenti dai canoni di affitto'
        };
      case 'book':
        return {
          title: 'Prenotazione',
          icon: Calendar,
          color: 'text-blue-400',
          bgColor: 'bg-blue-500/10',
          borderColor: 'border-blue-500/30',
          description: 'Prenota un soggiorno in questa proprietà'
        };
      case 'rent':
        return {
          title: 'Affitto',
          icon: Home,
          color: 'text-green-400',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/30',
          description: 'Affitta questa proprietà per il tuo periodo di studi'
        };
      default:
        return null;
    }
  };

  const handleAction = () => {
    switch (action) {
      case 'invest':
        if (property.property_type === 'hub') {
          navigate(`/invest?hub=${property.id}`);
        } else {
          toast({
            title: "Info",
            description: "Questa proprietà non è disponibile per investimenti",
          });
        }
        break;
      case 'book':
        if (property.property_type === 'hub') {
          navigate(`/stay?hub=${property.id}`);
        } else {
          toast({
            title: "Info", 
            description: "Questa proprietà non è disponibile per soggiorni brevi",
          });
        }
        break;
      case 'rent':
        navigate(`/rent?property=${property.id}`);
        break;
    }
    onOpenChange(false);
  };

  const actionConfig = getActionConfig();
  if (!actionConfig) return null;

  const ActionIcon = actionConfig.icon;
  const primaryImage = property.images?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-black/90 border-white/10">
        <DialogHeader>
          <DialogTitle className={`flex items-center gap-2 ${actionConfig.color}`}>
            <ActionIcon className="h-5 w-5" />
            {actionConfig.title} - {property.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Property Image */}
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img
              src={primaryImage}
              alt={property.name}
              className="object-cover w-full h-full"
            />
            
            {/* Rating Overlay */}
            {property.rating && (
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-full">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-white text-xs">{property.rating}</span>
                {property.reviews_count && (
                  <span className="text-white/60 text-xs">({property.reviews_count})</span>
                )}
              </div>
            )}
          </div>

          {/* Property Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">{property.name}</h3>
              <div className="flex items-center gap-1 text-white/60">
                <MapPin className="h-4 w-4" />
                <span>{property.location}</span>
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <p className="text-white/70 text-sm leading-relaxed">
                {property.description}
              </p>
            )}

            {/* Action-specific info */}
            <div className={`p-4 rounded-lg ${actionConfig.bgColor} border ${actionConfig.borderColor}`}>
              <div className={`flex items-center gap-2 mb-2 ${actionConfig.color}`}>
                <ActionIcon className="h-4 w-4" />
                <span className="font-medium">{actionConfig.title}</span>
              </div>
              <p className="text-white/80 text-sm mb-3">{actionConfig.description}</p>
              
              {action === 'invest' && property.investment_goal && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Obiettivo:</span>
                    <span className="text-white">€{property.investment_goal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Raccolti:</span>
                    <span className="text-white">€{property.amount_raised?.toLocaleString() || 0}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${Math.min(((property.amount_raised || 0) / property.investment_goal) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
              
              {action === 'book' && property.price_per_night && (
                <div className="text-lg font-semibold text-white">
                  €{property.price_per_night}/notte
                </div>
              )}
              
              {action === 'rent' && (property.discounted_price_monthly || property.market_price_monthly) && (
                <div className="space-y-1">
                  {property.discounted_price_monthly && (
                    <div className="text-lg font-semibold text-green-400">
                      €{property.discounted_price_monthly}/mese
                    </div>
                  )}
                  {property.market_price_monthly && property.discounted_price_monthly && (
                    <div className="text-sm text-white/60 line-through">
                      €{property.market_price_monthly}/mese
                    </div>
                  )}
                  {property.market_price_monthly && !property.discounted_price_monthly && (
                    <div className="text-lg font-semibold text-white">
                      €{property.market_price_monthly}/mese
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-white font-medium text-sm">Servizi inclusi:</h4>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-white/5 border-white/10">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Annulla
            </Button>
            <Button
              onClick={handleAction}
              className={`flex-1 ${actionConfig.bgColor} ${actionConfig.borderColor} ${actionConfig.color} hover:opacity-80`}
            >
              <ActionIcon className="h-4 w-4 mr-2" />
              {action === 'invest' && 'Vai agli Investimenti'}
              {action === 'book' && 'Vai alle Prenotazioni'}
              {action === 'rent' && 'Vai agli Affitti'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyActionDialog;