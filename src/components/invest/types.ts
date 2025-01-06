export interface Property {
  id: string;
  name: string;
  location: string;
  description: string;
  price_per_night: number;
  amenities: string[] | null;
  images: string[] | null;
  rating: number | null;
  reviews_count: number | null;
  investment_goal: number;
  amount_raised: number;
}