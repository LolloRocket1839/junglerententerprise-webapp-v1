import { MarketplaceItemType } from './types';

export const mockItems: MarketplaceItemType[] = [
  {
    id: '1',
    name: 'Modern Study Desk',
    description: 'Perfect for students! Spacious desk with built-in storage.',
    price: 150,
    category: 'furniture',
    image_url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80',
    seller: {
      id: 'seller1',
      first_name: 'Marco',
      last_name: 'Rossi',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marco'
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'MacBook Pro 2021',
    description: 'Excellent condition, perfect for development and design work.',
    price: 1200,
    category: 'electronics',
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80',
    seller: {
      id: 'seller2',
      first_name: 'Sofia',
      last_name: 'Bianchi',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia'
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Italian Language Textbooks',
    description: 'Complete set of Italian language learning materials, levels A1-B2',
    price: 80,
    category: 'textbooks',
    image_url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80',
    seller: {
      id: 'seller3',
      first_name: 'Luca',
      last_name: 'Verdi',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luca'
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Italian Cooking Lessons',
    description: 'Learn authentic Italian cooking from a native chef!',
    price: 45,
    category: 'services',
    image_url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80',
    seller: {
      id: 'seller4',
      first_name: 'Giuseppe',
      last_name: 'Conti',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Giuseppe'
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Vintage Bicycle',
    description: 'Looking to swap my vintage bicycle for a modern electric scooter',
    price: 0,
    category: 'swap',
    image_url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80',
    seller: {
      id: 'seller5',
      first_name: 'Elena',
      last_name: 'Romano',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena'
    },
    lookingFor: 'Electric Scooter',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];