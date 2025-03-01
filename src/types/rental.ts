
export type StudentProperty = {
  id: string;
  title: string;
  description: string;
  images: string[];
  floorPlan?: string;
  virtualTour?: string;
  size: number;
  rooms: number;
  bathrooms: number;
  hasKitchen: boolean;
  hasLivingRoom: boolean;
  hasBalcony: boolean;
  isFurnished: boolean;
  appliances: string[];
  utilities: string[];
  internetAvailable: boolean;
  internetSpeed?: number;
  address: string;
  city: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  marketPriceMonthly: number;
  discountedPriceMonthly: number;
  discountPercentage: number;
  deposit: number;
  utilitiesIncluded: boolean;
  estimatedUtilitiesCost?: number;
  availabilityStart: string;
  availabilityEnd: string;
  academicYear: string;
  currentStatus: 'available' | 'reserved' | 'occupied' | 'maintenance';
};

export type SearchFilters = {
  city?: string;
  university?: string;
  minPrice?: number;
  maxPrice?: number;
  rooms?: number;
  furnished?: boolean;
};
