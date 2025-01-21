import { Search, X, ArrowLeftRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MarketplaceCategory } from './types';

interface MarketplaceHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: MarketplaceCategory;
  setSelectedCategory: (category: MarketplaceCategory) => void;
}

const MarketplaceHeader = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}: MarketplaceHeaderProps) => {
  const categories: Record<MarketplaceCategory, string> = {
    'all': 'Tutti gli articoli',
    'furniture': 'Arredamento',
    'electronics': 'Elettronica',
    'textbooks': 'Libri',
    'services': 'Servizi',
    'swap': 'Scambia'
  };

  return (
    <div className="sticky top-16 z-10 bg-gradient-to-br from-[#1a472a]/80 via-[#2d5a3f]/80 to-[#3d6b52]/80 backdrop-blur-xl border-b border-white/10 px-4 py-3 space-y-3">
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
        <Input
          placeholder="Cerca nel marketplace..."
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

      <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
        {(Object.keys(categories) as MarketplaceCategory[]).map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`px-4 py-1.5 rounded-full cursor-pointer transition-all duration-300 flex items-center gap-2 ${
              selectedCategory === category 
                ? 'bg-primary text-black font-medium' 
                : 'bg-white/5 text-white/80 border border-white/10 hover:bg-white/10'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'swap' && <ArrowLeftRight className="h-4 w-4" />}
            {categories[category]}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceHeader;