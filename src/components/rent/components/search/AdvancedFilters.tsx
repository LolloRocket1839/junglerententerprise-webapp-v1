
import React, { useState } from 'react';
import { PriceInput } from "@/components/ui/price-input";
import { SearchParams } from '../../types';

interface AdvancedFiltersProps {
  searchParams: SearchParams;
  onParamsChange: (params: SearchParams) => void;
}

export const AdvancedFilters = ({ searchParams, onParamsChange }: AdvancedFiltersProps) => {
  const [errors, setErrors] = useState<{
    minPrice?: string;
    maxPrice?: string;
  }>({});

  const validatePrices = (min: string, max: string) => {
    const minNum = Number(min);
    const maxNum = Number(max);
    
    if (minNum && maxNum && minNum > maxNum) {
      return {
        minPrice: "Il prezzo minimo non può essere maggiore del massimo",
        maxPrice: "Il prezzo massimo non può essere minore del minimo"
      };
    }
    return {};
  };

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: string) => {
    const newParams = { ...searchParams, [field]: value };
    const newErrors = validatePrices(
      field === 'minPrice' ? value : searchParams.minPrice,
      field === 'maxPrice' ? value : searchParams.maxPrice
    );
    
    setErrors(newErrors);
    onParamsChange(newParams);
  };

  return (
    <div 
      id="advanced-filters"
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 animate-fade-in py-4 px-1 border-t border-white/10"
    >
      <div>
        <label htmlFor="min-price" className="text-white/80 mb-2 block text-sm font-medium">
          Prezzo Minimo
        </label>
        <PriceInput
          id="min-price"
          placeholder="Inserisci prezzo minimo"
          value={searchParams.minPrice}
          onChange={(e) => handlePriceChange('minPrice', e.target.value)}
          error={errors.minPrice}
          aria-label="Prezzo minimo in euro"
        />
      </div>

      <div>
        <label htmlFor="max-price" className="text-white/80 mb-2 block text-sm font-medium">
          Prezzo Massimo
        </label>
        <PriceInput
          id="max-price"
          placeholder="Inserisci prezzo massimo"
          value={searchParams.maxPrice}
          onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
          error={errors.maxPrice}
          aria-label="Prezzo massimo in euro"
        />
      </div>
    </div>
  );
};
