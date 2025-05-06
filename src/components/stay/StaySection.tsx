import React, { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { DateRangePicker } from 'react-date-range';
import { useNavigate } from 'react-router-dom';
import { withPerformanceTracking, optimizeApiCall } from '../../utils/performance';
import { supabase } from '../../lib/supabase/client';
import { 
  Search, 
  Calendar,
  Users,
  MapPin,
  Star,
  Wifi,
  Coffee,
  Book,
  ArrowRight,
  Shield
} from 'lucide-react';

interface StaySectionProps {
  onSearch: (filters: SearchFilters) => void;
}

interface SearchFilters {
  location: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  priceRange: [number, number];
}

const StaySection: React.FC<StaySectionProps> = ({ onSearch }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    checkIn: new Date(),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 7)),
    guests: 1,
    priceRange: [0, 1000],
  });

  // Memoize featured stays data
  const [featuredStays, setFeaturedStays] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Optimize API call with caching
  const fetchFeaturedStays = useCallback(async () => {
    try {
      const { data, error } = await optimizeApiCall(
        () => supabase
          .from('rooms')
          .select('id, title, location, price_per_night, images, rating')
          .eq('is_featured', true)
          .limit(6),
        'fetchFeaturedStays',
        5 * 60 * 1000 // Cache for 5 minutes
      );

      if (error) throw error;
      setFeaturedStays(data || []);
    } catch (err) {
      console.error('Error fetching featured stays:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchFeaturedStays();
  }, [fetchFeaturedStays]);

  // Memoize search handler
  const handleSearch = useCallback(() => {
    onSearch(filters);
    navigate('/search', { state: { filters } });
  }, [filters, onSearch, navigate]);

  // Memoize filter handlers
  const handleFilterChange = useCallback((key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Memoize categories
  const categories = useMemo(() => [
    { id: 'beach', name: t('stay.categories.beach'), image: '/assets/categories/beach.jpg' },
    { id: 'mountain', name: t('stay.categories.mountain'), image: '/assets/categories/mountain.jpg' },
    { id: 'city', name: t('stay.categories.city'), image: '/assets/categories/city.jpg' },
    { id: 'countryside', name: t('stay.categories.countryside'), image: '/assets/categories/countryside.jpg' },
  ], [t]);

  // Memoize loading skeleton
  const loadingSkeleton = useMemo(() => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 h-64 rounded-lg mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  ), []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[80vh] bg-gradient-to-r from-primary to-primary-dark">
        <div className="absolute inset-0 bg-black opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              {t('stay.findYourPerfectStay')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl mb-8"
            >
              {t('stay.discoverAmazingPlaces')}
            </motion.p>

            {/* Optimized Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-4xl mx-auto bg-white rounded-full shadow-lg p-2"
            >
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder={t('stay.whereTo')}
                  className="flex-1 px-6 py-3 rounded-full focus:outline-none"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
                <button
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                  className="px-6 py-3 text-gray-600 hover:text-primary"
                >
                  {t('stay.dates')}
                </button>
                <button
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                  className="px-6 py-3 text-gray-600 hover:text-primary"
                >
                  {t('stay.guests', { count: filters.guests })}
                </button>
                <button
                  onClick={handleSearch}
                  className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-dark transition-colors"
                >
                  {t('common.search')}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Optimized Search Filters */}
      <AnimatePresence>
        {isSearchExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-0 bg-white shadow-lg z-50 p-6"
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">{t('stay.whereTo')}</h3>
                  <input
                    type="text"
                    placeholder={t('stay.searchLocation')}
                    className="w-full px-4 py-2 border rounded-lg"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t('stay.checkInOut')}</h3>
                  <DateRangePicker
                    ranges={[
                      {
                        startDate: filters.checkIn,
                        endDate: filters.checkOut,
                        key: 'selection',
                      },
                    ]}
                    onChange={(ranges) => {
                      handleFilterChange('checkIn', ranges.selection.startDate);
                      handleFilterChange('checkOut', ranges.selection.endDate);
                    }}
                    months={1}
                    direction="horizontal"
                    minDate={new Date()}
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t('stay.guests')}</h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleFilterChange('guests', Math.max(1, filters.guests - 1))}
                      className="w-8 h-8 rounded-full border flex items-center justify-center"
                    >
                      -
                    </button>
                    <span>{filters.guests}</span>
                    <button
                      onClick={() => handleFilterChange('guests', filters.guests + 1)}
                      className="w-8 h-8 rounded-full border flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optimized Featured Stays */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">{t('stay.featuredStays')}</h2>
        {isLoading ? loadingSkeleton : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredStays.map((stay) => (
              <motion.div
                key={stay.id}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/stays/${stay.id}`)}
              >
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img
                    src={stay.images[0]}
                    alt={stay.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold">{stay.title}</h3>
                    <p className="text-sm opacity-90">{stay.location}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">${stay.price_per_night}/night</span>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1">{stay.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Optimized Categories Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">{t('stay.popularCategories')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05 }}
                className="relative h-48 rounded-lg overflow-hidden cursor-pointer"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withPerformanceTracking(StaySection, 'StaySection');