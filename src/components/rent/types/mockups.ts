
export interface RoomMockup {
  id: string;
  name: string;
  price: number;
  size: string;
  image: string;
  description: string;
  furniture: string[];
  amenities: string[];
  availability: string;
  floorLevel: string;
  images: string[];
  contactPhone: string;  // Added this property
}

export interface StreetProperty {
  street: string;
  description: string;
  image: string;
  rooms: RoomMockup[];
  contactPhone: string;  // Added this property
}
