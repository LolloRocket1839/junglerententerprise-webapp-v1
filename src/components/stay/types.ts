
export interface TouristProperty {
  id: string;
  title: string;
  description: string;
  short_description?: string;
  images: string[];
  amenities: string[];
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  price_per_night: number;
  cleaning_fee: number;
  address: string;
  city: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  check_in_time?: string;
  check_out_time?: string;
  pets_allowed: boolean;
  smoking_allowed: boolean;
  parties_allowed: boolean;
  additional_rules: string[];
  rating?: number;
  reviews_count?: number;
}

export interface SearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface DateRange {
  checkIn: string;
  checkOut: string;
}

export interface PointOfInterest {
  id: string;
  property_id: string;
  name: string;
  distance: number;
  type: string;
}

export interface PropertyDetails extends TouristProperty {
  points_of_interest: PointOfInterest[];
}

