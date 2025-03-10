import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Home, Euro } from 'lucide-react';
import { mockProperties } from '../data/mockData';
import { Property } from '../types';

export const StreetMockups = () => {
  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const calculatePricePerRoom = () => {
    return 420; // Fixed price per room
  };

  return (
    <section className="w-full glass rounded-xl p-8 shadow-lg backdrop-blur-sm">
      <h2 className="text-3xl font-bold text-white mb-12 text-center bg-gradient-to-r from-white/90 via-white to-white/90 bg-clip-text">
        Appartamenti Disponibili
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {mockProperties.map((property) => (
          <Dialog key={property.id}>
            <DialogTrigger asChild>
              <Card className="glass-card overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div className="relative h-64">
                  <img 
                    src={property.images[0]} 
                    alt={property.title}
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                  <div className="absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-medium bg-green-500/80 text-white">
                    {property.current_status === "available" ? "Disponibile" : "Non disponibile"}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">{property.title}</h3>
                  <p className="text-white/70 text-lg mb-2">{property.address}</p>
                  <p className="text-white/70 text-sm">{property.distance_to_university}</p>
                  <div className="mt-4">
                    <p className="text-xl font-bold text-primary">€{property.market_price_monthly}/mese</p>
                  </div>
                </div>
              </Card>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[900px] bg-[#1a1a1a] border-white/10 max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl text-white">
                  {property.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 mt-4">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <img 
                    src={property.images[0]} 
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg text-white mb-2">Dettagli</h4>
                    <ul className="space-y-2 text-white/70">
                      <li>Superficie: {property.size_sqm} m²</li>
                      <li>Stanze: {property.rooms}</li>
                      <li>Bagni: {property.bathrooms}</li>
                      <li>Balcone: {property.has_balcony ? "Sì" : "No"}</li>
                      <li>Cucina: {property.has_kitchen ? "Sì" : "No"}</li>
                      <li>Utenze: {property.utilities_included ? "Incluse" : "Escluse"}</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg text-white mb-2">Descrizione</h4>
                    <p className="text-white/70">{property.description}</p>
                    <p className="text-white/70 mt-2">{property.distance_to_university}</p>
                  </div>
                </div>
                
                <div className="bg-white/5 p-6 rounded-lg space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Home className="h-5 w-5 text-primary" />
                        Prezzo Appartamento
                      </h4>
                      <p className="text-2xl font-bold text-primary">€{property.rooms * 420}/mese</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Euro className="h-5 w-5 text-primary" />
                        Prezzo per Stanza
                      </h4>
                      <p className="text-2xl font-bold text-primary">€420/mese</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4 border-t border-white/10">
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => handleCall(property.phone_number)}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Chiama per Info
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="flex-1 border-primary text-primary hover:bg-primary/10"
                      onClick={() => window.location.href = `/rent/apply/${property.id}`}
                    >
                      Affitta Ora
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
};
