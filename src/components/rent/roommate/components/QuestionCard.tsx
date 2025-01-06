import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock } from "lucide-react";
import { DynamicQuestion } from "../types/questions";

interface QuestionCardProps {
  question: DynamicQuestion;
  onAnswer: (answer: any) => void;
  isPremiumUser: boolean;
}

export const QuestionCard = ({ question, onAnswer, isPremiumUser }: QuestionCardProps) => {
  if (question.is_premium && !isPremiumUser) {
    return (
      <Card className="p-6 glass-card relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center space-y-4">
            <Lock className="w-8 h-8 text-primary mx-auto" />
            <p className="text-white/80">Unlock premium questions to get better matches!</p>
            <Button variant="premium" className="bg-gradient-to-r from-primary to-primary/80">
              Upgrade to Premium
            </Button>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-4">{question.question}</h3>
      </Card>
    );
  }

  const renderInput = () => {
    switch (question.type) {
      case 'select':
        return (
          <Select onValueChange={onAnswer}>
            <SelectTrigger className="glass-input">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'text':
      default:
        return (
          <Input
            className="glass-input"
            placeholder="Type your answer"
            onChange={(e) => onAnswer(e.target.value)}
          />
        );
    }
  };

  return (
    <Card className="p-6 glass-card">
      <h3 className="text-xl font-semibold text-white mb-4">{question.question}</h3>
      {renderInput()}
    </Card>
  );
};