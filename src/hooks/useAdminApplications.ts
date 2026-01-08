import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface StudentApplication {
  id: string;
  student_id?: string;
  property_id: string;
  status: string;
  move_in_date: string | null;
  move_out_date?: string | null;
  message?: string | null;
  admin_notes?: string | null;
  created_at: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  student?: {
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  }[] | null;
  property?: {
    title: string;
    city: string;
  } | null;
}

export function useAdminApplications() {
  return useQuery({
    queryKey: ['admin-applications'],
    queryFn: async (): Promise<StudentApplication[]> => {
      const { data, error } = await supabase
        .from('student_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        throw error;
      }

      // Fetch property info separately since it's in unified_properties view
      const applicationsWithProperty = await Promise.all(
        (data || []).map(async (app) => {
          const { data: property } = await supabase
            .from('unified_properties')
            .select('title, city')
            .eq('id', app.property_id)
            .single();
          
          return { ...app, property } as StudentApplication;
        })
      );

      return applicationsWithProperty;
    }
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status, admin_notes }: { id: string; status: string; admin_notes?: string }) => {
      const updateData: Record<string, unknown> = { status, updated_at: new Date().toISOString() };
      if (admin_notes) updateData.admin_notes = admin_notes;

      const { error } = await supabase
        .from('student_applications')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-applications'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      toast.success('Candidatura aggiornata');
    },
    onError: (error) => {
      console.error('Error updating application:', error);
      toast.error('Errore nell\'aggiornamento');
    }
  });
}
