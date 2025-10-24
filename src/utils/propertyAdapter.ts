import { UnifiedProperty } from '@/hooks/useUnifiedProperties';

/**
 * Adapter utility to provide backward compatibility with StudentProperty fields
 */
export const getMonthlyPrice = (property: UnifiedProperty): number => {
  return property.student_price_monthly || 0;
};

export const getMarketPrice = (property: UnifiedProperty): number => {
  // Calculate market price from current value or use student price as fallback
  return property.current_value ? property.current_value / 12 : (property.student_price_monthly || 0) * 1.2;
};

export const getDiscountPercentage = (property: UnifiedProperty): number => {
  const market = getMarketPrice(property);
  const discounted = getMonthlyPrice(property);
  if (market === 0 || discounted === 0) return 0;
  return Math.round(((market - discounted) / market) * 100);
};

export const getAvailabilityStart = (property: UnifiedProperty): string => {
  return property.academic_year_start || new Date().toISOString();
};

export const getAvailabilityEnd = (property: UnifiedProperty): string => {
  return property.academic_year_end || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
};

export const getCurrentStatus = (property: UnifiedProperty): string => {
  return property.status;
};

export const getDepositAmount = (property: UnifiedProperty): number => {
  return property.deposit_amount || (getMonthlyPrice(property) * 2);
};