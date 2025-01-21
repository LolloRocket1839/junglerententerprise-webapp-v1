import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketplaceItemType } from './types';

interface MarketplaceItemProps {
  item: MarketplaceItemType;
  onWishlist: () => void;
}

const MarketplaceItem = ({ item, onWishlist }: MarketplaceItemProps) => {
  return (
    <Card className="overflow-hidden bg-black/50 border-white/10">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={onWishlist}
          className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          <Heart className="h-5 w-5 text-white" />
        </button>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-white">{item.name}</h3>
          {item.category === 'swap' ? (
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
              Scambio
            </Badge>
          ) : (
            <span className="text-lg font-bold text-white">€{item.price}</span>
          )}
        </div>
        <p className="text-sm text-white/70">{item.description}</p>
        {item.lookingFor && (
          <div className="mt-2">
            <p className="text-sm font-medium text-emerald-500">Cerca: {item.lookingFor}</p>
          </div>
        )}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/60">{item.seller.name}</span>
            <span className="text-xs text-white/40">•</span>
            <span className="text-sm text-white/60">★ {item.seller.rating}</span>
          </div>
          <Button variant="outline" className="text-xs">
            Contatta
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MarketplaceItem;