import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DynamicQuestion, QuestionCategory } from "../types/questions";

export const useQuestions = (categoryId: string | null) => {
  return useQuery({
    queryKey: ['dynamic-questions', categoryId],
    queryFn: async () => {
      let query = supabase
        .from('dynamic_questions')
        .select('*');
      
      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as DynamicQuestion[];
    },
    enabled: true
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['question-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('question_categories')
        .select('*');
      
      if (error) throw error;
      return data as QuestionCategory[];
    }
  });
};