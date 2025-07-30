import React from 'react';
import { Search, Building, Home, TrendingUp, Users } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PropertyUsageFilter } from './UnifiedPropertyGrid';

interface PropertyFiltersProps {
  usageFilter: PropertyUsageFilter;
  setUsageFilter: (filter: PropertyUsageFilter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const PropertyFilters = ({
  usageFilter,
  setUsageFilter,
  searchQuery,
  setSearchQuery
}: PropertyFiltersProps) => {
  
  const filters = [
    { 
      value: 'all' as PropertyUsageFilter, 
      label: 'Tutte', 
      icon: Building,
      description: 'Vedi tutte le proprietà' 
    },
    { 
      value: 'investment' as PropertyUsageFilter, 
      label: 'Investimento', 
      icon: TrendingUp,
      description: 'Opportunità di investimento' 
    },
    { 
      value: 'short_term' as PropertyUsageFilter, 
      label: 'Soggiorno Breve', 
      icon: Users,
      description: 'Prenotazioni turistiche' 
    },
    { 
      value: 'long_term' as PropertyUsageFilter, 
      label: 'Affitto Studenti', 
      icon: Home,
      description: 'Affitti a lungo termine' 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
        <Input
          placeholder="Cerca per nome o località..."
          className="pl-10 h-12 glass-input bg-white/5 border-white/10 text-white placeholder:text-white/40"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Usage Type Filters */}
      <div className="flex flex-wrap gap-3 justify-center">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = usageFilter === filter.value;
          
          return (
            <Badge
              key={filter.value}
              variant={isActive ? "default" : "outline"}
              className={`px-6 py-3 rounded-full cursor-pointer transition-all duration-300 flex items-center gap-2 text-sm font-medium ${
                isActive 
                  ? 'bg-primary text-black shadow-lg' 
                  : 'bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
              onClick={() => setUsageFilter(filter.value)}
            >
              <Icon className="h-4 w-4" />
              <span>{filter.label}</span>
            </Badge>
          );
        })}
      </div>

      {/* Filter Description */}
      <div className="text-center">
        <p className="text-white/60 text-sm">
          {filters.find(f => f.value === usageFilter)?.description}
        </p>
      </div>
    </div>
  );
};

export default PropertyFilters;