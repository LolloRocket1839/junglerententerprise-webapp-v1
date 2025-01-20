export interface DynamicQuestion {
  id: string;
  category_id: string | null;
  question: string;
  type: string;
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
  created_at: string;
}

export interface QuestionCategory {
  id: string;
  name: string;
  description?: string;
  is_premium: boolean;
  created_at: string;
}

export interface RoommateQuestion {
  id: string;
  text: string;
  category: string;
  coinReward: number;
  isMystery?: boolean;
  options: {
    text: string;
    trait: string;
  }[];
  weight: number;
}

export interface Question {
  id: string;
  question: string;
  options: {
    [key: string]: string;
  };
  coin_reward?: number;
}

export type QuestionType = 'text' | 'select' | 'multiselect' | 'slider';