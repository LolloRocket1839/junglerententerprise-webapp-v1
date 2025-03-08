
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Ruler, Wifi, Tv, ChefHat, Coffee } from 'lucide-react';

interface RoomMockup {
  id: string;
  name: string;
  price: number;
  size: string;
  image: string;
  description: string;
  furniture: string[];
  amenities: string[];
  availability: string;
  floorLevel: string;
  images: string[];
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
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
        description: "Luminosa camera singola completamente ristrutturata con vista sul cortile interno. Perfetta per studenti, con angolo studio dedicato e ampio armadio.",
        furniture: [
          "Letto singolo con materasso ortopedico",
          "Scrivania con sedia ergonomica",
          "Armadio a 3 ante",
          "Libreria",
          "Comodino"
        ],
        amenities: [
          "Wi-Fi fibra 1GB",
          "Riscaldamento centralizzato",
          "Aria condizionata",
          "Insonorizzazione"
        ],
        availability: "Disponibile dal 1 Settembre 2024",
        floorLevel: "2° Piano con ascensore",
        images: [
          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
          "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
          "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
        ]
      },
      {
        id: "2",
        name: "Camera Doppia B",
        price: 650,
        size: "24m²",
        image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
        description: "Spaziosa camera doppia con balcone privato e bagno en-suite. Ideale per studenti che cercano comfort e privacy.",
        furniture: [
          "2 Letti singoli (possibilità letto matrimoniale)",
          "2 Scrivanie con sedie",
          "2 Armadi",
          "Smart TV 32\"",
          "Mini frigo"
        ],
        amenities: [
          "Bagno privato",
          "Balcone arredato",
          "Wi-Fi fibra 1GB",
          "Aria condizionata"
        ],
        availability: "Disponibile dal 1 Settembre 2024",
        floorLevel: "3° Piano con ascensore",
        images: [
          "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
          "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
        ]
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
        image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
        description: "Moderno monolocale con angolo cottura e zona notte separata. Design contemporaneo e finiture di pregio.",
        furniture: [
          "Letto a una piazza e mezza",
          "Cucina completa di elettrodomestici",
          "Tavolo pieghevole con sedie",
          "Armadio scorrevole",
          "Smart TV 43\""
        ],
        amenities: [
          "Cucina attrezzata",
          "Lavatrice",
          "Wi-Fi fibra 1GB",
          "Videocitofono"
        ],
        availability: "Disponibile dal 15 Settembre 2024",
        floorLevel: "1° Piano",
        images: [
          "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
          "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
        ]
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
              
              <div className="grid grid-cols-1 gap-6 mt-4">
                {property.rooms.map((room) => (
                  <Dialog key={room.id}>
                    <DialogTrigger asChild>
                      <Card className="glass-card overflow-hidden cursor-pointer hover:bg-white/5">
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
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[900px] bg-[#1a1a1a] border-white/10">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-white mb-4">{room.name} - {property.street}</DialogTitle>
                      </DialogHeader>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="relative h-64 rounded-lg overflow-hidden">
                            <img 
                              src={room.images[0]} 
                              alt={room.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {room.images.slice(1).map((image, idx) => (
                              <div key={idx} className="relative h-32 rounded-lg overflow-hidden">
                                <img 
                                  src={image} 
                                  alt={`${room.name} - ${idx + 2}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Dettagli</h3>
                            <p className="text-white/80">{room.description}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-white/80">
                              <Ruler className="h-5 w-5" />
                              <span>{room.size}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/80">
                              <Bed className="h-5 w-5" />
                              <span>{room.floorLevel}</span>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Arredamento</h4>
                            <ul className="list-disc list-inside text-white/80 space-y-1">
                              {room.furniture.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Servizi</h4>
                            <div className="flex flex-wrap gap-2">
                              {room.amenities.map((amenity, idx) => (
                                <Badge key={idx} variant="secondary" className="bg-white/10">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="bg-white/5 rounded-lg p-4">
                            <div className="text-2xl font-bold text-white mb-1">€{room.price}/mese</div>
                            <div className="text-white/60">{room.availability}</div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
};
