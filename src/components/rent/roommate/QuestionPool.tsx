import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CategorySelector } from "./components/CategorySelector";
import { QuestionCard } from "./components/QuestionCard";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types/database";

type Profile = Database["public"]["Tables"]["profiles"]["Row"] & {
  is_premium?: boolean;
};

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

  const { data: questions, isLoading: loadingQuestions } = useQuery({
    queryKey: ['roommate-questions', selectedCategory],
    queryFn: async () => {
      if (!selectedCategory) return [];
      const { data, error } = await supabase
        .from('roommate_questions')
        .select('*')
        .eq('category', selectedCategory);

      if (error) throw error;
      return data;
    },
    enabled: !!selectedCategory,
  });

  const handleAnswerQuestion = async (questionId: string, answer: string) => {
    const { error } = await supabase
      .from('roommate_answers')
      .insert({ 
        question_id: questionId, 
        answer,
        profile_id: profile?.id 
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit your answer. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Your answer has been submitted!",
      });
    }
  };

  return (
    <div className="space-y-6">
      <CategorySelector 
        categories={[]}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        isPremiumUser={profile?.is_premium ?? false}
      />
      {loadingQuestions ? (
        <Card className="p-6 glass-card flex items-center justify-center">
          <p>Loading questions...</p>
        </Card>
      ) : (
        questions?.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            onAnswer={(answer) => handleAnswerQuestion(question.id, answer)}
            isPremiumUser={profile?.is_premium ?? false}
          />
        ))
      )}
    </div>
  );
};

export default QuestionPool;