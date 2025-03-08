
import React from 'react';
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, Key } from 'lucide-react';
import { RoomMockup } from '../types/mockups';

interface RoomCardProps {
  room: RoomMockup;
  propertyStreet: string;
}

export const RoomCard = ({ room, propertyStreet }: RoomCardProps) => {
  const phoneNumber = "+393319053037";
  
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02]">
          <div className="relative h-48">
            <img 
              src={room.image} 
              alt={room.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-2">{room.name}</h3>
            <p className="text-gray-600 mb-4">{propertyStreet}</p>
            <p className="text-xl font-bold text-primary mb-2">€{room.price}/mese</p>
            <p className="text-sm text-gray-500">{room.size} • {room.floorLevel}</p>
          </div>
        </Card>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{room.name} - {propertyStreet}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 
                      [&::-webkit-scrollbar-track]:bg-background 
                      [&::-webkit-scrollbar-track]:rounded-full
                      [&::-webkit-scrollbar-thumb]:bg-primary/50
                      [&::-webkit-scrollbar-thumb]:rounded-full
                      [&::-webkit-scrollbar-thumb]:border-2
                      [&::-webkit-scrollbar-thumb]:border-background
                      [&::-webkit-scrollbar-thumb:hover]:bg-primary/70">
          <div className="space-y-4">
            <img 
              src={room.image} 
              alt={room.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Descrizione</h4>
                <p className="text-gray-600">{room.description}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Arredamento</h4>
                <ul className="list-disc pl-5 text-gray-600">
                  {room.furniture.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Servizi</h4>
                <ul className="list-disc pl-5 text-gray-600">
                  {room.amenities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <p className="text-lg font-semibold text-primary">€{room.price}/mese</p>
                <p className="text-gray-600">{room.availability}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 mt-4 border-t">
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90"
            onClick={() => alert('Funzionalità in arrivo')}
          >
            <Key className="mr-2 h-4 w-4" />
            Affitta ora
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1 border-primary/20 hover:bg-primary/10"
            onClick={handleCall}
          >
            <Phone className="mr-2 h-4 w-4" />
            {phoneNumber}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

