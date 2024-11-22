import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type SwapCategory = 'room' | 'services' | 'clothes' | 'electronics' | 'books' | 'collectibles' | 'various';

interface SwapFiltersProps {
  selectedCategory: SwapCategory;
  onCategoryChange: (category: SwapCategory) => void;
}

const SwapFilters = ({ selectedCategory, onCategoryChange }: SwapFiltersProps) => {
  return (
    <div className="mb-6">
      <Select
        value={selectedCategory}
        onValueChange={(value) => onCategoryChange(value as SwapCategory)}
      >
        <SelectTrigger className="w-[200px] glass-input hover:bg-white/20 active:bg-white/30 focus:bg-white/25">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent className="bg-white/90 backdrop-blur-xl border border-white/20">
          <SelectItem value="room" className="hover:bg-primary/20 focus:bg-primary/30">Rooms</SelectItem>
          <SelectItem value="services" className="hover:bg-primary/20 focus:bg-primary/30">Services</SelectItem>
          <SelectItem value="clothes" className="hover:bg-primary/20 focus:bg-primary/30">Clothes</SelectItem>
          <SelectItem value="electronics" className="hover:bg-primary/20 focus:bg-primary/30">Electronics</SelectItem>
          <SelectItem value="books" className="hover:bg-primary/20 focus:bg-primary/30">Books</SelectItem>
          <SelectItem value="collectibles" className="hover:bg-primary/20 focus:bg-primary/30">Collectibles</SelectItem>
          <SelectItem value="various" className="hover:bg-primary/20 focus:bg-primary/30">Various Items</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SwapFilters;