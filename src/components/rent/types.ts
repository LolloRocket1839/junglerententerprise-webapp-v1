export interface StudentProperty {
  id: string;
  title: string;
  description: string;
  images: string[];
  floor_plan_url?: string;
  virtual_tour_url?: string;
  size_sqm: number;
  rooms: number;
  bathrooms: number;
  has_kitchen: boolean;
  has_living_room: boolean;
  has_balcony: boolean;
  is_furnished: boolean;
  appliances: string[];
  utilities: string[];
  internet_available: boolean;
  internet_speed?: number;
  address: string;
  city: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  market_price_monthly: number;
  discounted_price_monthly: number;
  discount_percentage?: number;
  deposit_amount?: number;
  utilities_included: boolean;
  estimated_utilities_cost?: number;
  availability_start?: string;
  availability_end?: string;
  academic_year?: string;
  current_status: 'available' | 'reserved' | 'occupied' | 'maintenance';
}

export interface University {
  id: string;
  name: string;
  address: string;
  city: string;
  type: 'public' | 'private';
  faculties: string[];
  fall_semester_start?: string;
  fall_semester_end?: string;
  spring_semester_start?: string;
  spring_semester_end?: string;
  summer_session_start?: string;
  summer_session_end?: string;
}

export interface PropertyUniversityDistance {
  university_id: string;
  university_name: string;
  distance_km: number;
  travel_time_minutes?: number;
  transport_type?: string;
}

export interface SearchFilters {
  city?: string;
  university_id?: string;
  max_price?: number;
  min_rooms?: number;
  amenities?: string[];
  max_distance_km?: number;
}

export interface PropertyAnalytics {
  id: string;
  property_id: string;
  acquisition_cost: number;
  renovation_cost: number;
  total_investment: number;
  student_rental_revenue: number;
  tourist_rental_revenue: number;
  mortgage_expense: number;
  property_tax: number;
  insurance_expense: number;
  utilities_expense: number;
  maintenance_expense: number;
  platform_fees: number;
  management_fees: number;
  net_operating_income: number;
  cash_on_cash_return: number;
  cap_rate: number;
  gross_rental_yield: number;
  net_rental_yield: number;
  break_even_occupancy: number;
}

export interface OccupancyMetrics {
  id: string;
  property_id: string;
  period_start: string;
  period_end: string;
  revenue_source: 'student' | 'tourist';
  occupancy_rate: number;
  average_rate: number;
  total_revenue: number;
}

export interface MarketAnalytics {
  id: string;
  property_id: string;
  average_rent_area: number;
  price_sqm_area: number;
  competitive_index: number;
  tourist_rate_area?: number;
  tourist_occupancy_area?: number;
  seasonality_factor?: number;
}

export interface SFPPerformance {
  id: string;
  property_id: string;
  jungle_rent_share: number;
  investor_share: number;
  current_yield: number;
  projected_yield: number;
  deposit_account_comparison: number;
  real_estate_comparison: number;
  reit_comparison: number;
}

export interface TransitionPeriod {
  id: string;
  property_id: string;
  start_date: string;
  end_date: string;
  days_vacant: number;
  total_costs: number;
  status: 'planned' | 'in_progress' | 'completed';
}
