export interface Neuron {
  id: string;
  tags: string[];
  weight: number;
  connections: string[];
  profile_id?: string;
  created_at?: string;
  position?: {
    x: number;
    y: number;
    z: number;
  };
}

export interface NeuralResponse {
  answer: string;
  tags: string[];
  weight: number;
}