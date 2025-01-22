export type MarketplaceCategory = 'all' | 'furniture' | 'electronics' | 'textbooks' | 'services' | 'swap';

export interface MarketplaceItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MarketplaceCategory;
  image_url: string;
  seller: {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url?: string;
  };
  lookingFor?: string;
  created_at: string;
  updated_at: string;
}