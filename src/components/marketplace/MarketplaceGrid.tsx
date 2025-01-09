import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import MarketplaceItem from './MarketplaceItem';
import MarketplaceHeader from './MarketplaceHeader';
import ActivityFeed from '../rent/ActivityFeed';
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

  const handleWishlist = (itemId: string) => {
    toast({
      title: "Aggiunto ai Preferiti",
      description: "Ti notificheremo per articoli simili!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#111111] to-[#222222]">
      <MarketplaceHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="p-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <MarketplaceItem 
                key={item.id}
                item={item}
                onWishlist={() => handleWishlist(item.id)}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceGrid;