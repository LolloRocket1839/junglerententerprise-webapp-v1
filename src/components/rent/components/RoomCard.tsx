
import React from 'react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { RoomMockup } from '../types/mockups';
import { RoomDetailsDialog } from './RoomDetailsDialog';

interface RoomCardProps {
  room: RoomMockup;
  propertyStreet: string;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, propertyStreet }) => {
  return (
    <Dialog>
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
      <RoomDetailsDialog room={room} propertyStreet={propertyStreet} />
    </Dialog>
  );
};
