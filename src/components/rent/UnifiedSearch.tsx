import React, { useState } from 'react';
import { SearchForm } from './components/SearchForm';
import RoommateFinder from './roommate/RoommateFinder';
import { SearchParams } from './types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Users, Zap, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { toast } from '@/components/ui/use-toast';
import { SmartRecommendations } from '@/components/smart/SmartRecommendations';
import { useLanguage } from '@/contexts/LanguageContext';

interface UnifiedSearchProps {
  initialTab?: 'property' | 'roommate';
  searchQuery?: string;
}

type SearchMode = 'property' | 'roommate' | 'smart';

export const UnifiedSearch = ({ initialTab = 'property', searchQuery = '' }: UnifiedSearchProps) => {
  const { t } = useLanguage();
  const [searchMode, setSearchMode] = useState<SearchMode>(initialTab);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    city: '',
    university: '',
    roomType: '',
    minPrice: '',
    maxPrice: '',
    moveInDate: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Smart recommendation logic
  const shouldRecommendRoommate = (params: SearchParams) => {
    return params.roomType === '' || params.roomType === '2' || params.roomType === '3' || params.roomType === '4';
  };

  const handleSearch = () => {
    if (!searchParams.city || !searchParams.university) {
      toast({
        title: "Inserisci i dati richiesti",
        description: "Per favore seleziona una città e un'università per continuare la ricerca.",
        variant: "destructive",
      });
      return;
    }

    // Smart suggestion for roommate
    if (searchMode === 'property' && shouldRecommendRoommate(searchParams)) {
      toast({
        title: "💡 Suggerimento intelligente",
        description: "Stai cercando una casa condivisa? Potresti trovare prima un coinquilino!",
        action: (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setSearchMode('smart')}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Trova Coinquilino
          </Button>
        )
      });
    }

    toast({
      title: "Ricerca in corso",
      description: "Stiamo cercando le migliori opzioni per te...",
    });
    
    console.log("Searching with params:", searchParams, "mode:", searchMode);
  };

  const renderModeSelector = () => (
    <div className="flex flex-wrap gap-3 mb-6">
      <Button
        variant={searchMode === 'property' ? 'default' : 'outline'}
        onClick={() => setSearchMode('property')}
        className={`flex items-center gap-2 transition-all duration-300 ${
          searchMode === 'property' 
            ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white' 
            : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
        }`}
      >
        <Home className="w-4 h-4" />
        Cerca Casa
        {searchMode === 'property' && <Badge className="bg-white/20 text-white ml-2">Attivo</Badge>}
      </Button>

      <Button
        variant={searchMode === 'roommate' ? 'default' : 'outline'}
        onClick={() => setSearchMode('roommate')}
        className={`flex items-center gap-2 transition-all duration-300 ${
          searchMode === 'roommate' 
            ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white' 
            : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
        }`}
      >
        <Users className="w-4 h-4" />
        Trova Coinquilino
        {searchMode === 'roommate' && <Badge className="bg-white/20 text-white ml-2">Attivo</Badge>}
      </Button>

      <Button
        variant={searchMode === 'smart' ? 'default' : 'outline'}
        onClick={() => setSearchMode('smart')}
        className={`flex items-center gap-2 transition-all duration-300 ${
          searchMode === 'smart' 
            ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white' 
            : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
        }`}
      >
        <Zap className="w-4 h-4" />
        Smart Match
        {searchMode === 'smart' && <Badge className="bg-white/20 text-white ml-2">AI</Badge>}
      </Button>
    </div>
  );

  const renderSmartMode = () => (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="text-center space-y-4">
          <Zap className="w-16 h-16 text-yellow-400 mx-auto animate-pulse-gentle" />
          <h3 className="text-2xl font-bold text-white">Smart Match AI</h3>
          <p className="text-white/70">
            Lascia che la nostra AI trovi la combinazione perfetta di casa e coinquilino per te
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <GlassCard className="p-4 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <Home className="w-8 h-8 text-emerald-400" />
                <div className="text-left">
                  <h4 className="font-semibold text-white">Prima la Casa</h4>
                  <p className="text-sm text-white/60">Trova casa, poi coinquilino</p>
                </div>
                <ArrowRight className="w-4 h-4 text-white/40" />
              </div>
            </GlassCard>

            <GlassCard className="p-4 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-purple-400" />
                <div className="text-left">
                  <h4 className="font-semibold text-white">Prima il Coinquilino</h4>
                  <p className="text-sm text-white/60">Trova coinquilino, poi casa insieme</p>
                </div>
                <ArrowRight className="w-4 h-4 text-white/40" />
              </div>
            </GlassCard>
          </div>
        </div>
      </GlassCard>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderModeSelector()}

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {searchMode === 'property' && (
            <SearchForm 
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              handleSearch={handleSearch}
            />
          )}

          {searchMode === 'roommate' && (
            <RoommateFinder />
          )}

          {searchMode === 'smart' && renderSmartMode()}
        </div>

        <div className="lg:col-span-1">
          <SmartRecommendations 
            searchContext={searchParams}
            userPreferences={{}}
          />
        </div>
      </div>
    </div>
  );
};