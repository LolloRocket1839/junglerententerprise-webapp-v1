import { MarketplaceItemType } from './types';

export const marketplaceItems: MarketplaceItemType[] = [
  // Original items
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
  // Additional Electronics
  {
    id: '7',
    name: 'iPad Air 2022',
    description: 'iPad Air 5th gen, 64GB, Wi-Fi, perfetto per prendere appunti.',
    price: 550,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0',
    seller: {
      id: '7',
      name: 'Marco V.',
      rating: 4.7
    },
    createdAt: '2024-02-15'
  },
  {
    id: '8',
    name: 'Monitor 27" 4K',
    description: 'Monitor LG 27" 4K, perfetto per studio e gaming.',
    price: 300,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf',
    seller: {
      id: '8',
      name: 'Luca R.',
      rating: 4.6
    },
    createdAt: '2024-02-14'
  },
  // Language Courses
  {
    id: '9',
    name: 'Corso Intensivo di Francese',
    description: 'Lezioni private di francese, livello A1-B2. Insegnante madrelingua.',
    price: 25,
    category: 'services',
    imageUrl: 'https://images.unsplash.com/photo-1505902987837-9e40ec37e607',
    seller: {
      id: '9',
      name: 'Sophie L.',
      rating: 4.9
    },
    createdAt: '2024-02-13'
  },
  {
    id: '10',
    name: 'Corso di Tedesco Online',
    description: 'Lezioni di tedesco su Zoom, focus su conversazione e grammatica.',
    price: 20,
    category: 'services',
    imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d',
    seller: {
      id: '10',
      name: 'Hans M.',
      rating: 4.8
    },
    createdAt: '2024-02-12'
  },
  // Rooms
  {
    id: '11',
    name: 'Camera Singola Centro',
    description: 'Camera luminosa in appartamento condiviso, 5 min dalla metro.',
    price: 600,
    category: 'furniture',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
    seller: {
      id: '11',
      name: 'Anna F.',
      rating: 4.7
    },
    createdAt: '2024-02-11'
  },
  {
    id: '12',
    name: 'Posto Letto San Lorenzo',
    description: 'Posto letto in camera doppia, zona universitaria.',
    price: 350,
    category: 'furniture',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f',
    seller: {
      id: '12',
      name: 'Paolo G.',
      rating: 4.5
    },
    createdAt: '2024-02-10'
  },
  // Clothing Swaps
  {
    id: '13',
    name: 'Giacca Invernale North Face',
    description: 'Giacca invernale taglia L, usata solo una stagione',
    price: 0,
    category: 'swap',
    imageUrl: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a',
    seller: {
      id: '13',
      name: 'Chiara B.',
      rating: 4.8
    },
    createdAt: '2024-02-09',
    lookingFor: 'Giacca primaverile o zaino da trekking'
  },
  {
    id: '14',
    name: 'Sneakers Nike Air Max',
    description: 'Nike Air Max 270, numero 42, come nuove',
    price: 0,
    category: 'swap',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    seller: {
      id: '14',
      name: 'Federico M.',
      rating: 4.6
    },
    createdAt: '2024-02-08',
    lookingFor: 'Altre sneakers numero 42 o abbigliamento sportivo taglia L'
  },
  // More Electronics
  {
    id: '15',
    name: 'Cuffie Sony WH-1000XM4',
    description: 'Cuffie wireless con cancellazione del rumore, perfette per lo studio',
    price: 200,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90',
    seller: {
      id: '15',
      name: 'Roberto K.',
      rating: 4.7
    },
    createdAt: '2024-02-07'
  },
  {
    id: '16',
    name: 'Stampante HP LaserJet',
    description: 'Stampante laser bianco e nero, economica e affidabile',
    price: 120,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6',
    seller: {
      id: '16',
      name: 'Giulia P.',
      rating: 4.5
    },
    createdAt: '2024-02-06'
  }
];