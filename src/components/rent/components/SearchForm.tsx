
import React from 'react';
import { SearchParams } from '../types';
import { SearchHero } from './SearchHero';
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
    <main className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-[#1a472a] to-[#2d5a3f]">
      <SearchHero />
      
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
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
