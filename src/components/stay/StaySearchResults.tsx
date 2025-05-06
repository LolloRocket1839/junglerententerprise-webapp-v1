import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Stay } from '../../stores/stayStore';
import useStayStore from '../../stores/stayStore';
import { measurePerformance } from '../../utils/performance';
import StayCard from './StayCard';

interface StaySearchResultsProps {
  filters: any;
}

const StaySearchResults: React.FC<StaySearchResultsProps> = memo(({ filters }) => {
  const { t } = useTranslation();
  const { stays, loading, error, fetchStays } = useStayStore();

  useEffect(() => {
    measurePerformance('fetchSearchResults', () => {
      fetchStays(filters);
    });
  }, [filters, fetchStays]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {error}
        </h2>
        <p className="text-gray-600 mb-4">
          {t('stay.errorLoadingResults')}
        </p>
        <button
          onClick={() => fetchStays(filters)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          {t('stay.tryAgain')}
        </button>
      </div>
    );
  }

  if (stays.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {t('stay.noResults')}
        </h2>
        <p className="text-gray-600">
          {t('stay.tryDifferentFilters')}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          {t('stay.searchResults', { count: stays.length })}
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">{t('stay.sortBy')}</span>
          <select
            className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            onChange={(e) => {
              measurePerformance('sortResults', () => {
                const sortedStays = [...stays].sort((a, b) => {
                  switch (e.target.value) {
                    case 'price_asc':
                      return a.price_per_night - b.price_per_night;
                    case 'price_desc':
                      return b.price_per_night - a.price_per_night;
                    case 'rating':
                      return b.rating - a.rating;
                    default:
                      return 0;
                  }
                });
                useStayStore.getState().setStays(sortedStays);
              });
            }}
          >
            <option value="recommended">{t('stay.recommended')}</option>
            <option value="price_asc">{t('stay.priceLowToHigh')}</option>
            <option value="price_desc">{t('stay.priceHighToLow')}</option>
            <option value="rating">{t('stay.topRated')}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {stays.map((stay) => (
            <motion.div
              key={stay.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StayCard
                stay={stay}
                onHover={(hoveredStay) => {
                  measurePerformance('stayCardHover', () => {
                    // Handle hover effects or analytics
                    console.log('Hovered stay:', hoveredStay.title);
                  });
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {stays.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={() => {
              measurePerformance('loadMore', () => {
                // Implement load more functionality
                console.log('Load more stays');
              });
            }}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            {t('stay.loadMore')}
          </button>
        </div>
      )}
    </motion.div>
  );
});

StaySearchResults.displayName = 'StaySearchResults';

export default StaySearchResults; 