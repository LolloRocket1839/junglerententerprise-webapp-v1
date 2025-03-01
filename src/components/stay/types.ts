
export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  features: string[];
  description: string;
  imageUrl: string;
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
