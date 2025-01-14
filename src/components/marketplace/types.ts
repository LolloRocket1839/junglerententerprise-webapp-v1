export type MarketplaceCategory = 'furniture' | 'electronics' | 'textbooks' | 'services' | 'all';

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
}