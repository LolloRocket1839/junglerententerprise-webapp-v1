
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { UserRole } from '@/types/auth';

export function useUserRole() {
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserRole();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchUserRole();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchUserRole() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setRole(null);
        return;
      }

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setRole(data.role as UserRole);
    } catch (error) {
      console.error('Error fetching user role:', error);
      setRole(null);
    } finally {
      setLoading(false);
    }
  }

  return { role, loading };
}
