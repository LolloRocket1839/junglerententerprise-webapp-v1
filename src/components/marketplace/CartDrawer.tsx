import { useQuery } from '@tanstack/react-query';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/marketplace';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Drawer } from '@/components/ui/drawer';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CartDrawer = ({ open, onOpenChange }: CartDrawerProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();

  // Fetch product details for cart items
  const { data: products } = useQuery({
    queryKey: ['cart-products', items.map(item => item.productId)],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .in('id', items.map(item => item.productId));

      if (error) throw error;
      return data as unknown as Product[];
    },
    enabled: items.length > 0,
  });

  const handleCheckout = () => {
    onOpenChange(false);
    navigate('/marketplace/checkout');
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <div className="flex flex-col h-full bg-background/95 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-muted-foreground/20">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">{t('shoppingCart')}</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center text-muted-foreground py-8"
              >
                {t('yourCartIsEmpty')}
              </motion.div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const product = products?.find(p => p.id === item.productId);
                  if (!product) return null;

                  return (
                    <motion.div
                      key={item.productId}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-muted-foreground/20"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium line-clamp-1">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          ${product.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="h-8 w-8"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.productId)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t border-muted-foreground/20 p-4 space-y-4 bg-card/50 backdrop-blur-sm">
          <div className="flex justify-between text-lg font-semibold">
            <span>{t('total')}</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={clearCart}
              disabled={items.length === 0}
            >
              {t('clearCart')}
            </Button>
            <Button
              className="flex-1"
              onClick={handleCheckout}
              disabled={items.length === 0}
            >
              {t('checkout')}
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
