import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { withPerformanceTracking, optimizeDataProcessing } from '../../utils/performance';
import { useBookingStore } from '../../stores/bookingStore';

interface GuestInfoProps {
  onNext: () => void;
}

// Form validation schema
const guestInfoSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  specialRequests: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
});

type GuestInfoFormData = z.infer<typeof guestInfoSchema>;

const GuestInfo: React.FC<GuestInfoProps> = ({ onNext }) => {
  const { t } = useTranslation();
  const { bookingData, updateBookingData } = useBookingStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GuestInfoFormData>({
    resolver: zodResolver(guestInfoSchema),
    defaultValues: {
      firstName: bookingData.guestInfo?.firstName || '',
      lastName: bookingData.guestInfo?.lastName || '',
      email: bookingData.guestInfo?.email || '',
      phone: bookingData.guestInfo?.phone || '',
      specialRequests: bookingData.guestInfo?.specialRequests || '',
      dietaryRestrictions: bookingData.guestInfo?.dietaryRestrictions || '',
    },
  });

  // Optimized form submission handler
  const onSubmit = useCallback(
    (data: GuestInfoFormData) => {
      optimizeDataProcessing(
        data,
        (formData) => {
          updateBookingData({
            guestInfo: formData,
          });
          onNext();
        },
        'guestInfoSubmit'
      );
    },
    [onNext, updateBookingData]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold mb-4">{t('booking.guestInfo')}</h2>
        <p className="text-gray-600">{t('booking.guestInfoDescription')}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('booking.firstName')}
            </label>
            <input
              type="text"
              {...register('firstName')}
              className={`w-full px-4 py-2 rounded-md border ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('booking.lastName')}
            </label>
            <input
              type="text"
              {...register('lastName')}
              className={`w-full px-4 py-2 rounded-md border ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('booking.email')}
            </label>
            <input
              type="email"
              {...register('email')}
              className={`w-full px-4 py-2 rounded-md border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('booking.phone')}
            </label>
            <input
              type="tel"
              {...register('phone')}
              className={`w-full px-4 py-2 rounded-md border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('booking.specialRequests')}
            </label>
            <textarea
              {...register('specialRequests')}
              rows={3}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={t('booking.specialRequestsPlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('booking.dietaryRestrictions')}
            </label>
            <textarea
              {...register('dietaryRestrictions')}
              rows={2}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={t('booking.dietaryRestrictionsPlaceholder')}
            />
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dark'
          }`}
        >
          {isSubmitting ? t('common.saving') : t('common.next')}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default withPerformanceTracking(GuestInfo, 'GuestInfo'); 