import React from 'react';
import MarketplaceHeader from './MarketplaceHeader';
import MarketplaceItem from './MarketplaceItem';
import { marketplaceItems } from './mockData';

const MarketplaceGrid = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <MarketplaceHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {marketplaceItems.map((item) => (
          <MarketplaceItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MarketplaceGrid;