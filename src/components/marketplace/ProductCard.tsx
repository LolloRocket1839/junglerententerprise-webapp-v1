import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/types/marketplace';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  return (
    <motion.div
      className="group relative bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden border border-muted-foreground/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* Product Image */}
      <Link to={`/marketplace/product/${product.id}`}>
        <div className="aspect-square relative overflow-hidden">
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500"
            whileHover={{ scale: 1.1 }}
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
          <motion.div
            className="absolute top-2 right-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <Link to={`/marketplace/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-muted text-muted"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground ml-1">
            ({product.reviews.length})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            {product.stock > 0 && (
              <p className="text-xs text-muted-foreground">
                {product.stock} in stock
              </p>
            )}
          </div>
          <Button
            size="sm"
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className={cn(
              "transition-all duration-300",
              isHovered ? "scale-100" : "scale-90"
            )}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Quick View Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Button variant="secondary" asChild>
          <Link to={`/marketplace/product/${product.id}`}>
            Quick View
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}; 