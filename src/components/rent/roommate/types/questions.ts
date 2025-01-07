export interface Question {
  id: string;
  text: string;
  category: string;
  coinReward: number;
  isMystery?: boolean;
  options: {
    text: string;
    icon: string;
    trait: string;
  }[];
  weight: number;
}

export interface DynamicQuestion {
  id: string;
  question: string;
  type: QuestionType;
  category_id: string;
  options?: {
    text: string;
    value: string;
  }[];
  follow_up_logic?: {
    if: string;
    then: string[];
  };
  is_premium: boolean;
  weight: number;
}

export interface QuestionCategory {
  id: string;
  name: string;
  description?: string;
  is_premium: boolean;
}

export type QuestionType = 'text' | 'select' | 'multiselect' | 'slider';