import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Ruler, Bed, Phone, Key } from 'lucide-react';
import { RoomMockup } from '../types/mockups';
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface RoomDetailsDialogProps {
  room: RoomMockup;
  propertyStreet: string;
}

export const RoomDetailsDialog: React.FC<RoomDetailsDialogProps> = ({ room, propertyStreet }) => {
  const handleCall = () => {
    window.location.href = `tel:${room.contactPhone}`;
  };

  return (
    <DialogContent className="sm:max-w-[900px] bg-[#1a1a1a] border-white/10">
      <DialogHeader>
        <DialogTitle className="text-2xl text-white mb-4">{room.name} - {propertyStreet}</DialogTitle>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="relative h-64 rounded-lg overflow-hidden">
            <ImageWithFallback 
              src={room.images[0]} 
              alt={room.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {room.images.slice(1).map((image, idx) => (
              <div key={idx} className="relative h-32 rounded-lg overflow-hidden">
                <ImageWithFallback 
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

          <div className="bg-white/5 rounded-lg p-4 space-y-4">
            <div className="text-2xl font-bold text-white mb-1">€{room.price}/mese</div>
            <div className="text-white/60">{room.availability}</div>
            
            <div className="flex flex-col gap-3 pt-3">
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => alert('Functionality coming soon')}
              >
                <Key className="mr-2 h-4 w-4" />
                Affitta ora
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-primary/20 hover:bg-primary/10"
                onClick={handleCall}
              >
                <Phone className="mr-2 h-4 w-4" />
                Chiama per informazioni
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};
