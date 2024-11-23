export type QuestionIcon = "flame" | "snowflake" | "heart" | "star" | "user" | "badge" | "trophy";

export interface Question {
  id: number;
  text: string;
  category: string;
  options: {
    text: string;
    icon: QuestionIcon;
    trait: string;
  }[];
  weight: number;
}