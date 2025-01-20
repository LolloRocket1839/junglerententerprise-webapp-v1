import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CategorySelector } from "./roommate/components/CategorySelector";
import { QuestionCard } from "./roommate/components/QuestionCard";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types/database";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type Profile = Database["public"]["Tables"]["profiles"]["Row"] & {
  is_premium?: boolean;
};

interface Category {
  id: string;
  name: string;
  description: string;
  is_premium: boolean;
}

interface Question {
  id: string;
  question: string;
  options: {
    [key: string]: string;
  };
  coin_reward?: number;
}

const QuestionPool = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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

  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ['roommate_categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('roommate_questions')
        .select('category')
        .order('category');

      if (error) throw error;
      
      const uniqueCategories = Array.from(new Set(data.map(row => row.category)));
      
      return uniqueCategories.map(category => ({
        id: category,
        name: category,
        description: `Questions about ${category.toLowerCase()}`,
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

      return data.map(q => {
        const optionsObj: { [key: string]: string } = {};
        if (Array.isArray(q.options)) {
          q.options.forEach((opt: { text: string; trait: string }) => {
            optionsObj[opt.text] = opt.trait;
          });
        }
        
        return {
          id: q.id,
          question: q.question,
          options: optionsObj,
          coin_reward: q.coin_reward
        };
      }) as Question[];
    },
    enabled: !!selectedCategory
  });

  const handleAnswer = async (questionId: string, answer: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to answer questions",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from('roommate_answers')
      .upsert({
        profile_id: user.id,
        question_id: questionId,
        answer
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save your answer",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Your answer has been saved"
    });
  };

  if (loadingCategories || loadingQuestions) {
    return (
      <Card className="p-6 glass-card flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {categories && (
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          isPremiumUser={profile?.is_premium ?? false}
        />
      )}

      <div className="space-y-4">
        {questions?.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            onAnswer={(answer) => handleAnswer(question.id, answer)}
            isPremiumUser={profile?.is_premium ?? false}
          />
        ))}
      </div>

      {questions && questions.length > 0 && (
        <div className="mt-4">
          <Progress value={(questions.length / (categories?.length ?? 1)) * 100} />
          <p className="text-sm text-white/60 text-right mt-2">
            {questions.length} questions completed
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionPool;