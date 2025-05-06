import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { withPerformanceTracking, optimizeApiCall } from '../../utils/performance';
import { useBookingStore } from '../../stores/bookingStore';
import { supabase } from '../../lib/supabase/client';

interface PaymentFormProps {
  onNext: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onNext }) => {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { bookingData } = useBookingStore();

  // Optimized payment submission handler
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const startTime = performance.now();
    setIsProcessing(true);
    setError(null);

    try {
      // Create payment intent
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: paymentIntent, error: intentError } = await optimizeApiCall(
        () => supabase.functions.invoke('create-payment-intent', {
          body: {
            amount: bookingData.totalPrice * 100, // Convert to cents
            currency: 'usd',
            user_id: user.id,
          },
        }),
        'createPaymentIntent'
      );

      if (intentError) throw intentError;

      // Confirm card payment
      const { error: paymentError } = await stripe.confirmCardPayment(
        paymentIntent.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              name: `${bookingData.guestInfo?.firstName} ${bookingData.guestInfo?.lastName}`,
              email: bookingData.guestInfo?.email,
            },
          },
        }
      );

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      // Update booking data with payment info
      await optimizeApiCall(
        () => supabase
          .from('bookings')
          .update({
            payment_status: 'paid',
            payment_intent_id: paymentIntent.id,
          })
          .eq('id', bookingData.id),
        'updateBookingPayment'
      );

      onNext();
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
      measurePerformance('paymentProcess', startTime);
    }
  }, [stripe, elements, bookingData, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold mb-4">{t('booking.payment')}</h2>
        <p className="text-gray-600">{t('booking.paymentDescription')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Details */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            {t('payment.cardDetails')}
          </label>
          <div className="p-4 border border-gray-300 rounded-md">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">{t('booking.priceSummary')}</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{t('booking.roomPrice')}</span>
              <span>${bookingData.totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('booking.taxes')}</span>
              <span>${(bookingData.totalPrice * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>{t('booking.total')}</span>
              <span>
                ${(bookingData.totalPrice * 1.1).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
          >
            {error}
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={!stripe || isProcessing}
          className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
            !stripe || isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dark'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2" />
              {t('payment.processing')}
            </div>
          ) : (
            t('payment.payNow')
          )}
        </motion.button>
      </form>

      {/* Security Notice */}
      <div className="text-sm text-gray-500 text-center">
        <p>{t('payment.securityNotice')}</p>
        <div className="flex items-center justify-center space-x-4 mt-2">
          <img
            src="/assets/visa.svg"
            alt="Visa"
            className="h-6"
          />
          <img
            src="/assets/mastercard.svg"
            alt="Mastercard"
            className="h-6"
          />
          <img
            src="/assets/amex.svg"
            alt="American Express"
            className="h-6"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default withPerformanceTracking(PaymentForm, 'PaymentForm'); 