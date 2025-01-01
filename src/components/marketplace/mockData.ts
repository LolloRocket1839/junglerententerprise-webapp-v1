import { MarketplaceItemType } from './types';

export const mockItems: MarketplaceItemType[] = [
  {
    id: '1',
    name: 'MacBook Pro 2021',
    description: 'Excellent condition, barely used. Perfect for students.',
    price: 1200,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    seller: {
      id: '1',
      name: 'John D.',
      rating: 4.5
    },
    createdAt: '2024-02-20'
  },
  {
    id: '2',
    name: 'Study Desk',
    description: 'Sturdy desk with drawer storage. Perfect for small spaces.',
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
    name: 'Computer Science Textbooks Bundle',
    description: 'Complete set of CS textbooks for first-year students.',
    price: 150,
    category: 'textbooks',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6',
    seller: {
      id: '3',
      name: 'Alex K.',
      rating: 4.2
    },
    createdAt: '2024-02-18'
  },
  {
    id: '4',
    name: 'Math Tutoring',
    description: 'Private math tutoring sessions. Specializing in calculus and linear algebra.',
    price: 25,
    category: 'services',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173',
    seller: {
      id: '4',
      name: 'Sarah M.',
      rating: 4.9
    },
    createdAt: '2024-02-17'
  },
  {
    id: '5',
    name: 'Photography Service',
    description: 'Professional headshots and portfolio pictures for students.',
    price: 50,
    category: 'services',
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e',
    seller: {
      id: '5',
      name: 'Mike R.',
      rating: 4.7
    },
    createdAt: '2024-02-16'
  },
  {
    id: '6',
    name: 'Language Exchange',
    description: 'Spanish-English language exchange sessions. 1 hour each way.',
    price: 0,
    category: 'services',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    seller: {
      id: '6',
      name: 'Carlos P.',
      rating: 4.6
    },
    createdAt: '2024-02-15'
  },
  {
    id: '7',
    name: 'Resume Review',
    description: 'Professional resume review and optimization for job applications.',
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
