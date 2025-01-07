import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DynamicQuestion, QuestionCategory } from "../types/questions";
import { Database } from "@/integrations/supabase/types";

export const useQuestions = (categoryId: string | null) => {
  return useQuery({
    queryKey: ['roommate-questions', categoryId],
    queryFn: async () => {
      let query = supabase
        .from('roommate_questions')
        .select('*');
      
      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as unknown as DynamicQuestion[];
    },
    enabled: true
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['question-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('roommate_questions')
        .select('category')
        .distinct();
      
      if (error) throw error;
      return data.map(row => ({
        id: row.category,
        name: row.category,
        is_premium: false,
        created_at: new Date().toISOString()
      })) as QuestionCategory[];
    }
  });
};