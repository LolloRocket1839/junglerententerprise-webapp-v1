import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DollarSign, Calendar, Filter } from "lucide-react";

export type FilterOptions = {
  budget: string;
  moveInDate: string;
  preference: string;
};

interface RoommateFiltersProps {
  filters: FilterOptions;
  onFilterChange: (key: keyof FilterOptions, value: string) => void;
  onApplyFilters: () => void;
}

const RoommateFilters = ({ filters, onFilterChange, onApplyFilters }: RoommateFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Select
        value={filters.budget}
        onValueChange={(value) => onFilterChange('budget', value)}
      >
        <SelectTrigger className="w-[200px] glass-input">
          <DollarSign className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Select budget range" />
        </SelectTrigger>
        <SelectContent className="bg-white/10 backdrop-blur-2xl border border-white/20">
          <SelectItem value="all" className="text-white/90">All Budgets</SelectItem>
          <SelectItem value="0-500" className="text-white/90">€0 - €500</SelectItem>
          <SelectItem value="501-800" className="text-white/90">€501 - €800</SelectItem>
          <SelectItem value="801+" className="text-white/90">€801+</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.moveInDate}
        onValueChange={(value) => onFilterChange('moveInDate', value)}
      >
        <SelectTrigger className="w-[200px] glass-input">
          <Calendar className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Select move-in date" />
        </SelectTrigger>
        <SelectContent className="bg-white/10 backdrop-blur-2xl border border-white/20">
          <SelectItem value="all" className="text-white/90">Any Move-in Date</SelectItem>
          <SelectItem value="1month" className="text-white/90">Within 1 Month</SelectItem>
          <SelectItem value="3months" className="text-white/90">Within 3 Months</SelectItem>
          <SelectItem value="6months" className="text-white/90">Within 6 Months</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.preference}
        onValueChange={(value) => onFilterChange('preference', value)}
      >
        <SelectTrigger className="w-[200px] glass-input">
          <Filter className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Select preference" />
        </SelectTrigger>
        <SelectContent className="bg-white/10 backdrop-blur-2xl border border-white/20">
          <SelectItem value="all" className="text-white/90">All Preferences</SelectItem>
          <SelectItem value="non-smoking" className="text-white/90">Non-Smoking</SelectItem>
          <SelectItem value="pet-friendly" className="text-white/90">Pet Friendly</SelectItem>
          <SelectItem value="quiet" className="text-white/90">Quiet Living</SelectItem>
        </SelectContent>
      </Select>

      <Button 
        onClick={onApplyFilters}
        className="bg-primary hover:bg-primary-dark transition-colors"
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default RoommateFilters;