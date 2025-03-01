
import React from 'react';
import { PropertyCard } from '@/components/rent/PropertyCard';
import { StudentProperty } from '@/types/rental';

const mockRooms: StudentProperty[] = [
  {
    id: '1',
    title: 'Camera Singola San Salvario',
    description: 'Ampia camera singola in appartamento condiviso, zona San Salvario. Vicino al Politecnico. Coinquilini studenti.',
    address: 'Via Madama Cristina 45',
    city: 'Torino',
    size_sqm: 15,
    rooms: 1,
    bathrooms: 1,
    has_kitchen: true,
    has_living_room: true,
    has_balcony: false,
    is_furnished: true,
    appliances: ['Lavatrice', 'Lavastoviglie'],
    utilities: ['Riscaldamento', 'Internet'],
    internet_available: true,
    internet_speed: 100,
    market_price_monthly: 450,
    discounted_price_monthly: 450,
    deposit_amount: 900,
    utilities_included: true,
    images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af'],
    academic_year: '2024-2025',
    current_status: 'available',
    availability_start: '2024-09-01T00:00:00Z',
    availability_end: '2025-07-31T00:00:00Z',
    postal_code: '10125',
    latitude: 45.0578,
    longitude: 7.6828
  },
  {
    id: '2',
    title: 'Posto Letto Vanchiglia',
    description: 'Posto letto in camera doppia, quartiere Vanchiglia. Appartamento completamente arredato con cucina e WiFi.',
    address: 'Via Buniva 12',
    city: 'Torino',
    size_sqm: 20,
    rooms: 1,
    bathrooms: 1,
    has_kitchen: true,
    has_living_room: true,
    has_balcony: true,
    is_furnished: true,
    appliances: ['Lavatrice'],
    utilities: ['Internet', 'Acqua calda'],
    internet_available: true,
    internet_speed: 50,
    market_price_monthly: 300,
    discounted_price_monthly: 300,
    deposit_amount: 600,
    utilities_included: true,
    images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f'],
    academic_year: '2024-2025',
    current_status: 'available',
    availability_start: '2024-09-01T00:00:00Z',
    availability_end: '2025-07-31T00:00:00Z',
    postal_code: '10153',
    latitude: 45.0701,
    longitude: 7.6947
  },
  {
    id: '3',
    title: 'Camera Singola Centro',
    description: 'Camera singola in pieno centro, 5 minuti a piedi da Porta Nuova. Appartamento ristrutturato con tutti i comfort.',
    address: 'Via Roma 78',
    city: 'Torino',
    size_sqm: 18,
    rooms: 1,
    bathrooms: 1,
    has_kitchen: true,
    has_living_room: true,
    has_balcony: false,
    is_furnished: true,
    appliances: ['Lavatrice', 'Lavastoviglie', 'Microonde'],
    utilities: ['Internet', 'Riscaldamento'],
    internet_available: true,
    internet_speed: 100,
    market_price_monthly: 500,
    discounted_price_monthly: 500,
    deposit_amount: 1000,
    utilities_included: true,
    images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457'],
    academic_year: '2024-2025',
    current_status: 'available',
    availability_start: '2024-09-01T00:00:00Z',
    availability_end: '2025-07-31T00:00:00Z',
    postal_code: '10123',
    latitude: 45.0703,
    longitude: 7.6869
  }
];

const Rent = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 gradient-text">Affitto per Studenti a Torino</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockRooms.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onSelect={(property) => {
              console.log('Property selected:', property);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Rent;
