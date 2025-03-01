
import { StudentProperty } from './types';

export const mockStudentProperties: StudentProperty[] = [
  {
    id: "1",
    propertyId: "prop_1",
    title: "Modern Studio near Sapienza",
    description: "Cozy studio apartment perfect for students, fully renovated with modern amenities",
    images: ["https://images.unsplash.com/photo-1721322800607-8c38375eef04"],
    floorPlan: "https://example.com/floorplan1.jpg",
    virtualTour: "https://example.com/tour1",
    features: {
      size: 35,
      rooms: 1,
      bathrooms: 1,
      kitchen: true,
      livingRoom: true,
      balcony: true,
      furnished: true,
      appliances: ["Washing Machine", "Dishwasher", "Microwave"],
      utilities: ["Heating", "Water", "Electricity"],
      internet: {
        available: true,
        speed: 100
      }
    },
    location: {
      address: "Via degli Studi 123",
      city: "Roma",
      postalCode: "00185",
      coordinates: {
        lat: 41.9028,
        lng: 12.4964
      },
      publicTransport: [
        {
          type: "Metro",
          line: "Linea A",
          distance: 0.3
        }
      ],
      universities: [
        {
          name: "Sapienza",
          distance: 0.5,
          travelTime: 7
        }
      ]
    },
    pricing: {
      marketPriceMonthly: 1000,
      discountedPriceMonthly: 750,
      discountPercentage: 25,
      deposit: 750,
      utilities: {
        included: true,
        estimatedCost: 100
      },
      additionalFees: [
        {
          name: "Cleaning",
          amount: 50,
          frequency: "monthly"
        }
      ]
    },
    availabilityPeriod: {
      start: "2024-09-01",
      end: "2025-05-31"
    },
    academicYear: "2024-2025",
    currentStatus: "available"
  }
];
