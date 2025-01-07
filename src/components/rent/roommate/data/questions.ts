import { RoommateQuestion } from '../types/questions';

export const questions: RoommateQuestion[] = [
  {
    id: 1,
    text: "Would you rather walk barefoot on lava for 10 seconds or dive naked into freezing water in the North Pole for 10 minutes?",
    category: "Adventure",
    coinReward: 10,
    options: [
      {
        text: "Walk on lava",
        icon: "flame",
        trait: "Risk-Taker"
      },
      {
        text: "Dive into freezing water",
        icon: "snowflake",
        trait: "Resilient"
      }
    ],
    weight: 1
  },
  {
    id: 2,
    text: "Would you rather live in a treehouse in the jungle or a floating house in the ocean?",
    category: "Lifestyle",
    coinReward: 10,
    options: [
      {
        text: "Treehouse in the jungle",
        icon: "heart",
        trait: "Nature Lover"
      },
      {
        text: "Floating house in the ocean",
        icon: "star",
        trait: "Free Spirit"
      }
    ],
    weight: 1
  },
  {
    id: 3,
    text: "If you could instantly master any skill, would you choose music or languages?",
    category: "Creativity",
    coinReward: 15,
    isMystery: true,
    options: [
      {
        text: "Master all music",
        icon: "star",
        trait: "Artist"
      },
      {
        text: "Master all languages",
        icon: "user",
        trait: "Communicator"
      }
    ],
    weight: 1
  },
  {
    id: 4,
    text: "Would you rather have a personal chef or a personal housekeeper?",
    category: "Lifestyle",
    coinReward: 10,
    options: [
      {
        text: "Personal chef",
        icon: "star",
        trait: "Foodie"
      },
      {
        text: "Personal housekeeper",
        icon: "badge",
        trait: "Organized"
      }
    ],
    weight: 1
  },
  {
    id: 5,
    text: "Would you rather be able to teleport anywhere or read minds?",
    category: "Adventure",
    coinReward: 15,
    options: [
      {
        text: "Teleport anywhere",
        icon: "flame",
        trait: "Explorer"
      },
      {
        text: "Read minds",
        icon: "user",
        trait: "Empathetic"
      }
    ],
    weight: 1
  },
  {
    id: 6,
    text: "Would you rather host amazing parties or have intimate dinner gatherings?",
    category: "Social",
    coinReward: 10,
    options: [
      {
        text: "Amazing parties",
        icon: "star",
        trait: "Social Butterfly"
      },
      {
        text: "Intimate dinners",
        icon: "heart",
        trait: "Close-knit"
      }
    ],
    weight: 1
  },
  {
    id: 7,
    text: "Would you rather wake up at sunrise every day or stay up until midnight?",
    category: "Lifestyle",
    coinReward: 10,
    options: [
      {
        text: "Wake at sunrise",
        icon: "star",
        trait: "Early Bird"
      },
      {
        text: "Stay up late",
        icon: "snowflake",
        trait: "Night Owl"
      }
    ],
    weight: 1
  },
  {
    id: 8,
    text: "Would you rather have a pet dragon or a pet unicorn?",
    category: "Creativity",
    coinReward: 15,
    options: [
      {
        text: "Pet dragon",
        icon: "flame",
        trait: "Adventurous"
      },
      {
        text: "Pet unicorn",
        icon: "heart",
        trait: "Dreamer"
      }
    ],
    weight: 1
  },
  {
    id: 9,
    text: "Would you rather always have to sing instead of speak or always have to dance while walking?",
    category: "Creativity",
    coinReward: 10,
    options: [
      {
        text: "Always sing",
        icon: "star",
        trait: "Expressive"
      },
      {
        text: "Always dance",
        icon: "badge",
        trait: "Free-spirited"
      }
    ],
    weight: 1
  },
  {
    id: 10,
    text: "Would you rather have weekly game nights or movie marathons?",
    category: "Social",
    coinReward: 10,
    options: [
      {
        text: "Game nights",
        icon: "trophy",
        trait: "Competitive"
      },
      {
        text: "Movie marathons",
        icon: "star",
        trait: "Relaxed"
      }
    ],
    weight: 1
  }
];
