import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { QuestionCard } from "./roommate/components/QuestionCard";
import { CategorySelector } from "./roommate/components/CategorySelector";
import { useQuestions, useCategories } from "./roommate/hooks/useQuestions";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types/database";

type Profile = Database['public']['Tables']['profiles']['Row'] & {
  is_premium?: boolean;
};

const QuestionPool = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch user's profile
  const { data: profile } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      return {
        ...data,
        is_premium: Boolean(data.is_premium || (data.preferences as any)?.is_premium)
      } as Profile;
    }
  });

  const { data: categories, isLoading: loadingCategories } = useCategories();
  const { data: questions, isLoading: loadingQuestions } = useQuestions(selectedCategory);

  const handleAnswer = async (questionId: string, answer: any) => {
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