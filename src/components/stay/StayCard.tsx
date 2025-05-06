import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { Stay } from '../../stores/stayStore';
import { measurePerformance } from '../../utils/performance';

interface StayCardProps {
  stay: Stay;
  onHover?: (stay: Stay) => void;
}

const StayCard: React.FC<StayCardProps> = memo(({ stay, onHover }) => {
  const { t } = useTranslation();
  const {
    id,
    title,
    location,
    price_per_night,
    images,
    rating,
    review_count,
    category,
  } = stay;

  const handleHover = useCallback(() => {
    if (onHover) {
      measurePerformance('stayCardHover', () => {
        onHover(stay);
      });
    }
  }, [onHover, stay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={handleHover}
      className="group relative bg-white rounded-xl shadow-md overflow-hidden"
    >
      <Link to={`/stays/${id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-800">
              {t(`stay.categories.${category}`)}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{location}</p>
            </div>
            <div className="flex items-center">
              <StarIcon className="h-4 w-4 text-yellow-400" />
              <span className="ml-1 text-sm text-gray-600">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {review_count} {t('stay.reviews')}
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {t('stay.pricePerNight', { price: price_per_night })}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

StayCard.displayName = 'StayCard';

export default StayCard; 