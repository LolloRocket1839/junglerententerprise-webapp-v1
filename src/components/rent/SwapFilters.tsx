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
          <Badge 
            variant="secondary" 
            className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 px-4 py-1.5 text-sm font-medium rounded-full"
          >
            Popular
          </Badge>
          <Badge 
            variant="secondary" 
            className="bg-success/20 text-success border border-success/30 hover:bg-success/30 px-4 py-1.5 text-sm font-medium rounded-full"
          >
            New
          </Badge>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge 
          variant="outline" 
          className="bg-primary/20 hover:bg-primary/30 text-white px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200"
        >
          The entire Milky Way
        </Badge>
        <Badge 
          variant="outline" 
          className="bg-primary/20 hover:bg-primary/30 text-white px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200"
        >
          Choose The entire Milky Way
        </Badge>
        <Badge 
          variant="outline" 
          className="bg-primary/20 hover:bg-primary/30 text-white px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 max-w-lg truncate"
        >
          That feeling when you find your keys immediately after panicking about losing them
        </Badge>
      </div>
    </div>
  );
};

export default SwapFilters;