import { InterestNode } from "./types";

const possibleTags = [
  "adventure", "serenity", "social", "introspection",
  "fun", "learning", "chill", "active", "creative",
  "organized", "spontaneous", "quiet", "energetic",
  "focused", "flexible", "traditional", "innovative"
];

function getRandomTags(count: number): string[] {
  const shuffled = [...possibleTags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function parseAnswerToTags(answer: string): string[] {
  const lowerAnswer = answer.toLowerCase();
  
  if (lowerAnswer.includes("party") || lowerAnswer.includes("social")) {
    return ["social", "energetic", ...getRandomTags(1)];
  }
  if (lowerAnswer.includes("quiet") || lowerAnswer.includes("alone")) {
    return ["quiet", "introspection", ...getRandomTags(1)];
  }
  if (lowerAnswer.includes("organize") || lowerAnswer.includes("plan")) {
    return ["organized", "focused", ...getRandomTags(1)];
  }
  if (lowerAnswer.includes("spontaneous") || lowerAnswer.includes("adventure")) {
    return ["spontaneous", "adventure", ...getRandomTags(1)];
  }
  
  return getRandomTags(3);
}

export function createNeuronFromAnswer(answer: string, profileId?: string): InterestNode {
  const tags = parseAnswerToTags(answer);
  return {
    id: crypto.randomUUID(),
    tags,
    weight: 1,
    connections: [],
    profile_id: profileId,
    position: {
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      z: Math.random() * 100 - 50
    }
  };
}