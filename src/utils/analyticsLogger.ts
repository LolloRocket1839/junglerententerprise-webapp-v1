import { supabase } from "@/integrations/supabase/client";

/**
 * Analytics and logging utilities for tracking user behavior and system events
 */

export type AnalyticsEvent = 
  | 'property_view'
  | 'property_search'
  | 'booking_started'
  | 'booking_completed'
  | 'booking_cancelled'
  | 'investment_view'
  | 'investment_started'
  | 'investment_completed'
  | 'revenue_calculated'
  | 'error_occurred';

interface AnalyticsEventData {
  event: AnalyticsEvent;
  propertyId?: string;
  userId?: string;
  metadata?: Record<string, any>;
  timestamp?: string;
}

/**
 * Log an analytics event
 * Can be extended to send to external analytics platforms (Google Analytics, Mixpanel, etc.)
 */
export const logAnalyticsEvent = async (data: AnalyticsEventData) => {
  const timestamp = data.timestamp || new Date().toISOString();
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics Event]', {
      ...data,
      timestamp
    });
  }

  // Here you could send to external analytics services
  // Example: Google Analytics, Mixpanel, Amplitude, etc.
  
  try {
    // Store critical events in database for admin reporting
    if (['booking_completed', 'investment_completed', 'error_occurred'].includes(data.event)) {
      // Could create an analytics_events table for this
      // await supabase.from('analytics_events').insert({ ...data, timestamp });
    }
  } catch (error) {
    // Don't throw - analytics should never break the app
    console.error('Analytics logging error:', error);
  }
};

/**
 * Log property view for tracking popular properties
 */
export const logPropertyView = async (propertyId: string, usageMode: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    await logAnalyticsEvent({
      event: 'property_view',
      propertyId,
      userId: user?.id,
      metadata: { usageMode }
    });
  } catch (error) {
    console.error('Error logging property view:', error);
  }
};

/**
 * Log booking completion for conversion tracking
 */
export const logBookingCompleted = async (
  propertyId: string, 
  bookingType: string, 
  totalPrice: number
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    await logAnalyticsEvent({
      event: 'booking_completed',
      propertyId,
      userId: user?.id,
      metadata: { 
        bookingType, 
        totalPrice,
        currency: 'EUR'
      }
    });
  } catch (error) {
    console.error('Error logging booking completion:', error);
  }
};

/**
 * Log investment completion for tracking fundraising
 */
export const logInvestmentCompleted = async (
  propertyId: string,
  amount: number
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    await logAnalyticsEvent({
      event: 'investment_completed',
      propertyId,
      userId: user?.id,
      metadata: { 
        amount,
        currency: 'EUR'
      }
    });
  } catch (error) {
    console.error('Error logging investment completion:', error);
  }
};

/**
 * Log errors for monitoring and debugging
 */
export const logError = async (
  errorMessage: string,
  context?: Record<string, any>
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    await logAnalyticsEvent({
      event: 'error_occurred',
      userId: user?.id,
      metadata: {
        errorMessage,
        context,
        userAgent: navigator.userAgent,
        url: window.location.href
      }
    });

    // In production, could send to error tracking service (Sentry, Rollbar, etc.)
    if (process.env.NODE_ENV === 'production') {
      console.error('Application Error:', errorMessage, context);
    }
  } catch (error) {
    console.error('Error logging error:', error);
  }
};

/**
 * Track search queries for improving search functionality
 */
export const logSearchQuery = async (
  query: string,
  filters: Record<string, any>,
  resultCount: number
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    await logAnalyticsEvent({
      event: 'property_search',
      userId: user?.id,
      metadata: {
        query,
        filters,
        resultCount
      }
    });
  } catch (error) {
    console.error('Error logging search:', error);
  }
};
