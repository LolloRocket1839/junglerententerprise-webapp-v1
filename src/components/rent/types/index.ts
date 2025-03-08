
export interface SearchParams {
  city: string;
  university: string;
  roomType: string;
  minPrice: string;
  maxPrice: string;
  moveInDate: string;
}

export interface Property {
  id: string;
  title: string;
  address: string;
  description: string;
  city: string;
  discounted_price_monthly: number;
  market_price_monthly: number;
  size_sqm: number;
  rooms: number;
  bathrooms: number;
  images: string[];
  distance_to_university: string;
  availability_start: string;
  savings_percentage: number;
  current_status: string;
  has_balcony: boolean;
  has_kitchen: boolean;
  utilities_included: boolean;
  phone_number: string;
}

export interface Application {
  property_id: string;
  status: string;
  submitted_at: string;
}
