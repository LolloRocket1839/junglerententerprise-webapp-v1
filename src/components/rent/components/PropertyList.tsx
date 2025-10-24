import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from 'lucide-react';
import { PropertyCard } from './PropertyCard';
import { UnifiedProperty } from '@/hooks/useUnifiedProperties';

interface PropertyListProps {
  properties: UnifiedProperty[];
  selectedCity: string;
  favorites: string[];
  onFavoriteToggle: (id: string) => void;
  onPropertySelect: (property: UnifiedProperty) => void;
  onBackToSearch: () => void;
  isLoading?: boolean;
}

export const PropertyList = ({
  properties,
  selectedCity,
  favorites,
  onFavoriteToggle,
  onPropertySelect,
  onBackToSearch,
  isLoading = false
}: PropertyListProps) => {
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-white/60" />
          <span className="ml-3 text-white/60">Caricamento proprietà...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {properties.length} alloggi trovati a {selectedCity}
        </h2>
        <Button 
          variant="outline" 
          className="bg-white/10 text-white hover:bg-white/20 border-white/20"
          onClick={onBackToSearch}
        >
          Modifica ricerca
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {properties.map(property => (
          <PropertyCard 
            key={property.id} 
            property={property} 
            isFavorite={favorites.includes(property.id)} 
            onFavoriteToggle={onFavoriteToggle} 
            onSelect={onPropertySelect} 
          />
        ))}
        
        {properties.length === 0 && (
          <div className="col-span-full glass-card p-8 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-white/50 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Nessun alloggio trovato</h3>
            <p className="text-white/60 mb-4">
              Nessun alloggio corrisponde ai criteri di ricerca selezionati.
              Prova a modificare i filtri o a cercare in un'altra città.
            </p>
            <Button onClick={onBackToSearch}>
              Modifica ricerca
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
