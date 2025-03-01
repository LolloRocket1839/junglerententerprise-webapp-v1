
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import MarketplaceHeader from './MarketplaceHeader';
import MarketplaceItem from './MarketplaceItem';
import { MarketplaceCategory } from './types';

const MarketplaceGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<MarketplaceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const { data: items, isLoading } = useQuery({
    queryKey: ['marketplace-items', selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('marketplace_items')
        .select('*');
      
      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    }
  });

  const filteredItems = items?.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }) ?? [];

  const handleWishlist = () => {
    toast({
      title: "Aggiunto ai Preferiti",
      description: "Ti notificheremo per articoli simili!",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

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
