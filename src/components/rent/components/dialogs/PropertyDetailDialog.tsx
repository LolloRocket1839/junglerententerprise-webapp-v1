import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Heart, MapPin, Home, Calendar, CheckCircle, Phone, Key, Bed, Bath, Wifi, Utensils } from 'lucide-react';
import { UnifiedProperty } from '@/hooks/useUnifiedProperties';
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { useState } from "react";

interface PropertyDetailDialogProps {
  property: UnifiedProperty | null;
  isOpen: boolean;
  onClose: () => void;
  onBooking: (property: UnifiedProperty) => void;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
}

export const PropertyDetailDialog = ({
  property,
  isOpen,
  onClose,
  onBooking,
  isFavorite,
  onFavoriteToggle
}: PropertyDetailDialogProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  if (!property) return null;

  const phoneNumber = "+393319053037";

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-lg border-white/10">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl text-foreground mb-2">
                {property.title}
              </DialogTitle>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {property.address}, {property.city}
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onFavoriteToggle(property.id)}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {/* Image Gallery */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <ImageWithFallback 
                src={property.images[selectedImageIndex] || property.images[0]} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {property.discount_percentage > 0 && (
                <Badge className="absolute top-4 left-4 bg-green-500 text-white">
                  -{property.discount_percentage}% SCONTO
                </Badge>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {property.images.slice(0, 4).map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <ImageWithFallback 
                    src={image} 
                    alt={`${property.title} - ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Description */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Descrizione</h3>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </Card>

            {/* Amenities */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Caratteristiche</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-primary" />
                  <span>{property.rooms} Stanze</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-primary" />
                  <span>{property.bathrooms} Bagni</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-primary" />
                  <span>{property.size_sqm}m²</span>
                </div>
                {property.has_kitchen && (
                  <div className="flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-primary" />
                    <span>Cucina</span>
                  </div>
                )}
                {property.internet_available && (
                  <div className="flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-primary" />
                    <span>WiFi {property.internet_speed}Mbps</span>
                  </div>
                )}
                {property.has_balcony && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Balcone</span>
                  </div>
                )}
              </div>

              {property.appliances && property.appliances.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Elettrodomestici</h4>
                  <div className="flex flex-wrap gap-2">
                    {property.appliances.map((appliance, idx) => (
                      <Badge key={idx} variant="secondary">{appliance}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {property.utilities && property.utilities.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Utenze</h4>
                  <div className="flex flex-wrap gap-2">
                    {property.utilities.map((utility, idx) => (
                      <Badge key={idx} variant="outline">{utility}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Prezzo di mercato</p>
                  <p className="text-lg line-through text-muted-foreground">
                    €{property.market_price_monthly}/mese
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Prezzo Jungle Rent</p>
                  <p className="text-3xl font-bold text-primary">
                    €{property.discounted_price_monthly}
                    <span className="text-sm font-normal text-muted-foreground">/mese</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Risparmio mensile</span>
                    <span className="font-semibold text-green-500">
                      €{property.market_price_monthly - property.discounted_price_monthly}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Cauzione richiesta</span>
                    <span className="font-semibold">
                      €{property.deposit_amount || property.discounted_price_monthly * 2}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Utenze</span>
                    <span className="font-semibold">
                      {property.utilities_included ? 'Incluse' : `€${property.estimated_utilities_cost || 100}/mese`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Disponibile dal {new Date(property.availability_start).toLocaleDateString('it-IT', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <Badge variant={property.current_status === 'available' ? 'default' : 'secondary'}>
                  {property.current_status === 'available' ? 'Disponibile' : 'Non disponibile'}
                </Badge>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full"
                  size="lg"
                  onClick={() => onBooking(property)}
                  disabled={property.current_status !== 'available'}
                >
                  <Key className="mr-2 h-5 w-5" />
                  Affitta ora
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleCallClick}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Contatta proprietario
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Prenotando verrai contattato dal proprietario per finalizzare il contratto
              </p>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
