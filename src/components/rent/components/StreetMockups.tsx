
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { mockProperties } from '../data/streetMockData';
import { RoomCard } from './RoomCard';

export const StreetMockups = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-white mb-8 text-center">
        Appartamenti Disponibili
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockProperties.map((property) => (
          <Dialog key={property.street}>
            <DialogTrigger asChild>
              <Card className="glass-card overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02]">
                <div className="relative h-48">
                  <img 
                    src={property.image} 
                    alt={property.street}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{property.street}</h3>
                  <p className="text-white/60">{property.description}</p>
                </div>
              </Card>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[800px] bg-[#1a1a1a] border-white/10">
              <DialogHeader>
                <DialogTitle className="text-2xl text-white">{property.street}</DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 gap-6 mt-4">
                {property.rooms.map((room) => (
                  <RoomCard key={room.id} room={room} propertyStreet={property.street} />
                ))}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
};
