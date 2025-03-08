
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Key } from 'lucide-react';
import { mockProperties } from '../data/streetMockData';
import { RoomCard } from './RoomCard';

export const StreetMockups = () => {
  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <section className="w-full glass rounded-xl p-8 shadow-lg backdrop-blur-sm">
      <h2 className="text-3xl font-bold text-white mb-12 text-center bg-gradient-to-r from-white/90 via-white to-white/90 bg-clip-text">
        Appartamenti Disponibili
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {mockProperties.map((property) => (
          <Dialog key={property.street}>
            <DialogTrigger asChild>
              <Card className="glass-card overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div className="relative h-64">
                  <img 
                    src={property.image} 
                    alt={property.street}
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-3">{property.street}</h3>
                  <p className="text-white/70 text-lg leading-relaxed">{property.description}</p>
                </div>
              </Card>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[900px] bg-[#1a1a1a] border-white/10">
              <DialogHeader>
                <DialogTitle className="text-3xl text-white">{property.street}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                  {property.rooms.map((room) => (
                    <RoomCard key={room.id} room={room} propertyStreet={property.street} />
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-6">
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={() => alert('Functionality coming soon')}
                  >
                    <Key className="mr-2 h-4 w-4" />
                    Visualizza stanze disponibili
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-1 border-primary/20 hover:bg-primary/10"
                    onClick={() => handleCall(property.contactPhone)}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Chiama per informazioni
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
};
