import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: {
    [key: string]: string;
  };
  coin_reward?: number;
}

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  isPremiumUser: boolean;
}

export const QuestionCard = ({ question, onAnswer, isPremiumUser }: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
      setSelectedAnswer(null);
    }
  };

  return (
    <Card className="p-6 glass-card space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-white">{question.question}</h3>
        {question.coin_reward && (
          <span className="text-sm text-primary">+{question.coin_reward} monete</span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Object.entries(question.options).map(([key, value]) => (
          <Button
            key={key}
            variant={selectedAnswer === key ? "default" : "outline"}
            className={`w-full justify-start text-left ${
              selectedAnswer === key ? "bg-primary text-white" : "hover:bg-primary/20"
            }`}
            onClick={() => setSelectedAnswer(key)}
          >
            {value}
          </Button>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className="bg-primary hover:bg-primary/90"
        >
          Conferma
        </Button>
      </div>
    </Card>
  );
};