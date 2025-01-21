export type MarketplaceCategory = 'furniture' | 'electronics' | 'textbooks' | 'services' | 'all' | 'swap';

export interface MarketplaceItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MarketplaceCategory;
  imageUrl: string;
  seller: {
    id: string;
    name: string;
    rating: number;
  };
  createdAt: string;
  lookingFor?: string;
}