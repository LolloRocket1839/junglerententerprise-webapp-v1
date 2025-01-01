import { Heart } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { MarketplaceItemType } from './MarketplaceGrid';

interface MarketplaceItemProps {
  item: MarketplaceItemType;
  onWishlist: () => void;
}

const MarketplaceItem = ({ item, onWishlist }: MarketplaceItemProps) => {
  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
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
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:scale-110 transition-transform"
        >
          <Heart className="h-4 w-4 text-gray-600" />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-3 space-y-1">
        <div className="flex justify-between items-start">
          <p className="font-medium text-sm line-clamp-1">{item.name}</p>
          <p className="text-sm font-semibold text-primary">€{item.price}</p>
        </div>
        
        <p className="text-xs text-gray-500 line-clamp-1">
          {item.seller.name} • {item.seller.rating}★
        </p>
      </div>
    </Card>
  );
};

export default MarketplaceItem;