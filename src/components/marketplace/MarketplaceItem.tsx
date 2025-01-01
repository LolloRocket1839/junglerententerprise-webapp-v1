import { Heart } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { MarketplaceItemType } from './MarketplaceGrid';

interface MarketplaceItemProps {
  item: MarketplaceItemType;
  onWishlist: () => void;
}

const MarketplaceItem = ({ item, onWishlist }: MarketplaceItemProps) => {
  return (
    <Card className="glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-300">
      <div className="relative">
        {/* Image Container with Fixed Aspect Ratio */}
        <div className="relative pt-[100%]">
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onWishlist();
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-black/50 backdrop-blur-sm 
                     hover:bg-black/70 transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <Heart className="h-4 w-4 text-white" />
        </button>

        {/* Price Tag */}
        <div className="absolute bottom-2 left-2 px-3 py-1 rounded-full bg-primary text-black font-medium text-sm">
          €{item.price}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3 space-y-2 bg-black/50">
        <h3 className="font-medium text-sm text-white line-clamp-1">
          {item.name}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>{item.seller.name}</span>
          <span className="flex items-center gap-1">
            {item.seller.rating}★
          </span>
        </div>
      </div>
    </Card>
  );
};

export default MarketplaceItem;