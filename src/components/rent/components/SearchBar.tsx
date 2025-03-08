import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search, MapPin, School, Users } from 'lucide-react';
import { cities, universities } from '../data/mockData';
import { SearchParams } from '../types';

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
          <div className="md:col-span-5">
            <label htmlFor="city-select" className="text-white/80 mb-2 block text-sm font-medium">
              Città
            </label>
            <Select
              value={searchParams.city}
              onValueChange={(value) => setSearchParams({...searchParams, city: value})}
              aria-label="Seleziona la città"
            >
              <SelectTrigger 
                id="city-select"
                className="bg-white/10 border-white/20 text-white h-12 transition-colors hover:bg-white/20 focus:ring-2 focus:ring-primary/50"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 opacity-70" />
                  <SelectValue placeholder="Seleziona una città" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-white/20 max-h-[300px]">
                {cities.map((city) => (
                  <SelectItem 
                    key={city} 
                    value={city} 
                    className="text-white hover:bg-white/10"
                  >
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-5">
            <label htmlFor="university-select" className="text-white/80 mb-2 block text-sm font-medium">
              Università
            </label>
            <Select
              value={searchParams.university}
              onValueChange={(value) => setSearchParams({...searchParams, university: value})}
              disabled={!searchParams.city}
              aria-label="Seleziona l'università"
            >
              <SelectTrigger 
                id="university-select"
                className="bg-white/10 border-white/20 text-white h-12 transition-colors hover:bg-white/20 focus:ring-2 focus:ring-primary/50"
              >
                <div className="flex items-center gap-2">
                  <School className="w-4 h-4 opacity-70" />
                  <SelectValue placeholder="Seleziona l'università" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-white/20 max-h-[300px]">
                {searchParams.city && universities[searchParams.city]?.map((university) => (
                  <SelectItem 
                    key={university} 
                    value={university} 
                    className="text-white hover:bg-white/10"
                  >
                    {university}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-5">
            <label htmlFor="roommate-select" className="text-white/80 mb-2 block text-sm font-medium">
              Coinquilini
            </label>
            <Select
              value={searchParams.roommateCount || ''}
              onValueChange={(value) => setSearchParams({...searchParams, roommateCount: value})}
              aria-label="Seleziona numero di coinquilini"
            >
              <SelectTrigger 
                id="roommate-select"
                className="bg-white/10 border-white/20 text-white h-12 transition-colors hover:bg-white/20 focus:ring-2 focus:ring-primary/50"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 opacity-70" />
                  <SelectValue placeholder="Numero di coinquilini" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-white/20 max-h-[300px]">
                <SelectItem value="solo" className="text-white hover:bg-white/10">
                  Da solo
                </SelectItem>
                <SelectItem value="2" className="text-white hover:bg-white/10">
                  Due coinquilini
                </SelectItem>
                <SelectItem value="3" className="text-white hover:bg-white/10">
                  Tre coinquilini
                </SelectItem>
                <SelectItem value="4" className="text-white hover:bg-white/10">
                  Quattro coinquilini
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

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
          <div 
            id="advanced-filters"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 animate-fade-in py-4 px-1 border-t border-white/10"
          >
            <div>
              <label className="text-white/80 mb-2 block">Tipologia</label>
              <Select
                value={searchParams.roomType}
                onValueChange={(value) => setSearchParams({...searchParams, roomType: value})}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Tipo di alloggio" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/20">
                  <SelectItem value="studio" className="text-white hover:bg-white/10">
                    Monolocale
                  </SelectItem>
                  <SelectItem value="apartment" className="text-white hover:bg-white/10">
                    Appartamento
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-white/80 mb-2 block">Prezzo Min (€)</label>
              <Input
                type="number"
                placeholder="0"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                value={searchParams.minPrice}
                onChange={(e) => setSearchParams({...searchParams, minPrice: e.target.value})}
              />
            </div>

            <div>
              <label className="text-white/80 mb-2 block">Prezzo Max (€)</label>
              <Input
                type="number"
                placeholder="2000"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                value={searchParams.maxPrice}
                onChange={(e) => setSearchParams({...searchParams, maxPrice: e.target.value})}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
