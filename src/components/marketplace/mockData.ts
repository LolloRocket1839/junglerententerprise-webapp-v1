import { MarketplaceItemType } from './types';

export const mockItems: MarketplaceItemType[] = [
  {
    id: '1',
    name: 'Study Desk',
    description: 'Perfect condition study desk, great for small spaces',
    price: 75,
    category: 'furniture',
    image_url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500',
    seller: {
      id: '1',
      first_name: 'Marco',
      last_name: 'Rossi',
      avatar_url: 'https://i.pravatar.cc/150?u=1'
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'MacBook Pro 2021',
    description: 'Excellent condition, M1 chip, 16GB RAM',
    price: 1200,
    category: 'electronics',
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    seller: {
      id: '2',
      first_name: 'Sofia',
      last_name: 'Chen',
      avatar_url: 'https://i.pravatar.cc/150?u=2'
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Calculus Textbook',
    description: 'Like new, includes online access code',
    price: 45,
    category: 'textbooks',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
    seller: {
      id: '3',
      first_name: 'Alex',
      last_name: 'Johnson',
      avatar_url: 'https://i.pravatar.cc/150?u=3'
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Guitar Lessons',
    description: 'Offering beginner to intermediate guitar lessons',
    price: 25,
    category: 'services',
    image_url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500',
    seller: {
      id: '4',
      first_name: 'Maria',
      last_name: 'Garcia',
      avatar_url: 'https://i.pravatar.cc/150?u=4'
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Gaming Monitor',
    lookingFor: 'Mechanical Keyboard',
    description: '27" 144Hz Gaming Monitor - looking to swap',
    price: 0,
    category: 'swap',
    image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
    seller: {
      id: '5',
      first_name: 'David',
      last_name: 'Kim',
      avatar_url: 'https://i.pravatar.cc/150?u=5'
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];