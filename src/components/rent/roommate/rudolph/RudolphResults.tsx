import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Star } from 'lucide-react';

interface RudolphResultsProps {
  scores: Record<string, number>;
}

const RudolphResults = ({ scores }: RudolphResultsProps) => {
  const getDimensionLabel = (dimension: string) => {
    const labels: Record<string, string> = {
      extroversion: "Extroversion",
      conscientiousness: "Conscientiousness",
      openness: "Openness",
      agreeableness: "Agreeableness",
      neuroticism: "Emotional Stability"
    };
    return labels[dimension] || dimension;
  };

  const getScoreDescription = (score: number) => {
    if (score > 7) return "Very High";
    if (score > 5) return "High";
    if (score > 3) return "Moderate";
    if (score > 1) return "Low";
    return "Very Low";
  };

  return (
    <Card className="p-6 animate-fade-in">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-white">Your Personality Profile</h2>
        </div>

        <div className="grid gap-4">
          {Object.entries(scores).map(([dimension, score]) => (
            <div key={dimension} className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span className="font-medium text-white">
                    {getDimensionLabel(dimension)}
                  </span>
                </div>
                <span className="text-sm text-primary">
                  {getScoreDescription(score)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Button 
          className="w-full"
          onClick={() => window.location.reload()}
        >
          Take the Test Again
        </Button>
      </div>
    </Card>
  );
};

export default RudolphResults;