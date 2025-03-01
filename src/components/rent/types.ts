
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
