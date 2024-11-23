import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Save, Coins, MessageSquare } from 'lucide-react';
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
    setFreeformAnswer(""); // Reset freeform answer for new question
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

    try {
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
    } catch (error) {
      toast({
        title: "Error saving response",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleCustomQuestion = async () => {
    if (!customAnswer.trim()) return;
    
    updateJungleCoins(3);
    setCustomAnswer("");
    
    toast({
      title: "Thank you for your contribution!",
      description: "You've earned 3 Jungle Coins for sharing your insights.",
    });
  };

  const handleFreeformAnswer = async () => {
    if (!currentQuestion || !freeformAnswer.trim()) return;

    try {
      await storeResponse(currentQuestion.id, freeformAnswer);
      updateJungleCoins(2); // Award 2 coins for freeform answer
      setAnsweredQuestions(prev => [...prev, currentQuestion.id]);
      
      toast({
        title: "Creative response saved!",
        description: "You earned 2 Jungle Coins for your detailed answer.",
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
    <div className="space-y-6">
      <Card className="p-6 animate-fade-in bg-white/5 backdrop-blur-sm border-white/10">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <span className="text-sm text-primary font-medium">
                {currentQuestion.category}
              </span>
              <h3 className="text-xl font-semibold text-white">
                {currentQuestion.text}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <Coins className="h-5 w-5" />
              <span className="font-semibold">{jungleCoins}</span>
            </div>
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

          <div className="pt-6 border-t border-white/10">
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Share your detailed answer
                </h4>
                <Textarea
                  value={freeformAnswer}
                  onChange={(e) => setFreeformAnswer(e.target.value)}
                  placeholder="Write your own answer to earn 2 Jungle Coins..."
                  className="min-h-[100px] bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
                <Button
                  variant="default"
                  onClick={handleFreeformAnswer}
                  disabled={!freeformAnswer.trim()}
                  className="mt-2"
                >
                  Submit Custom Answer
                </Button>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3">Have something to add?</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customAnswer}
                    onChange={(e) => setCustomAnswer(e.target.value)}
                    placeholder="Share your thoughts or suggest a question..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/40"
                  />
                  <Button
                    variant="default"
                    onClick={handleCustomQuestion}
                    disabled={!customAnswer.trim()}
                  >
                    Share
                  </Button>
                </div>
                <p className="text-white/40 text-sm mt-2">
                  Earn 3 Jungle Coins by sharing your insights!
                </p>
              </div>
            </div>
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
    </div>
  );
};

export default QuestionPool;