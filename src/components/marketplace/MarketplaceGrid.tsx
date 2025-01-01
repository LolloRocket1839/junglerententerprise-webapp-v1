import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MarketplaceItem from './MarketplaceItem';
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

export type MarketplaceCategory = 'furniture' | 'electronics' | 'textbooks' | 'services' | 'all';

export interface MarketplaceItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MarketplaceCategory;
  imageUrl: string;
  seller: {
    id: string;
    name: string;
    rating: number;
  };
  createdAt: string;
}

const mockItems: MarketplaceItemType[] = [
  {
    id: '1',
    name: 'MacBook Pro 2021',
    description: 'Excellent condition, barely used. Perfect for students.',
    price: 1200,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    seller: {
      id: '1',
      name: 'John D.',
      rating: 4.5
    },
    createdAt: '2024-02-20'
  },
  {
    id: '2',
    name: 'Study Desk',
    description: 'Sturdy desk with drawer storage. Perfect for small spaces.',
    price: 80,
    category: 'furniture',
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd',
    seller: {
      id: '2',
      name: 'Maria S.',
      rating: 4.8
    },
    createdAt: '2024-02-19'
  },
  {
    id: '3',
    name: 'Computer Science Textbooks Bundle',
    description: 'Complete set of CS textbooks for first-year students.',
    price: 150,
    category: 'textbooks',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6',
    seller: {
      id: '3',
      name: 'Alex K.',
      rating: 4.2
    },
    createdAt: '2024-02-18'
  },
  {
    id: '4',
    name: 'Math Tutoring',
    description: 'Private math tutoring sessions. Specializing in calculus and linear algebra.',
    price: 25,
    category: 'services',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173',
    seller: {
      id: '4',
      name: 'Sarah M.',
      rating: 4.9
    },
    createdAt: '2024-02-17'
  },
  {
    id: '5',
    name: 'Photography Service',
    description: 'Professional headshots and portfolio pictures for students.',
    price: 50,
    category: 'services',
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e',
    seller: {
      id: '5',
      name: 'Mike R.',
      rating: 4.7
    },
    createdAt: '2024-02-16'
  },
  {
    id: '6',
    name: 'Language Exchange',
    description: 'Spanish-English language exchange sessions. 1 hour each way.',
    price: 0,
    category: 'services',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    seller: {
      id: '6',
      name: 'Carlos P.',
      rating: 4.6
    },
    createdAt: '2024-02-15'
  },
  {
    id: '7',
    name: 'Resume Review',
    description: 'Professional resume review and optimization for job applications.',
    price: 30,
    category: 'services',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4',
    seller: {
      id: '7',
      name: 'Emma L.',
      rating: 4.8
    },
    createdAt: '2024-02-14'
  }
];

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
      title: "Added to Wishlist",
      description: "We'll notify you about similar items!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#111111] to-[#222222]">
      {/* Fixed Search Header */}
      <div className="sticky top-16 z-10 bg-black/50 backdrop-blur-xl border-b border-white/10 px-4 py-3 space-y-3">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
          <Input
            placeholder="Search marketplace..."
            className="pl-10 pr-4 h-12 w-full glass-input bg-white/5 border-white/10 text-white placeholder:text-white/40"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="h-4 w-4 text-white/60" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide max-w-2xl mx-auto">
          {(['all', 'furniture', 'electronics', 'textbooks', 'services'] as const).map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`px-4 py-1.5 rounded-full cursor-pointer whitespace-nowrap transition-all duration-300 ${
                selectedCategory === category 
                  ? 'bg-primary text-black font-medium' 
                  : 'bg-white/5 text-white/80 border border-white/10 hover:bg-white/10'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Items' : category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="p-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <MarketplaceItem 
              key={item.id}
              item={item}
              onWishlist={() => handleWishlist(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceGrid;