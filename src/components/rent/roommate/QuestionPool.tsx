import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import CategorySelector from "./components/CategorySelector";
import QuestionCard from "./components/QuestionCard";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types/database";

interface Profile extends Database['public']['Tables']['profiles']['Row'] {
  is_premium?: boolean;
}

interface Preferences {
  is_premium?: boolean;
  [key: string]: any;
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

  const { data: questions, isLoading: loadingQuestions } = useQuery({
    queryKey: ['questions', selectedCategory],
    queryFn: async () => {
      if (!selectedCategory) return [];
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('category', selectedCategory);

      if (error) throw error;
      return data;
    },
    enabled: !!selectedCategory,
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleAnswerQuestion = async (questionId: string, answer: string) => {
    const { error } = await supabase
      .from('answers')
      .insert({ question_id: questionId, answer });

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
      <CategorySelector onChange={handleCategoryChange} />
      {loadingQuestions ? (
        <p>Loading questions...</p>
      ) : (
        questions?.map((question) => (
          <Card key={question.id} className="p-4">
            <QuestionCard
              question={question}
              onAnswer={handleAnswerQuestion}
            />
          </Card>
        ))
      )}
    </div>
  );
};

export default QuestionPool;
