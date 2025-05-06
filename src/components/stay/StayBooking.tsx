import React, { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { withPerformanceTracking, optimizeApiCall, debounce } from '../../utils/performance';
import { supabase } from '../../lib/supabase/client';
import { StayDetails } from './StayDetails';
import { GuestInfo } from './GuestInfo';
import { PaymentForm } from './PaymentForm';
import { BookingSummary } from './BookingSummary';
import { useBookingStore } from '../../stores/bookingStore';

const STEPS = {
  DETAILS: 'details',
  GUEST_INFO: 'guest_info',
  PAYMENT: 'payment',
  SUMMARY: 'summary',
};

const StayBooking: React.FC = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(STEPS.DETAILS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { bookingData, updateBookingData, clearBookingData } = useBookingStore();

  // Memoize step components to prevent unnecessary re-renders
  const stepComponents = useMemo(() => ({
    [STEPS.DETAILS]: <StayDetails onNext={() => setCurrentStep(STEPS.GUEST_INFO)} />,
    [STEPS.GUEST_INFO]: <GuestInfo onNext={() => setCurrentStep(STEPS.PAYMENT)} />,
    [STEPS.PAYMENT]: <PaymentForm onNext={() => setCurrentStep(STEPS.SUMMARY)} />,
    [STEPS.SUMMARY]: <BookingSummary onComplete={handleBookingComplete} />,
  }), []);

  // Optimized booking completion handler
  const handleBookingComplete = useCallback(async () => {
    const startTime = performance.now();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const booking = await optimizeApiCall(
        () => supabase
          .from('bookings')
          .insert({
            user_id: user.id,
            ...bookingData,
            status: 'confirmed',
            created_at: new Date().toISOString(),
          })
          .select()
          .single(),
        'createBooking'
      );

      if (booking.error) throw booking.error;

      // Clear booking data after successful submission
      clearBookingData();
      
      // Show success message
      toast.success(t('booking.success'));
      
      // Redirect to booking confirmation page
      navigate(`/bookings/${booking.data.id}`);
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(t('booking.error'));
    } finally {
      setIsSubmitting(false);
      measurePerformance('bookingComplete', startTime);
    }
  }, [bookingData, clearBookingData, t]);

  // Debounced step change handler
  const handleStepChange = useCallback(
    debounce((step: string) => {
      setCurrentStep(step);
    }, 100),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {Object.values(STEPS).map((step, index) => (
            <React.Fragment key={step}>
              <div
                className={`flex items-center ${
                  currentStep === step ? 'text-primary' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep === step
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-300'
                  }`}
                >
                  {index + 1}
                </div>
                <span className="ml-2 text-sm font-medium">
                  {t(`booking.steps.${step}`)}
                </span>
              </div>
              {index < Object.values(STEPS).length - 1 && (
                <div className="flex-1 h-0.5 bg-gray-200 mx-4" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {stepComponents[currentStep]}
        </motion.div>
      </AnimatePresence>

      {/* Loading State */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
            <p className="mt-2 text-sm text-gray-600">{t('common.processing')}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default withPerformanceTracking(StayBooking, 'StayBooking'); 