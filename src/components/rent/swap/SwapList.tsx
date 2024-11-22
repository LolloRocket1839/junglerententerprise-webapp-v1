import React from 'react';
import SwapCard from './SwapCard';
import { SwapCategory } from './SwapFilters';

interface SwapListProps {
  swaps: any[];
  selectedCategory: SwapCategory;
}

const SwapList: React.FC<SwapListProps> = ({ swaps, selectedCategory }) => {
  const filteredSwaps = swaps.filter(swap => swap.category === selectedCategory);

  return (
    <div className="space-y-6">
      {filteredSwaps.map((swap) => (
        <SwapCard key={swap.id} {...swap} />
      ))}
    </div>
  );
};

export default SwapList;