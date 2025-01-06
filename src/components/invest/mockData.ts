import { Property } from './types';

export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Palazzo Madama Suite',
    location: 'Via Roma 18, Torino',
    description: 'Elegante appartamento storico nel cuore di Torino',
    price_per_night: 180,
    amenities: ['Terrazza', 'Vista Palazzo', 'Ascensore', 'Aria Condizionata'],
    images: ['https://images.unsplash.com/photo-1577975882846-431adc8c2009'],
    rating: 8.9,
    reviews_count: 28
  },
  {
    id: '2',
    name: 'Residenza Po',
    location: 'Corso Vittorio Emanuele II 76, Torino',
    description: 'Lussuoso appartamento con vista sul fiume Po',
    price_per_night: 220,
    amenities: ['Vista Fiume', 'Garage', 'Palestra', 'Concierge'],
    images: ['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd'],
    rating: 9.2,
    reviews_count: 35
  },
  {
    id: '3',
    name: 'Villa della Mole',
    location: 'Via Montebello 20, Torino',
    description: 'Esclusiva villa con vista sulla Mole Antonelliana',
    price_per_night: 300,
    amenities: ['Giardino Privato', 'Vista Mole', 'Piscina', 'Sauna'],
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'],
    rating: 9.5,
    reviews_count: 42
  },
  {
    id: '4',
    name: 'Attico San Carlo',
    location: 'Piazza San Carlo 197, Torino',
    description: 'Prestigioso attico nel salotto di Torino',
    price_per_night: 250,
    amenities: ['Terrazza Panoramica', 'Spa', 'Servizio in Camera', 'Wine Cellar'],
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'],
    rating: 9.0,
    reviews_count: 31
  },
  {
    id: '5',
    name: 'Residenza Quadrilatero',
    location: 'Via Maria Vittoria 35, Torino',
    description: 'Elegante appartamento nel quartiere romano',
    price_per_night: 190,
    amenities: ['Design Storico', 'Biblioteca', 'Cortile Interno', 'Biciclette'],
    images: ['https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b'],
    rating: 8.7,
    reviews_count: 24
  },
  {
    id: '6',
    name: 'Suite Valentino',
    location: 'Corso Vittorio Emanuele II 127, Torino',
    description: 'Lussuoso appartamento vicino al Parco del Valentino',
    price_per_night: 210,
    amenities: ['Vista Parco', 'Balcone', 'Smart Home', 'Colazione Inclusa'],
    images: ['https://images.unsplash.com/photo-1600585154526-990dced4db0d'],
    rating: 9.3,
    reviews_count: 39
  }
];