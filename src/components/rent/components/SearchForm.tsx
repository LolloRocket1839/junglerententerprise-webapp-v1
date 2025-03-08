import React from 'react';
import { SearchParams } from '../types';
import { SearchBar } from './SearchBar';
import { ValuePropositions } from './ValuePropositions';
import { StreetMockups } from './StreetMockups';

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
    <main className="flex flex-col items-center w-full min-h-screen">
      {/* Hero Section */}
      <div className="w-full flex items-center justify-center min-h-[400px] bg-gradient-to-b from-[#1a472a] to-[#2d5a3f] p-8">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-r from-white/90 via-white to-white/70 bg-clip-text">
            Affitta
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-md mx-auto leading-relaxed">
            Trova la tua stanza ideale e risparmia con affitti a lungo termine.
          </p>
          <button 
            onClick={handleSearch}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-2 rounded-md transition-colors duration-300"
          >
            Scopri di più
          </button>
        </div>
      </div>
      
      {/* Contenuto Sottostante */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="glass rounded-xl p-6 shadow-lg backdrop-blur-sm">
          <SearchBar
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            handleSearch={handleSearch}
          />
        </div>
        
        <ValuePropositions />
        <StreetMockups />
      </div>
    </main>
  );
};
