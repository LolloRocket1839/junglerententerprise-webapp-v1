
import React from 'react';
import { Button } from "@/components/ui/button";
import { Filter, Search } from 'lucide-react';
import { SearchParams } from '../types';
import { CitySelect } from './search/CitySelect';
import { UniversitySelect } from './search/UniversitySelect';
import { RoommateSelect } from './search/RoommateSelect';
import { AdvancedFilters } from './search/AdvancedFilters';

interface SearchBarProps {
  searchParams: SearchParams;
  setSearchParams: (params: SearchParams) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  handleSearch: () => void;
}

export const SearchBar = ({
  searchParams,
  setSearchParams,
  showFilters,
  setShowFilters,
  handleSearch
}: SearchBarProps) => {
  return (
    <section className="w-full max-w-5xl mx-auto px-4" role="search">
      <div className="glass-card p-6 md:p-8 backdrop-blur-xl border border-white/10 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          <CitySelect 
            value={searchParams.city}
            onChange={(value) => setSearchParams({...searchParams, city: value})}
          />

          <UniversitySelect 
            value={searchParams.university}
            onChange={(value) => setSearchParams({...searchParams, university: value})}
            selectedCity={searchParams.city}
          />

          <RoommateSelect 
            value={searchParams.roommateCount || ''}
            onChange={(value) => setSearchParams({...searchParams, roommateCount: value})}
          />

          <div className="md:col-span-2">
            <label className="text-white/80 mb-2 block text-sm font-medium opacity-0 select-none">
              Cerca
            </label>
            <Button 
              onClick={handleSearch}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-lg transition-all duration-300 hover:shadow-xl"
              aria-label="Cerca alloggi disponibili"
            >
              <Search className="mr-2 h-4 w-4" /> 
              <span className="md:hidden lg:inline">Cerca Alloggi</span>
              <span className="hidden md:inline lg:hidden">Cerca</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6">
          <Button 
            variant="outline" 
            className="bg-white/10 text-white hover:bg-white/20 border-white/20 transition-all duration-300"
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            aria-controls="advanced-filters"
          >
            <Filter className="w-4 h-4 mr-2" /> 
            Filtri avanzati
          </Button>
          {showFilters && (
            <span className="text-white/60 text-sm">
              Filtri attivi
            </span>
          )}
        </div>

        {showFilters && (
          <AdvancedFilters 
            searchParams={searchParams}
            onParamsChange={setSearchParams}
          />
        )}
      </div>
    </section>
  );
};
