import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Save, Coins, Trophy } from 'lucide-react';
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
  const [streak, setStreak] = useState(0);
  const [lastAnswered, setLastAnswered] = useState<Date | null>(null);
  const [freeformAnswer, setFreeformAnswer] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadNextQuestion();
    loadUserProgress();
  }, []);

  const loadUserProgress = () => {
    const savedCoins = localStorage.getItem('jungleCoins');
    const savedStreak = localStorage.getItem('answerStreak');
    const savedLastAnswered = localStorage.getItem('lastAnswered');

    if (savedCoins) setJungleCoins(parseInt(savedCoins));
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedLastAnswered) setLastAnswered(new Date(savedLastAnswered));
  };

  const loadNextQuestion = () => {
    const unansweredQuestions = questions.filter(q => !answeredQuestions.includes(q.id));
    if (unansweredQuestions.length === 0) {
      toast({
        title: "🎉 All questions completed!",
        description: "You've unlocked the 'Completionist' badge!",
      });
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
    setCurrentQuestion(unansweredQuestions[randomIndex]);
    setFreeformAnswer("");
  };

  const updateStreak = () => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    if (!lastAnswered || lastAnswered < oneDayAgo) {
      setStreak(1);
    } else {
      setStreak(prev => prev + 1);
    }
    
    setLastAnswered(now);
    localStorage.setItem('answerStreak', streak.toString());
    localStorage.setItem('lastAnswered', now.toISOString());
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
    updateStreak();
    
    setAnsweredQuestions(prev => {
      const newAnswered = [...prev, currentQuestion.id];
      if (newAnswered.length % 4 === 0) {
        updateJungleCoins(1);
      }
      return newAnswered;
    });
    
    // Show personality insight every 5 questions
    if (answeredQuestions.length % 5 === 0) {
      toast({
        title: "🎯 Personality Insight!",
        description: "Based on your answers, you're a Creative Explorer!",
      });
    }
    
    loadNextQuestion();
  };

  const handleFreeformAnswer = async () => {
    if (!currentQuestion || !freeformAnswer.trim()) return;
    await storeResponse(currentQuestion.id, freeformAnswer);
    updateJungleCoins(2);
    updateStreak();
    setAnsweredQuestions(prev => [...prev, currentQuestion.id]);
    
    toast({
      title: "🌟 Creative response saved!",
      description: "You earned 2 Jungle Coins for your detailed answer.",
    });
    
    loadNextQuestion();
  };

  const progress = (answeredQuestions.length / questions.length) * 100;

  return (
    <div className="space-y-6">
      <SystemOverview />
      
      <Card className="p-6 animate-fade-in bg-white/5 backdrop-blur-sm border-white/10">
        {currentQuestion ? (
          <div className="space-y-6">
            <QuestionDisplay 
              question={currentQuestion}
              onAnswer={handleAnswer}
              progress={progress}
              streak={streak}
            />

            <div className="pt-6 border-t border-white/10">
              <FreeformAnswer
                value={freeformAnswer}
                onChange={setFreeformAnswer}
                onSubmit={handleFreeformAnswer}
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/60">
                  {answeredQuestions.length} questions answered
                </span>
                <div className="flex items-center gap-1 text-primary">
                  <Coins className="h-4 w-4" />
                  <span className="font-semibold">{jungleCoins}</span>
                </div>
              </div>
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