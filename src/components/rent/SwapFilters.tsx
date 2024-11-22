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
        <SelectContent className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl rounded-xl">
          <SelectItem value="room" className="text-gray-100 font-medium hover:bg-white/20 focus:bg-white/30 hover:text-white">Rooms</SelectItem>
          <SelectItem value="services" className="text-gray-100 font-medium hover:bg-white/20 focus:bg-white/30 hover:text-white">Services</SelectItem>
          <SelectItem value="clothes" className="text-gray-100 font-medium hover:bg-white/20 focus:bg-white/30 hover:text-white">Clothes</SelectItem>
          <SelectItem value="electronics" className="text-gray-100 font-medium hover:bg-white/20 focus:bg-white/30 hover:text-white">Electronics</SelectItem>
          <SelectItem value="books" className="text-gray-100 font-medium hover:bg-white/20 focus:bg-white/30 hover:text-white">Books</SelectItem>
          <SelectItem value="collectibles" className="text-gray-100 font-medium hover:bg-white/20 focus:bg-white/30 hover:text-white">Collectibles</SelectItem>
          <SelectItem value="various" className="text-gray-100 font-medium hover:bg-white/20 focus:bg-white/30 hover:text-white">Various Items</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SwapFilters;