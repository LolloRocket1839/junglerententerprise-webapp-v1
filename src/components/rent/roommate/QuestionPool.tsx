import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Flame, Snowflake, Trophy, Star, User, Heart, Badge } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { storeResponse } from './utils/storageUtils';
import { questions } from './data/questions';
import { Question, QuestionIcon, QuestionCategory } from './types/questions';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const QuestionPool = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [jungleCoins, setJungleCoins] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastAnswered, setLastAnswered] = useState<Date | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | 'all'>('all');
  const [hasStarted, setHasStarted] = useState(false);
  const { toast } = useToast();

  const categories: QuestionCategory[] = Array.from(
    new Set(questions.map(q => q.category))
  );

  useEffect(() => {
    if (hasStarted) {
      loadNextQuestion();
    }
    loadUserProgress();
  }, [hasStarted, selectedCategory]);

  const loadUserProgress = () => {
    const savedCoins = localStorage.getItem('jungleCoins');
    const savedStreak = localStorage.getItem('answerStreak');
    const savedLastAnswered = localStorage.getItem('lastAnswered');

    if (savedCoins) setJungleCoins(parseInt(savedCoins));
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedLastAnswered) setLastAnswered(new Date(savedLastAnswered));
  };

  const loadNextQuestion = () => {
    const filteredQuestions = selectedCategory === 'all' 
      ? questions 
      : questions.filter(q => q.category === selectedCategory);
    
    const unansweredQuestions = filteredQuestions.filter(q => !answeredQuestions.includes(q.id));
    
    if (unansweredQuestions.length === 0) {
      toast({
        title: "🎉 All questions completed!",
        description: "You've unlocked the 'Completionist' badge!",
      });
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
    setCurrentQuestion(unansweredQuestions[randomIndex]);
    setSelectedAnswer(null);
    setShowStats(false);
  };

  const getIcon = (iconName: QuestionIcon) => {
    const icons = {
      flame: Flame,
      snowflake: Snowflake,
      trophy: Trophy,
      star: Star,
      user: User,
      heart: Heart,
      badge: Badge
    };
    const IconComponent = icons[iconName];
    return <IconComponent className="h-5 w-5" />;
  };

  const handleAnswer = async (answer: string, trait: string) => {
    if (!currentQuestion) return;
    
    setSelectedAnswer(answer);
    setShowStats(true);

    // Simulate other users' responses
    const otherUsersPercentage = Math.floor(Math.random() * 40 + 30);
    
    setTimeout(async () => {
      await storeResponse(currentQuestion.id, answer);
      updateStreak();
      updateJungleCoins(2);
      
      setAnsweredQuestions(prev => [...prev, currentQuestion.id]);
      
      // Show personality insight every 5 questions
      if (answeredQuestions.length % 5 === 4) {
        toast({
          title: "🎯 Personality Insight!",
          description: `Based on your choices, you're a ${trait}!`,
        });
      }
      
      loadNextQuestion();
    }, 2000);

    toast({
      title: "Statistics",
      description: `${otherUsersPercentage}% of users chose the same option!`,
    });
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
  };

  if (!hasStarted) {
    return (
      <Card className="p-6 animate-fade-in glass-card">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white">Choose Your Question Category</h3>
          <RadioGroup
            defaultValue="all"
            onValueChange={(value) => setSelectedCategory(value as QuestionCategory | 'all')}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all" className="text-white">All Categories</Label>
            </div>
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <RadioGroupItem value={category} id={category} />
                <Label htmlFor={category} className="text-white">{category}</Label>
              </div>
            ))}
          </RadioGroup>
          <Button 
            className="w-full"
            onClick={() => setHasStarted(true)}
          >
            Start Quiz
          </Button>
        </div>
      </Card>
    );
  }

  const progress = (answeredQuestions.length / questions.length) * 100;

  return (
    <div className="space-y-6">
      <Card className="p-6 animate-fade-in glass-card">
        {currentQuestion ? (
          <div className="space-y-6">
            {/* Progress and Streak */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="text-sm text-primary font-medium">
                  {streak} Day Streak!
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-sm text-white/60">
                  Level: {Math.floor(progress / 10) + 1}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-white/60 text-right">{Math.floor(progress)}% Complete</p>
            </div>

            {/* Question */}
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-sm text-primary font-medium flex items-center gap-2">
                  <Badge className="h-4 w-4" />
                  {currentQuestion.category}
                </span>
                <h3 className="text-xl font-semibold text-white">
                  {currentQuestion.text}
                </h3>
              </div>

              {/* Options */}
              <div className="grid gap-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === option.text ? "default" : "outline"}
                    className={`
                      w-full justify-start text-left transition-all duration-300
                      ${selectedAnswer === option.text ? 'bg-primary text-white scale-105' : 'hover:bg-primary/20 hover:text-primary'}
                      ${showStats ? 'pointer-events-none' : ''}
                      animate-scale-in
                    `}
                    onClick={() => handleAnswer(option.text, option.trait)}
                    disabled={showStats}
                  >
                    <div className="flex items-center gap-2">
                      {getIcon(option.icon)}
                      {option.text}
                    </div>
                  </Button>
                ))}
              </div>
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
