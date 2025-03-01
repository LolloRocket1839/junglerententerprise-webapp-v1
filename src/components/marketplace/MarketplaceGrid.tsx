
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import MarketplaceHeader from './MarketplaceHeader';
import MarketplaceItem from './MarketplaceItem';
import { MarketplaceCategory } from './types';
import { mockItems } from './mockData';

const MarketplaceGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<MarketplaceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const filteredItems = mockItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleWishlist = () => {
    toast({
      title: "Aggiunto ai Preferiti",
      description: "Ti notificheremo per articoli simili!",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <MarketplaceHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredItems.map((item) => (
          <MarketplaceItem 
            key={item.id} 
            item={item} 
            onWishlist={handleWishlist}
          />
        ))}
      </div>
    </div>
  );
};

export default MarketplaceGrid;
