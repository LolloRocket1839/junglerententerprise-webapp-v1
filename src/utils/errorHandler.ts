import { toast } from "sonner";
import { PostgrestError } from "@supabase/supabase-js";
import { logError } from "./analyticsLogger";

/**
 * Centralized error handling utilities
 */

export interface AppError {
  code: string;
  message: string;
  details?: any;
  userMessage: string;
}

/**
 * Parse Supabase/Postgres errors into user-friendly messages
 */
export const parseSupabaseError = (error: PostgrestError): AppError => {
  const code = error.code || 'UNKNOWN_ERROR';
  const message = error.message || 'An unknown error occurred';
  
  // Common Postgres error codes
  const errorMap: Record<string, string> = {
    '23505': 'This record already exists. Please try with different information.',
    '23503': 'Related record not found. Please refresh and try again.',
    '23502': 'Required information is missing. Please fill all required fields.',
    '42501': 'You do not have permission to perform this action.',
    '42P01': 'Database configuration error. Please contact support.',
    'PGRST116': 'No records found matching your criteria.',
    'PGRST301': 'Request too large. Please reduce the size of your data.',
  };
  
  const userMessage = errorMap[code] || 'An unexpected error occurred. Please try again.';
  
  return {
    code,
    message,
    details: error.details || error.hint,
    userMessage
  };
};

/**
 * Handle booking errors with specific messages
 */
export const handleBookingError = (error: any): void => {
  console.error('Booking error:', error);
  
  const appError = parseSupabaseError(error);
  
  // Specific booking error cases
  if (error.message?.includes('conflict') || error.message?.includes('overlap')) {
    toast.error('These dates are no longer available. Please select different dates.');
  } else if (error.code === '23502') {
    toast.error('Please fill in all required booking information.');
  } else if (error.code === '42501') {
    toast.error('Please log in to complete your booking.');
  } else {
    toast.error(appError.userMessage);
  }
  
  // Log for monitoring
  logError('Booking failed', { 
    code: appError.code, 
    message: appError.message,
    details: appError.details 
  });
};

/**
 * Handle investment errors
 */
export const handleInvestmentError = (error: any): void => {
  console.error('Investment error:', error);
  
  const appError = parseSupabaseError(error);
  
  // Specific investment error cases
  if (error.message?.includes('goal') || error.message?.includes('funded')) {
    toast.error('This property is fully funded. Please choose another investment opportunity.');
  } else if (error.code === '42501') {
    toast.error('Please log in to invest.');
  } else if (error.message?.includes('payment')) {
    toast.error('Payment processing failed. Please try again or use a different payment method.');
  } else {
    toast.error(appError.userMessage);
  }
  
  // Log for monitoring
  logError('Investment failed', { 
    code: appError.code, 
    message: appError.message,
    details: appError.details 
  });
};

/**
 * Handle authentication errors
 */
export const handleAuthError = (error: any): void => {
  console.error('Auth error:', error);
  
  // Common auth errors
  if (error.message?.includes('Invalid login credentials')) {
    toast.error('Invalid email or password. Please try again.');
  } else if (error.message?.includes('Email not confirmed')) {
    toast.error('Please confirm your email address before logging in.');
  } else if (error.message?.includes('User already registered')) {
    toast.error('An account with this email already exists. Please log in instead.');
  } else if (error.message?.includes('Password')) {
    toast.error('Password must be at least 6 characters long.');
  } else {
    toast.error('Authentication failed. Please try again.');
  }
  
  // Log for monitoring
  logError('Authentication failed', { 
    message: error.message 
  });
};

/**
 * Handle network/fetch errors
 */
export const handleNetworkError = (error: any): void => {
  console.error('Network error:', error);
  
  if (!navigator.onLine) {
    toast.error('No internet connection. Please check your network and try again.');
  } else if (error.name === 'AbortError') {
    toast.error('Request timed out. Please try again.');
  } else {
    toast.error('Connection error. Please check your internet and try again.');
  }
  
  // Log for monitoring
  logError('Network error', { 
    message: error.message,
    online: navigator.onLine 
  });
};

/**
 * Generic error handler with logging and user notification
 */
export const handleError = (
  error: any,
  context: string = 'Operation',
  showToast: boolean = true
): void => {
  console.error(`Error in ${context}:`, error);
  
  // Determine error type and handle accordingly
  if (error?.code && error?.message) {
    // Supabase error
    const appError = parseSupabaseError(error);
    if (showToast) {
      toast.error(appError.userMessage);
    }
    logError(`${context} failed`, appError);
  } else if (error instanceof TypeError && error.message.includes('fetch')) {
    // Network error
    handleNetworkError(error);
  } else if (error?.message) {
    // Generic error with message
    if (showToast) {
      toast.error(`${context} failed: ${error.message}`);
    }
    logError(`${context} failed`, { message: error.message });
  } else {
    // Unknown error
    if (showToast) {
      toast.error(`${context} failed. Please try again.`);
    }
    logError(`${context} failed`, { error: String(error) });
  }
};

/**
 * Create a safe async wrapper that handles errors
 */
export const safeAsync = <T>(
  fn: () => Promise<T>,
  context: string,
  onError?: (error: any) => void
): Promise<T | null> => {
  return fn().catch((error) => {
    handleError(error, context);
    if (onError) {
      onError(error);
    }
    return null;
  });
};
