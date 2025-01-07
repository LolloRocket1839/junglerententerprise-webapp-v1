import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CategorySelector } from "./components/CategorySelector";
import { QuestionDisplay } from "./components/QuestionDisplay";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types/database";
import type { RoommateQuestion } from "./types/questions";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

type Profile = Database["public"]["Tables"]["profiles"]["Row"] & {
  is_premium?: boolean;
};

const QuestionPool = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [coins, setCoins] = useState(0);
  const { toast } = useToast();

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data as Profile;
    }
  });

  const { data: questions, isLoading: loadingQuestions } = useQuery({
    queryKey: ['roommate_questions', selectedCategory],
    queryFn: async () => {
      if (!selectedCategory) return [];
      
      const { data, error } = await supabase
        .from('roommate_questions')
        .select('*')
        .eq('category', selectedCategory);

      if (error) throw error;
      
      return data.map(q => ({
        id: q.id,
        text: q.question,
        category: q.category,
        coinReward: q.coin_reward || 10,
        options: Array.isArray(q.options) ? q.options.map((opt: any) => ({
          text: opt.text || '',
          trait: opt.trait || ''
        })) : [],
        weight: 1,
        isMystery: Math.random() > 0.8 // 20% chance of being a mystery question
      })) as RoommateQuestion[];
    },
    enabled: !!selectedCategory,
  });

  const handleAnswer = async (answer: string, trait: string) => {
    if (!questions || !profile) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    
    try {
      const { error } = await supabase
        .from('roommate_answers')
        .insert({
          profile_id: profile.id,
          question_id: currentQuestion.id,
          answer,
          trait
        });

      if (error) throw error;

      // Update streak and coins
      setStreak(prev => prev + 1);
      const questionCoins = currentQuestion.coinReward;
      setCoins(prev => prev + questionCoins);

      // Show milestone messages
      if ((currentQuestionIndex + 1) % 5 === 0) {
        toast({
          title: "Milestone reached! 🎉",
          description: `You've answered ${currentQuestionIndex + 1} questions! Keep going!`,
        });
      }

      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);

    } catch (error) {
      console.error('Error saving answer:', error);
      toast({
        title: "Error",
        description: "Failed to save your answer. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loadingQuestions) {
    return (
      <Card className="p-6 glass-card flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </Card>
    );
  }

  const progress = questions ? ((currentQuestionIndex) / questions.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {!selectedCategory ? (
        <CategorySelector
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          isPremiumUser={profile?.is_premium ?? false}
        />
      ) : questions && currentQuestionIndex < questions.length ? (
        <QuestionDisplay
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          progress={progress}
          streak={streak}
          coins={coins}
        />
      ) : (
        <Card className="p-6 glass-card text-center">
          <h3 className="text-2xl font-bold mb-4">Quiz Complete! 🎉</h3>
          <p className="text-lg mb-6">
            You've earned {coins} Jungle Coins and maintained a {streak} question streak!
          </p>
          <Button onClick={() => {
            setSelectedCategory(null);
            setCurrentQuestionIndex(0);
          }}>
            Start New Quiz
          </Button>
        </Card>
      )}

      {questions && questions.length > 0 && (
        <div className="mt-4">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-white/60 text-right mt-2">
            {currentQuestionIndex}/{questions.length} questions completed
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionPool;