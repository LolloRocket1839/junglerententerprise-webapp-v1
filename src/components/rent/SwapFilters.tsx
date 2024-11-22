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
        <SelectContent className="bg-white/95 backdrop-blur-xl border border-white/20">
          <SelectItem value="room" className="text-gray-800 font-medium hover:bg-primary/20 focus:bg-primary/30 hover:text-black">Rooms</SelectItem>
          <SelectItem value="services" className="text-gray-800 font-medium hover:bg-primary/20 focus:bg-primary/30 hover:text-black">Services</SelectItem>
          <SelectItem value="clothes" className="text-gray-800 font-medium hover:bg-primary/20 focus:bg-primary/30 hover:text-black">Clothes</SelectItem>
          <SelectItem value="electronics" className="text-gray-800 font-medium hover:bg-primary/20 focus:bg-primary/30 hover:text-black">Electronics</SelectItem>
          <SelectItem value="books" className="text-gray-800 font-medium hover:bg-primary/20 focus:bg-primary/30 hover:text-black">Books</SelectItem>
          <SelectItem value="collectibles" className="text-gray-800 font-medium hover:bg-primary/20 focus:bg-primary/30 hover:text-black">Collectibles</SelectItem>
          <SelectItem value="various" className="text-gray-800 font-medium hover:bg-primary/20 focus:bg-primary/30 hover:text-black">Various Items</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SwapFilters;