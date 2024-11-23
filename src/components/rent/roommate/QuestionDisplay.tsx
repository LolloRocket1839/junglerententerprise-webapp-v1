import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Trophy, Star, Brain, Coins } from 'lucide-react';
import { Question, QuestionIcon } from './types/questions';
import { useToast } from "@/components/ui/use-toast";

interface QuestionDisplayProps {
  question: Question;
  onAnswer: (answer: string, trait: string) => void;
  progress: number;
  streak: number;
  coins: number;
}

const QuestionDisplay = ({ question, onAnswer, progress, streak, coins }: QuestionDisplayProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(false);
  const { toast } = useToast();

  const handleAnswer = (option: { text: string; trait: string }) => {
    setSelectedAnswer(option.text);
    setTimeout(() => {
      onAnswer(option.text, option.trait);
      setSelectedAnswer(null);
      setShowStats(false);
    }, 1000);
    setShowStats(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Progress and Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="text-sm text-primary font-medium">
              {streak} Day Streak!
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-white/60">
              {coins} Coins
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <span className="text-sm text-white/60">
            Level: {Math.floor(progress / 10) + 1}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-white/60 text-right">{progress}% Complete</p>
      </div>

      {/* Question */}
      <div className="space-y-4">
        <div className="space-y-2">
          <span className="text-sm text-primary font-medium flex items-center gap-2">
            <Star className="h-4 w-4" />
            {question.category}
          </span>
          <h3 className="text-xl font-semibold text-white">
            {question.text}
          </h3>
        </div>

        {/* Options */}
        <div className="grid gap-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === option.text ? "default" : "outline"}
              className={`
                w-full justify-start text-left transition-all duration-300
                ${selectedAnswer === option.text ? 'bg-primary text-white scale-105' : 'hover:bg-primary/20 hover:text-primary'}
                ${showStats ? 'pointer-events-none' : ''}
                animate-scale-in
              `}
              onClick={() => handleAnswer(option)}
            >
              {option.text}
              <ArrowRight className="ml-auto h-4 w-4" />
            </Button>
          ))}
        </div>

        {/* Answer Stats */}
        {showStats && (
          <div className="p-4 bg-white/5 rounded-lg animate-fade-in">
            <p className="text-sm text-white/80">
              {Math.floor(Math.random() * 40 + 30)}% of users chose the same answer!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDisplay;