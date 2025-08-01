import { Star, MessageCircle, UserPlus, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { rentalTranslations } from '@/translations/rental';

interface RoomCardProps {
  room: {
    id: number;
    image: string;
    hub: string;
    room: string;
    price: number;
    rating: number;
    reviews: number;
    features: string[];
    tags: string[];
  };
  onRoomClick: (roomId: number) => void;
}

const RoomCard = ({ room, onRoomClick }: RoomCardProps) => {
  const { language } = useLanguage();
  const t = (key: string) => rentalTranslations[language]?.[key] || key;
  
  return (
    <div 
      key={room.id} 
      className="glass-card overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
      onClick={() => onRoomClick(room.id)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={room.image} 
          alt={`${room.hub} - ${room.room}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 rounded-full px-3 py-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-sm">{room.rating}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-1">{room.hub}</h3>
          <p className="text-white/60">{room.room}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {room.features.map((feature, index) => (
            <span 
              key={index}
              className="px-2 py-1 rounded-full text-xs bg-white/10 text-white/80"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {room.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="text-2xl font-bold text-white">€{room.price}</p>
            <p className="text-white/60">{t('perMonth2')}</p>
          </div>
          <p className="text-white/60 text-sm">
            {room.reviews} {t('reviews')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;