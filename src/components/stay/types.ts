export interface Location {
  address: string;
  city: string;
  postal_code: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Rules {
  check_in_time: string;
  check_out_time: string;
  pets_allowed: boolean;
  smoking_allowed: boolean;
  parties_allowed: boolean;
  additional_rules: string[];
}

export interface AvailabilityPeriod {
  start: string;
  end: string;
}

export interface ReviewCategories {
  cleanliness: number;
  communication: number;
  check_in: number;
  accuracy: number;
  location: number;
  value: number;
}

export interface Review {
  id: string;
  booking_id: string;
  guest_id: string;
  property_id: string;
  rating: number;
  comment: string;
  response?: string;
  created_at: string;
  photos: string[];
  categories: ReviewCategories;
}

export interface PointOfInterest {
  name: string;
  distance: number;
  type: string;
}

export interface TouristProperty {
  id: string;
  property_id: string;
  title: string;
  description: string;
  short_description: string;
  images: string[];
  amenities: string[];
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  price_per_night: number;
  cleaning_fee: number;
  availability_period: AvailabilityPeriod;
  location: Location;
  points_of_interest: PointOfInterest[];
  rules: Rules;
  rating?: number;
  reviews?: Review[];
}

export interface SearchParams {
  location: string;
  check_in: string;
  check_out: string;
  guests: number;
  price_range?: {
    min: number;
    max: number;
  };
  amenities?: string[];
}

export interface BookingStatus {
  id: string;
  property_id: string;
  guest_id: string;
  check_in: string;
  check_out: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'canceled' | 'completed';
  payment_status: 'pending' | 'partial' | 'complete' | 'refunded';
  special_requests?: string;
  number_of_guests: number;
  created_at: string;
  updated_at: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  identification_document: {
    type: 'passport' | 'id_card' | 'driver_license';
    number: string;
    expiry_date: string;
    country: string;
  };
  previous_bookings: number;
  average_rating: number;
}

export interface DateRange {
  checkIn: string;
  checkOut: string;
}
