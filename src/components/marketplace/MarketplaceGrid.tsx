
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import MarketplaceHeader from './MarketplaceHeader';
import MarketplaceItem from './MarketplaceItem';
import CreateMarketplaceItemDialog from './CreateMarketplaceItemDialog';
import { MarketplaceCategory, MarketplaceItemType } from './types';
import { supabase } from "@/integrations/supabase/client";

const MarketplaceGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<MarketplaceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<MarketplaceItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadItems = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('marketplace_items')
        .select(`
          *,
          seller:profiles!marketplace_items_seller_id_fkey (
            id,
            first_name,
            last_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedItems: MarketplaceItemType[] = data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category as MarketplaceCategory,
        image_url: item.image_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500',
        seller: {
          id: item.seller.id,
          first_name: item.seller.first_name || '',
          last_name: item.seller.last_name || '',
          avatar_url: item.seller.avatar_url
        },
        lookingFor: item.looking_for,
        created_at: item.created_at,
        updated_at: item.updated_at
      }));

      setItems(formattedItems);
    } catch (error) {
      console.error('Error loading items:', error);
      toast({
        title: "Errore",
        description: "Errore nel caricamento degli annunci",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const filteredItems = items.filter(item => {
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Marketplace</h1>
        <CreateMarketplaceItemDialog onItemCreated={loadItems} />
      </div>
      
      <MarketplaceHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-black/50 border border-white/10 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <MarketplaceItem 
                key={item.id} 
                item={item} 
                onWishlist={handleWishlist}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-white/60 text-lg">Nessun annuncio trovato</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MarketplaceGrid;
