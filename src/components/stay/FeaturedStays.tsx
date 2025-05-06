import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useStayStore from '../../stores/stayStore';
import { measurePerformance } from '../../utils/performance';
import StayCard from './StayCard';

const FeaturedStays: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { featuredStays, loading, error, fetchFeaturedStays } = useStayStore();

  useEffect(() => {
    measurePerformance('fetchFeaturedStays', () => {
      fetchFeaturedStays();
    });
  }, [fetchFeaturedStays]);

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
          {t('stay.errorLoadingFeatured')}
        </p>
        <button
          onClick={() => fetchFeaturedStays()}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          {t('stay.tryAgain')}
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          {t('stay.featuredStays')}
        </h2>
        <button
          onClick={() => navigate('/stays')}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          {t('stay.viewAll')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredStays.map((stay) => (
          <motion.div
            key={stay.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StayCard
              stay={stay}
              onHover={(hoveredStay) => {
                measurePerformance('featuredStayHover', () => {
                  // Handle hover effects or analytics
                  console.log('Hovered featured stay:', hoveredStay.title);
                });
              }}
            />
          </motion.div>
        ))}
      </div>

      {featuredStays.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t('stay.noFeaturedStays')}
          </h3>
          <p className="text-gray-600">
            {t('stay.checkBackLater')}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default memo(FeaturedStays); 