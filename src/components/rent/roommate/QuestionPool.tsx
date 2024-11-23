import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Save, Coins } from 'lucide-react';
import { storeResponse, getStoredResponses } from './utils/storageUtils';
import { questions } from './data/questions';
import QuestionDisplay from './QuestionDisplay';
import FreeformAnswer from './FreeformAnswer';
import SystemOverview from './SystemOverview';

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
  const [jungleCoins, setJungleCoins] = useState(0);
  const [customAnswer, setCustomAnswer] = useState("");
  const [freeformAnswer, setFreeformAnswer] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadNextQuestion();
    const savedCoins = localStorage.getItem('jungleCoins');
    if (savedCoins) {
      setJungleCoins(parseInt(savedCoins));
    }
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
    setFreeformAnswer("");
  };

  const updateJungleCoins = (amount: number) => {
    const newTotal = jungleCoins + amount;
    setJungleCoins(newTotal);
    localStorage.setItem('jungleCoins', newTotal.toString());
    toast({
      title: `+${amount} Jungle Coins!`,
      description: `New balance: ${newTotal} coins`,
    });
  };

  const handleAnswer = async (answer: string) => {
    if (!currentQuestion) return;
    await storeResponse(currentQuestion.id, answer);
    setAnsweredQuestions(prev => {
      const newAnswered = [...prev, currentQuestion.id];
      if (newAnswered.length % 4 === 0) {
        updateJungleCoins(1);
      }
      return newAnswered;
    });
    
    toast({
      title: "Response saved!",
      description: "Moving to next question...",
    });
    loadNextQuestion();
  };

  const handleFreeformAnswer = async () => {
    if (!currentQuestion || !freeformAnswer.trim()) return;
    await storeResponse(currentQuestion.id, freeformAnswer);
    updateJungleCoins(2);
    setAnsweredQuestions(prev => [...prev, currentQuestion.id]);
    
    toast({
      title: "Creative response saved!",
      description: "You earned 2 Jungle Coins for your detailed answer.",
    });
    
    loadNextQuestion();
  };

  return (
    <div className="space-y-6">
      <SystemOverview />
      
      <Card className="p-6 animate-fade-in bg-white/5 backdrop-blur-sm border-white/10">
        {currentQuestion ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <QuestionDisplay 
                question={currentQuestion}
                onAnswer={handleAnswer}
              />
              <div className="flex items-center gap-2 text-primary">
                <Coins className="h-5 w-5" />
                <span className="font-semibold">{jungleCoins}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <FreeformAnswer
                value={freeformAnswer}
                onChange={setFreeformAnswer}
                onSubmit={handleFreeformAnswer}
              />
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
        ) : (
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-white/60">Loading question...</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default QuestionPool;