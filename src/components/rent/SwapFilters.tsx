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
        <SelectTrigger className="w-[200px] glass-input">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="room">Rooms</SelectItem>
          <SelectItem value="services">Services</SelectItem>
          <SelectItem value="clothes">Clothes</SelectItem>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="books">Books</SelectItem>
          <SelectItem value="collectibles">Collectibles</SelectItem>
          <SelectItem value="various">Various Items</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SwapFilters;