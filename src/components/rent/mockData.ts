
import { StudentProperty } from './types';

export const mockStudentProperties: StudentProperty[] = [
  {
    id: "1",
    title: "Modern Studio near Sapienza",
    description: "Cozy studio apartment perfect for students, fully renovated with modern amenities",
    images: ["https://images.unsplash.com/photo-1721322800607-8c38375eef04"],
    floor_plan_url: "https://example.com/floorplan1.jpg",
    virtual_tour_url: "https://example.com/tour1",
    size_sqm: 35,
    rooms: 1,
    bathrooms: 1,
    has_kitchen: true,
    has_living_room: true,
    has_balcony: true,
    is_furnished: true,
    appliances: ["Washing Machine", "Dishwasher", "Microwave"],
    utilities: ["Heating", "Water", "Electricity"],
    internet_available: true,
    internet_speed: 100,
    address: "Via degli Studi 123",
    city: "Roma",
    postal_code: "00185",
    latitude: 41.9028,
    longitude: 12.4964,
    market_price_monthly: 1000,
    discounted_price_monthly: 750,
    discount_percentage: 25,
    deposit_amount: 750,
    utilities_included: true,
    estimated_utilities_cost: 100,
    availability_start: "2024-09-01",
    availability_end: "2025-05-31",
    academic_year: "2024-2025",
    current_status: "available"
  }
];
