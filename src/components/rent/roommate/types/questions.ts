export type QuestionIcon = "flame" | "snowflake" | "heart" | "star" | "user" | "badge" | "trophy";

export type QuestionCategory = "Lifestyle" | "Adventure" | "Creativity" | "Hypothetical" | "Relationships" | "Humor" | "Mystery";

export interface Question {
  id: number;
  text: string;
  category: QuestionCategory;
  isMystery?: boolean;
  coinReward: number;
  options: {
    text: string;
    icon: QuestionIcon;
    trait: string;
  }[];
  weight: number;
}