import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from './dashboard/DashboardLayout';
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch current session
  const { data: session, isLoading: isSessionLoading } = useQuery({
    queryKey: ['auth-session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // Consider session data fresh for 5 minutes
  });

  // Set up auth state change listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Handle session loading state
  if (isSessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If no session, redirect to auth
  if (!session) {
    navigate('/auth');
    return null;
  }

  return <DashboardLayout session={session} />;
};

export default StudentDashboard;