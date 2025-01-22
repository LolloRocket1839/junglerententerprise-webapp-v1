import { Property } from './types';

export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Casa Via Garibaldi',
    location: 'Via Giuseppe Garibaldi 45, Torino',
    description: 'Elegante appartamento storico nel cuore di Torino con soffitti affrescati e pavimenti in parquet originale',
    price_per_night: 180,
    amenities: ['Terrazza', 'Vista Palazzo', 'Ascensore', 'Aria Condizionata'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
    ],
    rating: 8.9,
    reviews_count: 28,
    investment_goal: 110000,
    amount_raised: 45000
  },
  {
    id: '2',
    name: 'Casa Via Roma',
    location: 'Via Roma 76, Torino',
    description: 'Lussuoso appartamento con vista sulla Piazza San Carlo e interni di design contemporaneo',
    price_per_night: 220,
    amenities: ['Vista Piazza', 'Garage', 'Palestra', 'Concierge'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab'
    ],
    rating: 9.2,
    reviews_count: 35,
    investment_goal: 140000,
    amount_raised: 82000
  },
  {
    id: '3',
    name: 'Casa Via Po',
    location: 'Via Po 20, Torino',
    description: 'Esclusivo appartamento con vista sulla Mole Antonelliana e portici storici',
    price_per_night: 300,
    amenities: ['Portici Storici', 'Vista Mole', 'Terrazza', 'Cantina'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0'
    ],
    rating: 9.5,
    reviews_count: 42,
    investment_goal: 135000,
    amount_raised: 120000
  },
  {
    id: '4',
    name: 'Casa Piazza Vittorio',
    location: 'Piazza Vittorio Veneto 197, Torino',
    description: 'Prestigioso attico con vista panoramica sulla piazza e sul fiume Po',
    price_per_night: 250,
    amenities: ['Terrazza Panoramica', 'Spa', 'Servizio in Camera', 'Cantina Vini'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600607687644-c94bf5588563'
    ],
    rating: 9.0,
    reviews_count: 31,
    investment_goal: 125000,
    amount_raised: 90000
  },
  {
    id: '5',
    name: 'Casa Via Pietro Micca',
    location: 'Via Pietro Micca 35, Torino',
    description: 'Elegante appartamento nel quartiere storico con soffitti alti e finestre ad arco',
    price_per_night: 190,
    amenities: ['Design Storico', 'Biblioteca', 'Cortile Interno', 'Biciclette'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d'
    ],
    rating: 8.7,
    reviews_count: 24,
    investment_goal: 115000,
    amount_raised: 60000
  },
  {
    id: '6',
    name: 'Casa Corso Vittorio',
    location: 'Corso Vittorio Emanuele II 127, Torino',
    description: 'Lussuoso appartamento vicino al Parco del Valentino con ampio soggiorno e vista sul parco',
    price_per_night: 210,
    amenities: ['Vista Parco', 'Balcone', 'Smart Home', 'Colazione Inclusa'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea'
    ],
    rating: 9.3,
    reviews_count: 39,
    investment_goal: 130000,
    amount_raised: 100000
  }
];