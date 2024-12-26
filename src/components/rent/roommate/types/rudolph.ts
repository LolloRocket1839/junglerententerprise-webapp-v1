export interface RudolphQuestion {
  id: string;
  question: string;
  category: string;
  options: RudolphOption[];
  dimension_correlations?: DimensionCorrelation[];
  information_gain?: number;
  complexity_level?: number;
}

export interface RudolphOption {
  text: string;
  dimension_correlations: DimensionCorrelation[];
}

export interface DimensionCorrelation {
  dimension: string;
  value: number;
}

export interface RudolphDimension {
  id: string;
  name: string;
  description: string;
  min_value: number;
  max_value: number;
}

export interface UserDimensionScore {
  dimension_id: string;
  score: number;
  uncertainty?: number;
}