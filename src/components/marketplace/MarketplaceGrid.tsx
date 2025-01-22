import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import MarketplaceHeader from './MarketplaceHeader';
import MarketplaceItem from './MarketplaceItem';
import { MarketplaceCategory } from './types';

const MarketplaceGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<MarketplaceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const { data: marketplaceItems = [], isLoading, error } = useQuery({
    queryKey: ['marketplace-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketplace_items')
        .select(`
          *,
          seller:profiles(
            id,
            first_name,
            last_name,
            avatar_url
          )
        `);

      if (error) throw error;
      return data || [];
    }
  });

  const filteredItems = marketplaceItems.filter(item => {
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <MarketplaceHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="mt-8 text-center text-white/60">Caricamento...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <MarketplaceHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="mt-8 text-center text-red-500">
          Errore nel caricamento degli articoli. Riprova più tardi.
        </div>
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