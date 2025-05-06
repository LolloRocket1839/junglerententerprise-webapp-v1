import React, { memo, useCallback, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { StayFilters as StayFiltersType } from '../../stores/stayStore';
import { measurePerformance } from '../../utils/performance';

interface StayFiltersProps {
  filters: StayFiltersType;
  onFiltersChange: (filters: StayFiltersType) => void;
  onSearch: () => void;
}

const StayFilters: React.FC<StayFiltersProps> = memo(({
  filters,
  onFiltersChange,
  onSearch,
}) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLocationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    measurePerformance('locationChange', () => {
      onFiltersChange({ ...filters, location: e.target.value });
    });
  }, [filters, onFiltersChange]);

  const handleDateChange = useCallback((ranges: any) => {
    measurePerformance('dateChange', () => {
      onFiltersChange({
        ...filters,
        checkIn: ranges.selection.startDate,
        checkOut: ranges.selection.endDate,
      });
    });
  }, [filters, onFiltersChange]);

  const handleGuestsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    measurePerformance('guestsChange', () => {
      const guests = parseInt(e.target.value, 10);
      if (!isNaN(guests) && guests > 0) {
        onFiltersChange({ ...filters, guests });
      }
    });
  }, [filters, onFiltersChange]);

  const handlePriceRangeChange = useCallback((min: number, max: number) => {
    measurePerformance('priceRangeChange', () => {
      onFiltersChange({ ...filters, priceRange: [min, max] });
    });
  }, [filters, onFiltersChange]);

  const handleCategoryChange = useCallback((category: string) => {
    measurePerformance('categoryChange', () => {
      onFiltersChange({ ...filters, category });
    });
  }, [filters, onFiltersChange]);

  const handleAmenitiesChange = useCallback((amenity: string) => {
    measurePerformance('amenitiesChange', () => {
      const currentAmenities = filters.amenities || [];
      const newAmenities = currentAmenities.includes(amenity)
        ? currentAmenities.filter(a => a !== amenity)
        : [...currentAmenities, amenity];
      onFiltersChange({ ...filters, amenities: newAmenities });
    });
  }, [filters, onFiltersChange]);

  const handleRatingChange = useCallback((rating: number) => {
    measurePerformance('ratingChange', () => {
      onFiltersChange({ ...filters, rating });
    });
  }, [filters, onFiltersChange]);

  const handleClearFilters = useCallback(() => {
    measurePerformance('clearFilters', () => {
      onFiltersChange({});
    });
  }, [onFiltersChange]);

  const handleSearch = useCallback(() => {
    measurePerformance('search', () => {
      onSearch();
    });
  }, [onSearch]);

  const categories = useMemo(() => [
    'beach',
    'mountain',
    'city',
    'countryside',
  ], []);

  const amenities = useMemo(() => [
    'wifi',
    'kitchen',
    'studyArea',
    'privateBathroom',
    'airConditioning',
    'tv',
    'parking',
    'breakfast',
  ], []);

  const ratings = useMemo(() => [1, 2, 3, 4, 5], []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-4"
    >
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <input
            type="text"
            value={filters.location || ''}
            onChange={handleLocationChange}
            placeholder={t('stay.searchLocation')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          {isExpanded ? t('stay.hideFilters') : t('stay.showFilters')}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 space-y-4"
          >
            {/* Date Range Picker */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">{t('stay.dates')}</h3>
              <DateRangePicker
                ranges={[
                  {
                    startDate: filters.checkIn || new Date(),
                    endDate: filters.checkOut || addDays(new Date(), 1),
                    key: 'selection',
                  },
                ]}
                onChange={handleDateChange}
                months={1}
                direction="horizontal"
                minDate={new Date()}
                rangeColors={['#3B82F6']}
              />
            </div>

            {/* Guests */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">{t('stay.guests')}</h3>
              <input
                type="number"
                min="1"
                value={filters.guests || ''}
                onChange={handleGuestsChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Price Range */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">{t('stay.priceRange')}</h3>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  min="0"
                  value={filters.priceRange?.[0] || ''}
                  onChange={(e) => handlePriceRangeChange(
                    parseInt(e.target.value, 10),
                    filters.priceRange?.[1] || 1000
                  )}
                  placeholder={t('stay.minPrice')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <span>-</span>
                <input
                  type="number"
                  min="0"
                  value={filters.priceRange?.[1] || ''}
                  onChange={(e) => handlePriceRangeChange(
                    filters.priceRange?.[0] || 0,
                    parseInt(e.target.value, 10)
                  )}
                  placeholder={t('stay.maxPrice')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">{t('stay.categories')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filters.category === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t(`stay.categories.${category}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">{t('stay.amenities')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {amenities.map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.amenities?.includes(amenity) || false}
                      onChange={() => handleAmenitiesChange(amenity)}
                      className="rounded text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">
                      {t(`stay.amenities.${amenity}`)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">{t('stay.rating')}</h3>
              <div className="flex items-center space-x-2">
                {ratings.map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRatingChange(rating)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filters.rating === rating
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {rating}+
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t pt-4 flex justify-between">
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                {t('stay.clearFilters')}
              </button>
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                {t('stay.search')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

StayFilters.displayName = 'StayFilters';

export default StayFilters; 