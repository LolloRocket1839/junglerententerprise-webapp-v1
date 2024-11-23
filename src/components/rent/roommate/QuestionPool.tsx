import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Save } from 'lucide-react';
import { storeResponse, getStoredResponses } from './utils/storageUtils';
import { questions } from './data/questions';

export interface Question {
  id: number;
  text: string;
  category: string;
  options: string[];
  weight: number;
}

const QuestionPool = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadNextQuestion();
  }, []);

  const loadNextQuestion = () => {
    const unansweredQuestions = questions.filter(q => !answeredQuestions.includes(q.id));
    if (unansweredQuestions.length === 0) {
      toast({
        title: "All questions completed!",
        description: "Your responses have been saved. Check your matches!",
      });
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
    setCurrentQuestion(unansweredQuestions[randomIndex]);
  };

  const handleAnswer = async (answer: string) => {
    if (!currentQuestion) return;

    try {
      await storeResponse(currentQuestion.id, answer);
      setAnsweredQuestions(prev => [...prev, currentQuestion.id]);
      toast({
        title: "Response saved!",
        description: "Moving to next question...",
      });
      loadNextQuestion();
    } catch (error) {
      toast({
        title: "Error saving response",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-white/60">Loading question...</p>
      </div>
    );
  }

  return (
    <Card className="p-6 animate-fade-in bg-white/5 backdrop-blur-sm border-white/10">
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-sm text-primary font-medium">
            {currentQuestion.category}
          </span>
          <h3 className="text-xl font-semibold text-white">
            {currentQuestion.text}
          </h3>
        </div>

        <div className="grid gap-3">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start text-left hover:bg-primary/20 hover:text-primary"
              onClick={() => handleAnswer(option)}
            >
              {option}
              <ArrowRight className="ml-auto h-4 w-4" />
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-sm text-white/60">
            {answeredQuestions.length} questions answered
          </span>
          <Button
            variant="outline"
            size="sm"
            className="text-primary border-primary/20"
            onClick={() => {
              toast({
                title: "Progress saved",
                description: "Your responses have been stored locally",
              });
            }}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Progress
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default QuestionPool;