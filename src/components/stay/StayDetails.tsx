import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  StarIcon,
  MapPinIcon,
  UserGroupIcon,
  HomeIcon,
  BedIcon,
  BathIcon,
} from '@heroicons/react/24/outline';
import { Stay } from '../../stores/stayStore';
import useStayStore from '../../stores/stayStore';
import { measurePerformance } from '../../utils/performance';
import StayCard from './StayCard';

const StayDetails: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedStay, fetchStayById, loading, error } = useStayStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);

  useEffect(() => {
    if (id) {
      measurePerformance('fetchStayDetails', () => {
        fetchStayById(id);
      });
    }
  }, [id, fetchStayById]);

  const handleImageClick = useCallback((index: number) => {
    measurePerformance('imageClick', () => {
      setCurrentImageIndex(index);
      setShowAllImages(true);
    });
  }, []);

  const loadingSpinner = useMemo(() => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
    </div>
  ), []);

  const errorContent = useMemo(() => (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        {error || t('stay.errorLoading')}
      </h2>
      <button
        onClick={() => navigate('/stays')}
        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        {t('stay.backToStays')}
      </button>
    </div>
  ), [error, t, navigate]);

  if (loading) return loadingSpinner;
  if (error || !selectedStay) return errorContent;

  const {
    title,
    description,
    location,
    price_per_night,
    images,
    amenities,
    max_guests,
    bedrooms,
    beds,
    bathrooms,
    rating,
    review_count,
    category,
  } = selectedStay;

  const amenitiesList = useMemo(() => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {amenities.map((amenity) => (
        <div
          key={amenity}
          className="flex items-center text-gray-600"
        >
          <span className="w-2 h-2 bg-primary-600 rounded-full mr-2" />
          {t(`stay.amenities.${amenity}`)}
        </div>
      ))}
    </div>
  ), [amenities, t]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <img
              src={images[currentImageIndex]}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.slice(0, 4).map((image, index) => (
              <button
                key={index}
                onClick={() => handleImageClick(index)}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <img
                  src={image}
                  alt={`${title} ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Stay Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <div className="mt-2 flex items-center space-x-4">
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="ml-1 text-gray-600">
                  {rating.toFixed(1)} ({review_count} {t('stay.reviews')})
                </span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 text-gray-400" />
                <span className="ml-1 text-gray-600">{location}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center">
                <UserGroupIcon className="h-6 w-6 text-gray-400" />
                <span className="ml-2 text-gray-600">
                  {max_guests} {t('stay.guests')}
                </span>
              </div>
              <div className="flex items-center">
                <HomeIcon className="h-6 w-6 text-gray-400" />
                <span className="ml-2 text-gray-600">
                  {bedrooms} {t('stay.bedrooms')}
                </span>
              </div>
              <div className="flex items-center">
                <BedIcon className="h-6 w-6 text-gray-400" />
                <span className="ml-2 text-gray-600">
                  {beds} {t('stay.beds')}
                </span>
              </div>
              <div className="flex items-center">
                <BathIcon className="h-6 w-6 text-gray-400" />
                <span className="ml-2 text-gray-600">
                  {bathrooms} {t('stay.bathrooms')}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('stay.aboutThisPlace')}
            </h2>
            <p className="text-gray-600 whitespace-pre-line">{description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('stay.amenities')}
            </h2>
            {amenitiesList}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {t('stay.pricePerNight', { price: price_per_night })}
                </p>
                <p className="text-sm text-gray-500">{t('stay.totalPrice')}</p>
              </div>
              <button
                onClick={() => navigate(`/stays/${id}/book`)}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                {t('stay.bookNow')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {showAllImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setShowAllImages(false)}
          >
            <div className="relative max-w-7xl w-full h-full flex items-center justify-center p-4">
              <button
                onClick={() => setShowAllImages(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300"
              >
                <span className="sr-only">{t('stay.close')}</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img
                src={images[currentImageIndex]}
                alt={title}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex
                        ? 'bg-white'
                        : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StayDetails; 