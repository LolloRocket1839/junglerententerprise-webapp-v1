import RoomCard from './RoomCard';
import { useToast } from "@/components/ui/use-toast";

interface RoomGridProps {
  rooms: any[];
}

const RoomGrid = ({ rooms }: RoomGridProps) => {
  const { toast } = useToast();

  const handleRoomClick = (roomId: number) => {
    // For beta, navigate to a dummy room detail page
    toast({
      title: "Stanza selezionata",
      description: "I dettagli completi saranno disponibili nel prossimo aggiornamento!",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <RoomCard 
            key={room.id} 
            room={room}
            onRoomClick={handleRoomClick}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomGrid;