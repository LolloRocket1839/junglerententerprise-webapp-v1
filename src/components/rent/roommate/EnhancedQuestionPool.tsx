import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Trophy, Coins, Star, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';

interface Question {
  id: string;
  question: string;
  category: string;
  options: { text: string; trait: string }[];
  coin_reward: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  is_premium: boolean;
}

export const EnhancedQuestionPool = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [answeredToday, setAnsweredToday] = useState(0);
  const { toast } = useToast();
  const { session } = useAuth();
  const { data: profile } = useProfile();

  const { data: questions, isLoading } = useQuery({
    queryKey: ['roommate-questions', selectedCategory],
    queryFn: async () => {
      let query = supabase.from('roommate_questions').select('*');
      
      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      // Transform the data to match our interface
      return data?.map(q => ({
        ...q,
        options: Array.isArray(q.options) ? q.options as { text: string; trait: string }[] : []
      })) as Question[] || [];
    },
    enabled: !!selectedCategory
  });

  const { data: categories } = useQuery({
    queryKey: ['question-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('question_categories')
        .select('*')
        .order('name');
      if (error) throw error;
      return data as Category[];
    }
  });

  const handleAnswer = async (answer: string, trait: string) => {
    if (!session?.user || !questions) return;

    try {
      // Save answer
      const { error } = await supabase
        .from('roommate_answers')
        .insert({
          profile_id: session.user.id,
          question_id: questions[currentQuestionIndex].id,
          answer,
          trait
        });

      if (error) throw error;

      // Update streak and coins
      const newStreak = streak + 1;
      const coinsEarned = questions[currentQuestionIndex].coin_reward || 2;
      setStreak(newStreak);
      setTotalCoins(totalCoins + coinsEarned);
      setAnsweredToday(answeredToday + 1);

      // Show milestone rewards
      if (newStreak === 5) {
        toast({
          title: "🔥 Streak Milestone!",
          description: `5 questions in a row! Bonus 10 coins earned!`,
        });
      } else if (newStreak === 10) {
        toast({
          title: "🏆 Dedication Reward!",
          description: `10 question streak! You earned 25 bonus coins!`,
        });
      }

      // Move to next question
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Quiz completed
        toast({
          title: "🎉 Quiz Completed!",
          description: `You answered ${questions.length} questions and earned ${coinsEarned * questions.length} coins!`,
        });
      }
    } catch (error) {
      console.error('Error saving answer:', error);
      toast({
        title: "Error",
        description: "Failed to save your answer. Please try again.",
        variant: "destructive"
      });
    }
  };

  const currentQuestion = questions?.[currentQuestionIndex];
  const progress = questions ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  if (!selectedCategory) {
    return (
      <div className="space-y-6">
        {/* Progress Stats */}
        <Card className="glass-premium">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Zap className="w-5 h-5 text-orange-400 mr-1" />
                  <span className="text-2xl font-bold text-white">{streak}</span>
                </div>
                <p className="text-white/60 text-sm">Current Streak</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Coins className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="text-2xl font-bold text-white">{totalCoins}</span>
                </div>
                <p className="text-white/60 text-sm">Coins Earned</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="w-5 h-5 text-purple-400 mr-1" />
                  <span className="text-2xl font-bold text-white">{answeredToday}</span>
                </div>
                <p className="text-white/60 text-sm">Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Selection */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Choose a Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories?.map((category) => (
              <Card key={category.id} className="glass-premium hover:scale-105 transition-all duration-300 cursor-pointer" onClick={() => setSelectedCategory(category.name)}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{category.name}</h4>
                    {category.is_premium && (
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                        <Star className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <p className="text-white/70 text-sm">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Card className="glass-premium animate-pulse">
        <CardContent className="p-8">
          <div className="space-y-4">
            <div className="h-4 bg-white/20 rounded w-full"></div>
            <div className="h-20 bg-white/10 rounded"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-white/20 rounded"></div>
              <div className="h-12 bg-white/20 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentQuestion) {
    return (
      <Card className="glass-premium">
        <CardContent className="p-8 text-center">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h3>
          <p className="text-white/70 mb-6">
            Great job! You've answered all questions in this category.
          </p>
          <Button onClick={() => setSelectedCategory('')} className="mr-4">
            Choose Another Category
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <Card className="glass-premium">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70 text-sm">
              Question {currentQuestionIndex + 1} of {questions?.length}
            </span>
            <div className="flex items-center space-x-2">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm">+{currentQuestion.coin_reward}</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="glass-premium">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              {selectedCategory}
            </Badge>
            <h3 className="text-xl font-semibold text-white mb-4">
              {currentQuestion.question}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="p-6 h-auto glass-premium hover:scale-105 transition-all duration-300"
                onClick={() => handleAnswer(option.text, option.trait)}
              >
                <span className="text-center">{option.text}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};