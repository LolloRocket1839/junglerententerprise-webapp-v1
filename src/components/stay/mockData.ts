
import { TouristProperty } from './types';

export const mockProperties: TouristProperty[] = [
  {
    id: '1',
    property_id: 'prop_1',
    title: 'Appartamento nel Centro di Roma',
    description: 'Splendido appartamento completamente ristrutturato nel cuore di Roma, a pochi passi dai principali monumenti.',
    short_description: 'Elegante appartamento nel centro storico',
    images: ['https://images.unsplash.com/photo-1487958449943-2429e8be8625'],
    amenities: ['Wi-Fi', 'Aria Condizionata', 'Cucina', 'TV'],
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    price_per_night: 150,
    cleaning_fee: 50,
    availability_period: {
      start: '2024-06-01',
      end: '2024-08-31'
    },
    location: {
      address: 'Via del Corso 123',
      city: 'Roma',
      postal_code: '00186',
      coordinates: {
        lat: 41.9028,
        lng: 12.4964
      }
    },
    points_of_interest: [
      {
        name: 'Fontana di Trevi',
        distance: 0.5,
        type: 'attraction'
      },
      {
        name: 'Pantheon',
        distance: 0.8,
        type: 'monument'
      }
    ],
    rules: {
      check_in_time: '15:00',
      check_out_time: '11:00',
      pets_allowed: false,
      smoking_allowed: false,
      parties_allowed: false,
      additional_rules: [
        'No rumore dopo le 23:00',
        'No scarpe in casa'
      ]
    },
    rating: 4.8
  }
];
