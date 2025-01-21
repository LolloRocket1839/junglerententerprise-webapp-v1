import { MarketplaceItemType } from './types';

export const marketplaceItems: MarketplaceItemType[] = [
  {
    id: '1',
    name: 'MacBook Pro 2021',
    description: 'Eccellenti condizioni, poco utilizzato. Perfetto per studenti.',
    price: 1200,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    seller: {
      id: '1',
      name: 'Giovanni D.',
      rating: 4.5
    },
    createdAt: '2024-02-20'
  },
  {
    id: '2',
    name: 'Scrivania Studio',
    description: 'Scrivania robusta con cassetti. Perfetta per spazi piccoli.',
    price: 80,
    category: 'furniture',
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd',
    seller: {
      id: '2',
      name: 'Maria S.',
      rating: 4.8
    },
    createdAt: '2024-02-19'
  },
  {
    id: '3',
    name: 'Libri Informatica Bundle',
    description: 'Set completo di libri di CS per studenti del primo anno.',
    price: 150,
    category: 'textbooks',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6',
    seller: {
      id: '3',
      name: 'Alessandro K.',
      rating: 4.2
    },
    createdAt: '2024-02-18'
  },
  {
    id: '4',
    name: 'Tutoraggio Matematica',
    description: 'Lezioni private di matematica. Specializzazione in calcolo e algebra lineare.',
    price: 25,
    category: 'services',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173',
    seller: {
      id: '4',
      name: 'Sara M.',
      rating: 4.9
    },
    createdAt: '2024-02-17'
  },
  {
    id: '5',
    name: 'Designer Winter Coat',
    description: 'Cappotto invernale di design, taglia M, indossato pochissimo',
    price: 0,
    category: 'swap',
    imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3',
    seller: {
      id: '5',
      name: 'Emma S.',
      rating: 4.7
    },
    createdAt: '2024-02-16',
    lookingFor: 'Vestiti estivi o accessori'
  },
  {
    id: '6',
    name: 'Giacca in Pelle Vintage',
    description: 'Stile classico, ottime condizioni, taglia L',
    price: 0,
    category: 'swap',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5',
    seller: {
      id: '6',
      name: 'Marco R.',
      rating: 4.6
    },
    createdAt: '2024-02-15',
    lookingFor: 'Abbigliamento streetwear moderno'
  }
];