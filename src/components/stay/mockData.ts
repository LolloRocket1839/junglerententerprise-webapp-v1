
import { TouristProperty } from './types';

export const mockProperties: TouristProperty[] = [
  {
    id: '1',
    title: 'Appartamento nel Centro di Roma',
    description: 'Splendido appartamento completamente ristrutturato nel cuore di Roma, a pochi passi dai principali monumenti.',
    short_description: 'Elegante appartamento nel centro storico',
    images: ['https://images.unsplash.com/photo-1487958449943-2429e8be8625'],
    amenities: ['Wi-Fi', 'Aria Condizionata', 'Camera Doppia', 'Terrazza'],
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    price_per_night: 95,
    cleaning_fee: 30,
    address: 'Via Sallustiana 10',
    city: 'Roma',
    postal_code: '00187',
    pets_allowed: false,
    smoking_allowed: false,
    parties_allowed: false,
    additional_rules: ['Check-in dalle 15:00', 'Check-out entro le 11:00'],
    rating: 4.8,
    reviews_count: 25
  },
  {
    id: '2',
    title: 'Appartamento Vicino Colosseo',
    description: 'Accogliente appartamento con vista diretta sul Colosseo, perfetto per brevi soggiorni estivi.',
    short_description: 'Vista mozzafiato sul Colosseo',
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb'],
    amenities: ['Wi-Fi', 'Aria Condizionata', 'Camera Singola', 'Vista Colosseo'],
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    price_per_night: 120,
    cleaning_fee: 35,
    address: 'Via Capo d\'Africa 15',
    city: 'Roma',
    postal_code: '00184',
    pets_allowed: false,
    smoking_allowed: false,
    parties_allowed: false,
    additional_rules: ['Silenzio dopo le 23:00', 'No feste'],
    rating: 4.9,
    reviews_count: 42
  }
];
