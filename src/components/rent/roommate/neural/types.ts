export interface InterestNode {
  id: string;
  tags: string[];
  weight: number;
  connections: string[];
  profile_id?: string;
  position?: {
    x: number;
    y: number;
    z: number;
  };
}