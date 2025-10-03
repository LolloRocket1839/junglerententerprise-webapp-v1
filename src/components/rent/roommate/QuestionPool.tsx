import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CategorySelector } from "./components/CategorySelector";
import { QuestionDisplay } from "./components/QuestionDisplay";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useTemporaryProfile } from "@/hooks/useTemporaryProfile";
import { useLanguage } from "@/contexts/LanguageContext";

type Profile = {
  id: string;
  is_premium?: boolean;
};

interface Category {
  id: string;
  name: string;
  description: string;
  is_premium: boolean;
}

const QuestionPool = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [coins, setCoins] = useState(0);
  const { toast } = useToast();
  const { t } = useLanguage();

  const { data: profile } = useProfile();
  const { tempProfile, saveAnswer: saveTempAnswer } = useTemporaryProfile();

  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ['roommate_categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('roommate_questions')
        .select('category')
        .order('category');

      if (error) throw error;
      
      // Filter unique categories and add required description field
      const uniqueCategories = Array.from(new Set(data.map(row => row.category)));
      
      return uniqueCategories.map(category => ({
        id: category,
        name: category,
        description: `Questions about ${category.toLowerCase()}`,  // Added description field
        is_premium: false
      })) as Category[];
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
      }));
    },
    enabled: !!selectedCategory
  });

  const handleAnswer = async (answer: string, trait: string) => {
    if (!questions) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const profileId = profile?.id || tempProfile?.tempId;
    
    try {
      // Save answer (works for both authenticated and anonymous users)
      if (profile?.id) {
        // Authenticated user - save to database normally
        const { error } = await supabase
          .from('roommate_answers')
          .insert({
            profile_id: profile.id,
            question_id: currentQuestion.id,
            answer,
            trait
          });
        if (error) throw error;
      } else if (tempProfile) {
        // Anonymous user - save via temporary profile hook
        await saveTempAnswer(currentQuestion.id, answer, trait);
      }

      // Update streak and coins
      setStreak(prev => prev + 1);
      const questionCoins = currentQuestion.coinReward;
      setCoins(prev => prev + questionCoins);

      // Show milestone messages
      if ((currentQuestionIndex + 1) % 5 === 0) {
        toast({
          title: t('rentalTranslations.milestoneReached'),
          description: `${t('rentalTranslations.questionsAnswered').replace('{count}', String(currentQuestionIndex + 1))}`,
        });
      }

      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);

    } catch (error) {
      console.error('Error saving answer:', error);
      toast({
        title: t('rentalTranslations.error'),
        description: t('rentalTranslations.failedToSave'),
        variant: "destructive"
      });
    }
  };

  if (loadingCategories || loadingQuestions) {
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
          categories={categories || []}
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
          <h3 className="text-2xl font-bold mb-4">{t('rentalTranslations.quizComplete')}</h3>
          <p className="text-lg mb-6">
            {t('rentalTranslations.coinsEarned').replace('{coins}', String(coins)).replace('{streak}', String(streak))}
          </p>
          <Button onClick={() => {
            setSelectedCategory(null);
            setCurrentQuestionIndex(0);
          }}>
            {t('rentalTranslations.startNewQuiz')}
          </Button>
        </Card>
      )}

      {questions && questions.length > 0 && (
        <div className="mt-4">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-white/60 text-right mt-2">
            {currentQuestionIndex}/{questions.length} {t('rentalTranslations.questionsCompleted')}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionPool;
