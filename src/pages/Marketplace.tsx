import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, ShoppingCart, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product, FilterOptions } from '@/types/marketplace';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { CartDrawer } from '@/components/marketplace/CartDrawer';
import { useLanguage } from '@/contexts/LanguageContext';

const Marketplace = () => {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      let query = supabase.from('products').select('*');
      
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      if (filters.minPrice) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }
      if (filters.rating) {
        query = query.gte('rating', filters.rating);
      }
      if (filters.searchQuery) {
        query = query.ilike('name', `%${filters.searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as unknown as Product[];
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <motion.h1 
              className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t('marketplace')}
            </motion.h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('searchProducts')}
                  className="pl-9 w-[300px] bg-background/50 backdrop-blur-sm border-muted-foreground/20 focus:border-primary/50"
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                />
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="hidden md:flex items-center gap-2 bg-background/50 backdrop-blur-sm border-muted-foreground/20 hover:border-primary/50"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {t('filters')}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsCartOpen(true)}
                className="bg-background/50 backdrop-blur-sm border-muted-foreground/20 hover:border-primary/50"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {t('shoppingCart')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div 
            className={`space-y-6 ${isFilterOpen ? 'block' : 'hidden'} md:block`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-4 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-muted-foreground/20">
              <h2 className="font-semibold text-lg">{t('filters')}</h2>
              <Select
                placeholder={t('category')}
                onChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
                className="bg-background/50"
              >
                <option value="electronics">{t('electronics')}</option>
                <option value="clothing">{t('clothing')}</option>
                <option value="home">{t('home')}</option>
                <option value="sports">{t('sports')}</option>
              </Select>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">{t('priceRange')}</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder={t('min')}
                    onChange={(e) => setFilters(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
                    className="bg-background/50"
                  />
                  <Input
                    type="number"
                    placeholder={t('max')}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                    className="bg-background/50"
                  />
                </div>
              </div>
              <Select
                placeholder={t('sortBy')}
                onChange={(value) => setFilters(prev => ({ ...prev, sortBy: value as 'price' | 'rating' | 'newest' }))}
                className="bg-background/50"
              >
                <option value="price">{t('price')}</option>
                <option value="rating">{t('rating')}</option>
                <option value="newest">{t('newest')}</option>
              </Select>
            </div>
          </motion.div>

          {/* Product Grid */}
          <motion.div 
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-muted/50 rounded-lg aspect-square mb-4" />
                    <div className="h-4 bg-muted/50 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted/50 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </div>
  );
};

export default Marketplace;
