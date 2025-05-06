import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { measurePerformance } from '../../utils/performance';

interface StayCategoriesProps {
  onCategorySelect: (category: string) => void;
  selectedCategory?: string;
}

const categories = [
  {
    id: 'beach',
    icon: '🏖️',
    image: '/images/categories/beach.jpg',
  },
  {
    id: 'mountain',
    icon: '⛰️',
    image: '/images/categories/mountain.jpg',
  },
  {
    id: 'city',
    icon: '🌆',
    image: '/images/categories/city.jpg',
  },
  {
    id: 'countryside',
    icon: '🌄',
    image: '/images/categories/countryside.jpg',
  },
];

const StayCategories: React.FC<StayCategoriesProps> = memo(({
  onCategorySelect,
  selectedCategory,
}) => {
  const { t } = useTranslation();

  const handleCategoryClick = useCallback((categoryId: string) => {
    measurePerformance('categorySelect', () => {
      onCategorySelect(categoryId);
    });
  }, [onCategorySelect]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900">
        {t('stay.popularCategories')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCategoryClick(category.id)}
            className={`relative group overflow-hidden rounded-xl aspect-[4/3] ${
              selectedCategory === category.id
                ? 'ring-2 ring-primary-600'
                : ''
            }`}
          >
            <div className="absolute inset-0">
              <img
                src={category.image}
                alt={t(`stay.categories.${category.id}`)}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
              <span className="text-4xl mb-2">{category.icon}</span>
              <h3 className="text-lg font-semibold text-center">
                {t(`stay.categories.${category.id}`)}
              </h3>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleCategoryClick('all')}
          className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t('stay.viewAllCategories')}
        </motion.button>
      </div>
    </motion.div>
  );
});

StayCategories.displayName = 'StayCategories';

export default StayCategories; 