export interface RudolphQuestion {
  id: string;
  question: string;
  category: string;
  options: {
    text: string;
    dimension: string;
    value: number;
  }[];
  dimension_correlations?: {
    dimension: string;
    value: number;
  }[];
  information_gain?: number;
  complexity_level?: number;
  created_at?: string;
}

export interface RudolphProfile {
  [key: string]: number;
}

export interface RudolphUserDimension {
  dimension_id: string;
  score: number;
  profile_id: string;
}