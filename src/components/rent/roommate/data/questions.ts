import { Question } from '../QuestionPool';

export const questions: Question[] = [
  {
    id: 1,
    text: "What's your ideal way to spend a weekend?",
    category: "Lifestyle",
    options: [
      "Exploring the city and socializing",
      "Relaxing at home with movies/books",
      "Mix of social activities and alone time",
      "Outdoor activities and adventures",
      "Studying or working on projects"
    ],
    weight: 1
  },
  {
    id: 2,
    text: "When do you usually go to bed?",
    category: "Lifestyle",
    options: [
      "Before 10 PM",
      "Between 10 PM and midnight",
      "Between midnight and 2 AM",
      "After 2 AM",
      "Irregular schedule"
    ],
    weight: 1
  },
  {
    id: 3,
    text: "How do you prefer to handle shared spaces?",
    category: "Housing",
    options: [
      "Strict cleaning schedule",
      "Clean as needed, but regularly",
      "Clean when it gets noticeably dirty",
      "Hire cleaning service",
      "Flexible approach"
    ],
    weight: 1.5
  },
  // Add more questions here...
];