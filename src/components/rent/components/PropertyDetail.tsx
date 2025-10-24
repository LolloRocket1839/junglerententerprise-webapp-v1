import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Heart, MapPin, Home, Calendar, CheckCircle, Phone, Key } from 'lucide-react';
import { Application } from '../types';
import { UnifiedProperty } from '@/hooks/useUnifiedProperties';
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { getMonthlyPrice, getMarketPrice, getDiscountPercentage, getAvailabilityStart, getDepositAmount } from '@/utils/propertyAdapter';

interface PropertyDetailProps {
  property: UnifiedProperty;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
  onBack: () => void;
  onApply: (property: UnifiedProperty) => void;
  applications: Application[];
}

export const PropertyDetail = ({
  property,
  isFavorite,
  onFavoriteToggle,
  onBack,
  onApply,
  applications
}: PropertyDetailProps) => {
  const phoneNumber = "+393319053037";
  const isApplied = applications.some(app => app.property_id === property.id);
  const applicationStatus = isApplied ? 
    applications.find(app => app.property_id === property.id)?.status : null;

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const monthlyPrice = getMonthlyPrice(property);
  const marketPrice = getMarketPrice(property);
  const discountPercentage = getDiscountPercentage(property);
  const availabilityStart = getAvailabilityStart(property);
  const depositAmount = getDepositAmount(property);

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <Button 
        variant="outline" 
        className="mb-6 bg-white/10 text-white hover:bg-white/20 border-white/20"
        onClick={onBack}
      >
        Torna ai risultati
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="glass-card overflow-hidden">
            <div className="relative aspect-video">
              <ImageWithFallback 
                src={property.images[0]} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white"
                onClick={() => onFavoriteToggle(property.id)}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              {discountPercentage > 0 && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-500 text-white">
                    -{discountPercentage}%
                  </Badge>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {property.title}
                </h2>
                <div className="flex items-center text-white/60">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.address}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Descrizione</h3>
                <p className="text-white/80">{property.description}</p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="glass p-3 rounded text-center">
                  <Home className="w-5 h-5 text-primary mx-auto mb-1" />
                  <span className="text-white text-sm font-semibold">{property.rooms}</span>
                  <span className="block text-white/60 text-xs">Stanze</span>
                </div>
                <div className="glass p-3 rounded text-center">
                  <span className="text-white text-sm font-semibold">{property.bathrooms}</span>
                  <span className="block text-white/60 text-xs">Bagni</span>
                </div>
                <div className="glass p-3 rounded text-center">
                  <span className="text-white text-sm font-semibold">{property.size_sqm}m²</span>
                  <span className="block text-white/60 text-xs">Superficie</span>
                </div>
                <div className="glass p-3 rounded text-center">
                  <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
                  <span className="text-white text-sm font-semibold">
                    {new Date(availabilityStart).toLocaleDateString('it-IT', {month: 'short', day: 'numeric'})}
                  </span>
                  <span className="block text-white/60 text-xs">Disponibile dal</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Caratteristiche</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    {property.has_balcony ? "Balcone" : "No balcone"}
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    {property.has_kitchen ? "Cucina" : "No cucina"}
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    {property.utilities_included ? "Utenze incluse" : "Utenze escluse"}
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Arredato
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="glass-card p-6 mb-6 sticky top-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Dettagli di prezzo
            </h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-white/80">
                <span>Prezzo di mercato</span>
                <span className="line-through">€{marketPrice}/mese</span>
              </div>
              <div className="flex justify-between text-white font-bold text-lg">
                <span>Prezzo scontato</span>
                <span>€{monthlyPrice}/mese</span>
              </div>
              <div className="flex justify-between text-green-500">
                <span>Risparmio</span>
                <span>€{marketPrice - monthlyPrice}/mese</span>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between text-white/80">
                <span>Cauzione</span>
                <span>€{depositAmount}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => onApply(property)}
                disabled={isApplied}
              >
                <Key className="mr-2 h-4 w-4" />
                Affitta ora
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-primary/20 hover:bg-primary/10"
                onClick={handleCallClick}
              >
                <Phone className="mr-2 h-4 w-4" />
                {phoneNumber}
              </Button>
            </div>

            {isApplied && (
              <div className="mt-4 bg-primary/20 p-4 rounded-lg text-center">
                <CheckCircle className="mx-auto h-6 w-6 text-primary mb-2" />
                <p className="text-white font-semibold">
                  Domanda già presentata
                </p>
                <p className="text-white/60 text-sm">
                  Stato: {applicationStatus === 'pending' ? 'In attesa' : applicationStatus}
                </p>
              </div>
            )}
            
            <div className="mt-4 text-white/60 text-sm text-center">
              <p>Una volta presentata la domanda, verrai contattato dal proprietario per un colloquio.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
