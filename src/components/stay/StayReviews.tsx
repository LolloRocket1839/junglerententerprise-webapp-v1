import React, { memo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { measurePerformance } from '../../utils/performance';

interface Review {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface StayReviewsProps {
  stayId: string;
  averageRating: number;
  reviewCount: number;
  reviews: Review[];
  onReviewSubmit: (review: Omit<Review, 'id' | 'created_at'>) => Promise<void>;
}

const StayReviews: React.FC<StayReviewsProps> = memo(({
  stayId,
  averageRating,
  reviewCount,
  reviews,
  onReviewSubmit,
}) => {
  const { t } = useTranslation();
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRatingChange = useCallback((rating: number) => {
    measurePerformance('ratingChange', () => {
      setNewReview(prev => ({ ...prev, rating }));
    });
  }, []);

  const handleCommentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    measurePerformance('commentChange', () => {
      setNewReview(prev => ({ ...prev, comment: e.target.value }));
    });
  }, []);

  const handleSubmitReview = useCallback(async () => {
    if (!newReview.comment.trim()) {
      setError(t('stay.reviewCommentRequired'));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await measurePerformance('submitReview', async () => {
        await onReviewSubmit({
          user_id: 'current-user-id', // Replace with actual user ID
          user_name: 'Current User', // Replace with actual user name
          user_avatar: '/images/avatars/default.jpg', // Replace with actual user avatar
          rating: newReview.rating,
          comment: newReview.comment,
        });
      });

      setNewReview({ rating: 5, comment: '' });
      setIsWritingReview(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('stay.errorSubmittingReview'));
    } finally {
      setIsSubmitting(false);
    }
  }, [newReview, onReviewSubmit, t]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {t('stay.reviews')}
          </h2>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <span className="ml-1 text-gray-600">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-gray-600">
              {reviewCount} {t('stay.reviews')}
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsWritingReview(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          {t('stay.writeReview')}
        </button>
      </div>

      <AnimatePresence>
        {isWritingReview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {t('stay.writeYourReview')}
            </h3>

            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`p-1 rounded-full transition-colors ${
                    newReview.rating >= rating
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                >
                  <StarIcon className="h-8 w-8" />
                </button>
              ))}
            </div>

            <textarea
              value={newReview.comment}
              onChange={handleCommentChange}
              placeholder={t('stay.reviewPlaceholder')}
              className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsWritingReview(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                {t('stay.cancel')}
              </button>
              <button
                onClick={handleSubmitReview}
                disabled={isSubmitting}
                className={`px-6 py-2 bg-primary-600 text-white rounded-lg transition-colors ${
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-primary-700'
                }`}
              >
                {isSubmitting ? t('stay.submitting') : t('stay.submitReview')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow p-6"
          >
            <div className="flex items-start space-x-4">
              <img
                src={review.user_avatar}
                alt={review.user_name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900">
                    {review.user_name}
                  </h4>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="ml-1 text-gray-600">
                      {review.rating}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-gray-600">
                  {review.comment}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {reviews.length === 0 && !isWritingReview && (
        <div className="text-center py-8">
          <p className="text-gray-600">
            {t('stay.noReviewsYet')}
          </p>
        </div>
      )}
    </motion.div>
  );
});

StayReviews.displayName = 'StayReviews';

export default StayReviews; 