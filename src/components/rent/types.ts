
export interface UniversityTransport {
  type: string;
  line: string;
  distance: number;
}

export interface UniversityProximity {
  name: string;
  distance: number;
  travelTime: number;
}

export interface PropertyFeatures {
  size: number;
  rooms: number;
  bathrooms: number;
  kitchen: boolean;
  livingRoom: boolean;
  balcony: boolean;
  furnished: boolean;
  appliances: string[];
  utilities: string[];
  internet: {
    available: boolean;
    speed: number;
  };
}

export interface PropertyLocation {
  address: string;
  city: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  publicTransport: UniversityTransport[];
  universities: UniversityProximity[];
}

export interface PropertyPricing {
  marketPriceMonthly: number;
  discountedPriceMonthly: number;
  discountPercentage: number;
  deposit: number;
  utilities: {
    included: boolean;
    estimatedCost: number;
  };
  additionalFees: Array<{
    name: string;
    amount: number;
    frequency: string;
  }>;
}

export type PropertyStatus = "available" | "reserved" | "occupied" | "maintenance";

export interface StudentProperty {
  id: string;
  propertyId: string;
  title: string;
  description: string;
  images: string[];
  floorPlan: string;
  virtualTour: string;
  features: PropertyFeatures;
  location: PropertyLocation;
  pricing: PropertyPricing;
  availabilityPeriod: {
    start: string;
    end: string;
  };
  academicYear: string;
  currentStatus: PropertyStatus;
}
