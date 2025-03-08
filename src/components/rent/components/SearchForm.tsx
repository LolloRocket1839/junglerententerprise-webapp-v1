import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search, MapPin, School, Euro, CheckCircle, Leaf } from 'lucide-react';
import { cities, universities } from '../data/mockData';
import { SearchParams } from '../types';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface SearchFormProps {
  searchParams: SearchParams;
  setSearchParams: (params: SearchParams) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  handleSearch: () => void;
}

export const SearchForm = ({
  searchParams,
  setSearchParams,
  showFilters,
  setShowFilters,
  handleSearch
}: SearchFormProps) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex min-h-[40vh] items-center justify-center flex-col py-12 md:py-20">
        <div className="text-center space-y-6 max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-fade-in">
            Trova la tua
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent block mt-2">
              casa ideale
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-100">
            Risparmia fino al 20% con affitti a lungo termine, verificati per garantire qualità e sicurezza
          </p>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8 backdrop-blur-md">
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
                className="bg-white/10 border-white/20 text-white h-12"
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
                className="bg-white/10 border-white/20 text-white h-12"
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

          <div className="md:col-span-2">
            <label className="text-white/80 mb-2 block text-sm font-medium opacity-0">
              Cerca
            </label>
            <Button 
              onClick={handleSearch}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
              aria-label="Cerca alloggi disponibili"
            >
              <Search className="mr-2 h-4 w-4" /> 
              <span className="md:hidden">Cerca Alloggi</span>
              <span className="hidden md:inline">Cerca</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6">
          <Button 
            variant="outline" 
            className="bg-white/10 text-white hover:bg-white/20 border-white/20"
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
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 animate-fade-in py-4 px-1 border-y border-white/10"
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <div className="glass-card p-6 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Euro className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Risparmio</h3>
              <p className="text-white/60 text-sm">Fino al 20% sul mercato</p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 bg-[#1a1a1a] border-white/20 text-white">
            <div className="space-y-2">
              <h4 className="font-semibold">Risparmia con Jungle</h4>
              <p className="text-sm text-white/80">
                Offriamo prezzi competitivi attraverso contratti a lungo termine e partnership dirette con i proprietari.
                Nessuna commissione nascosta.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>

        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <div className="glass-card p-6 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Verificati</h3>
              <p className="text-white/60 text-sm">Alloggi certificati</p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 bg-[#1a1a1a] border-white/20 text-white">
            <div className="space-y-2">
              <h4 className="font-semibold">Qualità Garantita</h4>
              <p className="text-sm text-white/80">
                Ogni alloggio viene ispezionato e verificato dal nostro team. Garantiamo standard di qualità e sicurezza elevati.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>

        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <div className="glass-card p-6 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <School className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Per Studenti</h3>
              <p className="text-white/60 text-sm">Vicino alle università</p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 bg-[#1a1a1a] border-white/20 text-white">
            <div className="space-y-2">
              <h4 className="font-semibold">Pensato per Studenti</h4>
              <p className="text-sm text-white/80">
                Alloggi selezionati in base alla vicinanza alle università e ai servizi essenziali per la vita studentesca.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>

        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <div className="glass-card p-6 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Sostenibile</h3>
              <p className="text-white/60 text-sm">Edilizia eco-friendly</p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 bg-[#1a1a1a] border-white/20 text-white">
            <div className="space-y-2">
              <h4 className="font-semibold">Impatto Ambientale</h4>
              <p className="text-sm text-white/80">
                Promuoviamo alloggi con certificazioni energetiche elevate e pratiche sostenibili per ridurre l'impatto ambientale.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
};
