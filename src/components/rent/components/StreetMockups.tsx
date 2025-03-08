
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { mockProperties } from '../data/streetMockData';
import { RoomCard } from './RoomCard';

export const StreetMockups = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-12 text-center">
        Appartamenti Disponibili
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockProperties.map((property) => (
          <Dialog key={property.street}>
            <DialogTrigger asChild>
              <Card className="glass-card overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] h-full">
                <div className="relative h-64">
                  <img 
                    src={property.image} 
                    alt={property.street}
                    className="w-full h-full object-cover"
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
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
