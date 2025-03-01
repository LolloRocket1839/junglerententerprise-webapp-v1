
export type TouristProperty = {
  id: string;
  title: string;
  description: string;
  short_description?: string;
  address: string;
  city: string;
  postal_code?: string;
  images: string[];
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  price_per_night: number;
  cleaning_fee: number;
  availability_period_start?: string;
  availability_period_end?: string;
  check_in_time?: string;
  check_out_time?: string;
  pets_allowed: boolean;
  smoking_allowed: boolean;
  parties_allowed: boolean;
  amenities: string[];
  additional_rules: string[];
};
