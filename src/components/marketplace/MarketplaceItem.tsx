import { Heart, MessageCircle, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MarketplaceItemType } from './MarketplaceGrid';

interface MarketplaceItemProps {
  item: MarketplaceItemType;
  onWishlist: () => void;
}

const MarketplaceItem = ({ item, onWishlist }: MarketplaceItemProps) => {
  return (
    <Card className="glass-card overflow-hidden">
      <div className="relative h-48">
        <img 
          src={item.imageUrl} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={onWishlist}
          className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          <Heart className="h-5 w-5 text-white" />
        </button>
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{item.name}</CardTitle>
            <CardDescription className="text-sm text-white/60">
              Listed by {item.seller.name}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-white/80">{item.seller.rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-white/80 line-clamp-2">{item.description}</p>
        <p className="mt-2 text-xl font-bold text-primary">€{item.price}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="default" className="w-full">
          <MessageCircle className="mr-2 h-4 w-4" />
          Contact Seller
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MarketplaceItem;