import { MarketplaceItemType } from './types';

export const mockItems: MarketplaceItemType[] = [
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
    name: 'Servizio Fotografico',
    description: 'Foto professionali e portfolio per studenti.',
    price: 50,
    category: 'services',
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e',
    seller: {
      id: '5',
      name: 'Michele R.',
      rating: 4.7
    },
    createdAt: '2024-02-16'
  },
  {
    id: '6',
    name: 'Scambio Linguistico',
    description: 'Sessioni di scambio spagnolo-italiano. 1 ora ciascuno.',
    price: 0,
    category: 'services',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    seller: {
      id: '6',
      name: 'Carlo P.',
      rating: 4.6
    },
    createdAt: '2024-02-15'
  },
  {
    id: '7',
    name: 'Revisione CV',
    description: 'Revisione professionale del curriculum per candidature di lavoro.',
    price: 30,
    category: 'services',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4',
    seller: {
      id: '7',
      name: 'Emma L.',
      rating: 4.8
    },
    createdAt: '2024-02-14'
  }
];