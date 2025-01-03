export interface Property {
  id: string;
  name: string;
  location: string;
  description: string | null;
  price_per_night: number;
  amenities: string[] | null;
  images: string[] | null;
  rating: number | null;
  reviews_count: number | null;
}