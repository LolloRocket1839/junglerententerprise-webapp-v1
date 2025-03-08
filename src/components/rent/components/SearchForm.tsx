
import React from 'react';
import { SearchParams } from '../types';
import { SearchHero } from './SearchHero';
import { SearchBar } from './SearchBar';
import { ValuePropositions } from './ValuePropositions';

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
      <SearchHero />
      <SearchBar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        handleSearch={handleSearch}
      />
      <ValuePropositions />
    </div>
  );
};
