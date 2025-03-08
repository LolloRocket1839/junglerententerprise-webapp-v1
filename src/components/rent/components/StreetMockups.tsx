
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

interface RoomMockup {
  id: string;
  name: string;
  price: number;
  size: string;
  image: string;
}

interface StreetProperty {
  street: string;
  description: string;
  image: string;
  rooms: RoomMockup[];
}

const mockProperties: StreetProperty[] = [
  {
    street: "Via Reumberto 1",
    description: "Elegante palazzo nel centro storico",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    rooms: [
      {
        id: "1",
        name: "Camera Singola A",
        price: 450,
        size: "16m²",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
      },
      {
        id: "2",
        name: "Camera Doppia B",
        price: 650,
        size: "24m²",
        image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
      }
    ]
  },
  {
    street: "Via Roma 42",
    description: "Moderno complesso residenziale",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    rooms: [
      {
        id: "3",
        name: "Studio C",
        price: 550,
        size: "20m²",
        image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
      }
    ]
  }
];

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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {property.rooms.map((room) => (
                  <Card key={room.id} className="glass-card overflow-hidden">
                    <div className="relative h-40">
                      <img 
                        src={room.image} 
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-white mb-2">{room.name}</h4>
                      <div className="flex justify-between text-white/60">
                        <span>{room.size}</span>
                        <span>€{room.price}/mese</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
};
