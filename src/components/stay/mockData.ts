
import { Property } from './types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Appartamento nel Centro di Roma',
    location: 'Via Sallustiana, Roma',
    price: 95,
    rating: 4.8,
    features: ['Wi-Fi', 'Aria Condizionata', 'Camera Doppia', 'Terrazza'],
    description: 'Splendido appartamento completamente ristrutturato nel cuore di Roma, a pochi passi dai principali monumenti.',
    imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625'
  },
  {
    id: '2',
    title: 'Appartamento Vicino Colosseo',
    location: 'Via Capo d\'Africa, Roma',
    price: 120,
    rating: 4.9,
    features: ['Wi-Fi', 'Aria Condizionata', 'Camera Singola', 'Vista Colosseo'],
    description: 'Accogliente appartamento con vista diretta sul Colosseo, perfetto per brevi soggiorni estivi.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
  }
];
