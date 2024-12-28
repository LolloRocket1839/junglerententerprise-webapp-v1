export interface RudolphQuestion {
  id: string;
  question: string;
  category: string;
  options: RudolphOption[];
  dimension_correlations?: DimensionCorrelation[];
  information_gain?: number;
  complexity_level?: number;
  created_at?: string;
}

export interface RudolphOption {
  text: string;
  value?: number;
  dimension_correlations?: DimensionCorrelation[];
}

export interface DimensionCorrelation {
  dimension: string;
  value: number;
}

export interface RudolphProfile {
  [key: string]: number;
}

export interface RudolphUserDimension {
  dimension_id: string;
  score: number;
  profile_id: string;
}

export interface IncomparableChoice {
  item_a: string;
  item_b: string;
  category: string;
}