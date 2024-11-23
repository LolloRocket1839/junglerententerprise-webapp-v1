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
  {
    id: 4,
    text: "What's your favorite time of day and why?",
    category: "Personality",
    options: [
      "Morning - I love fresh starts",
      "Afternoon - Peak productivity time",
      "Evening - Perfect for relaxation",
      "Night - Peace and quiet",
      "No preference - I'm flexible"
    ],
    weight: 1
  },
  {
    id: 5,
    text: "Are you more of a morning person or a night owl?",
    category: "Lifestyle",
    options: [
      "Definitely a morning person",
      "More productive in the morning",
      "More active in the evening",
      "Complete night owl",
      "Depends on my schedule"
    ],
    weight: 1.2
  },
  {
    id: 6,
    text: "What's your preferred cuisine?",
    category: "Lifestyle",
    options: [
      "Italian",
      "Asian",
      "Mexican",
      "Mediterranean",
      "I enjoy trying everything"
    ],
    weight: 1
  },
  {
    id: 7,
    text: "Do you prefer beaches or mountains for a getaway?",
    category: "Personality",
    options: [
      "Definitely beaches",
      "Mountains all the way",
      "Both equally",
      "Neither - I prefer cities",
      "Depends on the season"
    ],
    weight: 1
  },
  {
    id: 8,
    text: "Are you more spontaneous or a planner?",
    category: "Personality",
    options: [
      "Very spontaneous",
      "Mostly spontaneous with some planning",
      "Balance of both",
      "Usually plan things out",
      "Detailed planner"
    ],
    weight: 1.5
  },
  {
    id: 9,
    text: "What's your ideal way to spend a lazy Sunday?",
    category: "Lifestyle",
    options: [
      "Binge-watching shows/movies",
      "Reading and relaxing",
      "Cooking or baking",
      "Going for walks or light activities",
      "Catching up with friends"
    ],
    weight: 1
  },
  {
    id: 10,
    text: "Do you prefer working from home or going to campus/office?",
    category: "Lifestyle",
    options: [
      "Strongly prefer working from home",
      "Mix of both, but more home",
      "Equal mix of both",
      "Mix of both, but more outside",
      "Strongly prefer going out"
    ],
    weight: 1.3
  }
];
