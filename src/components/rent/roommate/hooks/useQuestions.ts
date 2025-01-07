import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DynamicQuestion, QuestionCategory } from "../types/questions";

export const useQuestions = (categoryId: string | null) => {
  return useQuery({
    queryKey: ['roommate-questions', categoryId],
    queryFn: async () => {
      let query = supabase
        .from('roommate_questions')
        .select('*');
      
      if (categoryId) {
        query = query.eq('category', categoryId);
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
        .eq('category', 'category'); // This creates a unique list of categories
      
      if (error) throw error;
      
      // Create unique categories from the results
      const uniqueCategories = Array.from(new Set(data.map(row => row.category)))
        .map(category => ({
          id: category,
          name: category,
          is_premium: false,
          created_at: new Date().toISOString()
        }));
      
      return uniqueCategories as QuestionCategory[];
    }
  });
};