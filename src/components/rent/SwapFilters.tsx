import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge";
import { Shirt, Wrench, Book, Laptop, Home, Package, Sparkles } from 'lucide-react';

export type SwapCategory = 'room' | 'services' | 'clothes' | 'electronics' | 'books' | 'collectibles' | 'various';

interface SwapFiltersProps {
  selectedCategory: SwapCategory;
  onCategoryChange: (category: SwapCategory) => void;
}

const categoryIcons = {
  room: Home,
  services: Wrench,
  clothes: Shirt,
  electronics: Laptop,
  books: Book,
  collectibles: Sparkles,
  various: Package
};

const SwapFilters = ({ selectedCategory, onCategoryChange }: SwapFiltersProps) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center gap-2">
        <Select
          value={selectedCategory}
          onValueChange={(value) => onCategoryChange(value as SwapCategory)}
        >
          <SelectTrigger className="w-[200px] glass-input hover:bg-white/20 active:bg-white/30 focus:bg-white/25">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl rounded-xl">
            {Object.entries(categoryIcons).map(([category, Icon]) => (
              <SelectItem 
                key={category} 
                value={category} 
                className="text-gray-100 font-medium hover:bg-white/20 focus:bg-white/30 hover:text-white flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                <span className="capitalize">{category}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Badge variant="secondary" className="glass bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30">Popular</Badge>
          <Badge variant="secondary" className="glass">New</Badge>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="glass-button">Same Value</Badge>
        <Badge variant="outline" className="glass-button">Quick Swap</Badge>
        <Badge variant="outline" className="glass-button">Verified</Badge>
        <Badge variant="outline" className="glass-button">Premium</Badge>
      </div>
    </div>
  );
};

export default SwapFilters;