
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
    <div className="min-h-screen space-y-12 md:space-y-16">
      <div className="container mx-auto px-4">
        <SearchHero />
        <SearchBar
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          handleSearch={handleSearch}
        />
        <ValuePropositions />
        <StreetMockups />
      </div>
    </div>
  );
};
