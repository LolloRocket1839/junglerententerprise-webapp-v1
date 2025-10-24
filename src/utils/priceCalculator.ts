import { UnifiedProperty } from "@/hooks/useUnifiedProperties";

/**
 * Centralized price calculation utilities for consistency across the app
 */

/**
 * Calculate total price for a student rental booking
 */
export const calculateStudentRentalPrice = (
  property: UnifiedProperty,
  startDate: Date,
  endDate: Date
): number => {
  const monthlyPrice = property.student_price_monthly || 0;
  const depositAmount = property.deposit_amount || (monthlyPrice * 2);
  
  // Calculate months
  const months = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
  );
  
  const totalRent = monthlyPrice * months;
  const total = totalRent + depositAmount;
  
  return Math.round(total * 100) / 100; // Round to 2 decimals
};

/**
 * Calculate total price for a tourist short-term booking
 */
export const calculateTouristBookingPrice = (
  property: UnifiedProperty,
  checkIn: Date,
  checkOut: Date
): { nightlyTotal: number; cleaningFee: number; totalPrice: number; nights: number } => {
  const nightlyRate = property.tourist_price_nightly || 0;
  const cleaningFee = property.cleaning_fee || 0;
  
  // Calculate nights
  const nights = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const nightlyTotal = nightlyRate * nights;
  const totalPrice = nightlyTotal + cleaningFee;
  
  return {
    nightlyTotal: Math.round(nightlyTotal * 100) / 100,
    cleaningFee: Math.round(cleaningFee * 100) / 100,
    totalPrice: Math.round(totalPrice * 100) / 100,
    nights
  };
};

/**
 * Calculate estimated ROI for an investment
 */
export const calculateInvestmentROI = (
  property: UnifiedProperty,
  investmentAmount: number,
  estimatedAnnualRevenue: number
): { 
  annualReturn: number; 
  monthlyReturn: number; 
  roiPercentage: number;
  investorShare: number;
} => {
  const investorSharePercentage = property.investor_share_percentage || 70;
  
  // Calculate investor's share of revenue
  const investorAnnualShare = (estimatedAnnualRevenue * investorSharePercentage) / 100;
  
  // Calculate ROI based on investment amount
  const roiPercentage = (investorAnnualShare / investmentAmount) * 100;
  const monthlyReturn = investorAnnualShare / 12;
  
  return {
    annualReturn: Math.round(investorAnnualShare * 100) / 100,
    monthlyReturn: Math.round(monthlyReturn * 100) / 100,
    roiPercentage: Math.round(roiPercentage * 100) / 100,
    investorShare: investorSharePercentage
  };
};

/**
 * Calculate property yield (annual return as % of property value)
 */
export const calculatePropertyYield = (
  annualRevenue: number,
  propertyValue: number
): { 
  grossYield: number; 
  netYield: number; 
} => {
  // Estimate expenses at 30% of revenue (industry standard)
  const estimatedExpenses = annualRevenue * 0.30;
  const netRevenue = annualRevenue - estimatedExpenses;
  
  const grossYield = (annualRevenue / propertyValue) * 100;
  const netYield = (netRevenue / propertyValue) * 100;
  
  return {
    grossYield: Math.round(grossYield * 100) / 100,
    netYield: Math.round(netYield * 100) / 100
  };
};

/**
 * Estimate annual revenue for a hybrid property
 */
export const estimateHybridPropertyRevenue = (
  property: UnifiedProperty,
  studentMonths: number = 9, // Academic year
  touristNights: number = 90 // Summer + holidays
): number => {
  const studentRevenue = (property.student_price_monthly || 0) * studentMonths;
  const touristRevenue = (property.tourist_price_nightly || 0) * touristNights;
  
  return Math.round((studentRevenue + touristRevenue) * 100) / 100;
};

/**
 * Format price with currency symbol
 */
export const formatPrice = (
  amount: number,
  currency: string = 'EUR',
  locale: string = 'it-IT'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Calculate platform fees (for internal use)
 */
export const calculatePlatformFees = (
  totalPrice: number,
  feePercentage: number = 5 // Default 5% platform fee
): { platformFee: number; hostAmount: number } => {
  const platformFee = (totalPrice * feePercentage) / 100;
  const hostAmount = totalPrice - platformFee;
  
  return {
    platformFee: Math.round(platformFee * 100) / 100,
    hostAmount: Math.round(hostAmount * 100) / 100
  };
};

/**
 * Validate price inputs
 */
export const validatePrice = (price: number): boolean => {
  return price > 0 && price < 1000000 && Number.isFinite(price);
};

/**
 * Calculate discount percentage
 */
export const calculateDiscount = (
  originalPrice: number,
  discountedPrice: number
): number => {
  if (originalPrice <= 0 || discountedPrice <= 0) return 0;
  
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(discount);
};
