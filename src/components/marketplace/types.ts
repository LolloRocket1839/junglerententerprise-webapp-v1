export type MarketplaceCategory = 'furniture' | 'electronics' | 'textbooks' | 'services' | 'all' | 'swap';

export interface MarketplaceItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MarketplaceCategory;
  image_url: string;
  seller_id: string;
  created_at: string;
  seller: {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url?: string;
  };
  lookingFor?: string;
}