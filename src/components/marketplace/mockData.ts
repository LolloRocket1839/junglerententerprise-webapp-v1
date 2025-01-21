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
  {
    id: '13',
    name: 'Giacca Invernale North Face',
    description: 'Giacca invernale taglia L, usata solo una stagione',
    price: 0,
    category: 'swap',
    imageUrl: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44d',
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
  },
  {
    id: '17',
    name: 'Scambio Camera Singola Trastevere',
    description: 'Camera singola in Trastevere, cerco scambio con zona San Giovanni o Prati. Disponibile da Marzo.',
    price: 0,
    category: 'swap',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
    seller: {
      id: '17',
      name: 'Marco B.',
      rating: 4.8
    },
    createdAt: '2024-02-05',
    lookingFor: 'Camera singola in San Giovanni o Prati'
  },
  {
    id: '18',
    name: 'Scambio Biglietto Treno Roma-Milano',
    description: 'Biglietto Frecciarossa Roma-Milano 15 Marzo ore 9:00, cerco stesso treno il 16 o 17 Marzo',
    price: 0,
    category: 'swap',
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3',
    seller: {
      id: '18',
      name: 'Laura M.',
      rating: 4.7
    },
    createdAt: '2024-02-04',
    lookingFor: 'Biglietto stesso tratto 16-17 Marzo'
  },
  {
    id: '19',
    name: 'Scambio Italo Roma-Firenze',
    description: 'Biglietto Italo Roma-Firenze 20 Marzo mattina, cerco scambio con 21 o 22 Marzo',
    price: 0,
    category: 'swap',
    imageUrl: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6',
    seller: {
      id: '19',
      name: 'Paolo R.',
      rating: 4.6
    },
    createdAt: '2024-02-03',
    lookingFor: 'Biglietto stesso tratto 21-22 Marzo'
  },
  {
    id: '20',
    name: 'Scambio 2 Biglietti Cinema Dune 2',
    description: '2 biglietti per Dune 2 al The Space Cinema EUR, Sabato 16 Marzo ore 21:00',
    price: 0,
    category: 'swap',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba',
    seller: {
      id: '20',
      name: 'Sofia G.',
      rating: 4.9
    },
    createdAt: '2024-02-02',
    lookingFor: 'Biglietti per lo stesso film in altro giorno/orario'
  },
  {
    id: '21',
    name: 'Scambio Biglietti Teatro',
    description: 'Due biglietti per "Romeo e Giulietta" al Teatro Argentina, 25 Marzo',
    price: 0,
    category: 'swap',
    imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35',
    seller: {
      id: '21',
      name: 'Chiara T.',
      rating: 4.7
    },
    createdAt: '2024-01-31',
    lookingFor: 'Biglietti per altro spettacolo teatrale'
  },
  {
    id: '22',
    name: 'Scambio Libri Universitari Economia',
    description: 'Libri di Microeconomia e Macroeconomia, ottime condizioni',
    price: 0,
    category: 'swap',
    imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d',
    seller: {
      id: '22',
      name: 'Andrea F.',
      rating: 4.8
    },
    createdAt: '2024-01-30',
    lookingFor: 'Libri di Statistica o Marketing'
  },
  {
    id: '23',
    name: 'Scambio Biglietto Concerto',
    description: 'Biglietto per concerto dei Coldplay, Stadio Olimpico 16 Luglio',
    price: 0,
    category: 'swap',
    imageUrl: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec',
    seller: {
      id: '23',
      name: 'Matteo N.',
      rating: 4.7
    },
    createdAt: '2024-01-29',
    lookingFor: 'Biglietto per la data del 17 Luglio'
  },
  {
    id: '24',
    name: 'Scambio Posto Auto',
    description: 'Posto auto coperto zona Prati, disponibile per scambio mensile',
    price: 0,
    category: 'swap',
    imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a',
    seller: {
      id: '24',
      name: 'Roberto M.',
      rating: 4.6
    },
    createdAt: '2024-01-28',
    lookingFor: 'Posto auto zona Flaminio o Centro'
  }
];
