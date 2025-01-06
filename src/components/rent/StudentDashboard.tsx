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
  const { data: session, isLoading: isSessionLoading, error: sessionError } = useQuery({
    queryKey: ['auth-session'],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      if (!session) throw new Error('No session found');
      return session;
    },
    retry: false, // Don't retry on failure
  });

  // Set up auth state change listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        toast({
          title: "Session Expired",
          description: "Please sign in to continue.",
          variant: "destructive"
        });
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  // Handle session loading and errors
  if (isSessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (sessionError || !session) {
    toast({
      title: "Authentication Required",
      description: "Please sign in to access your dashboard.",
      variant: "destructive"
    });
    navigate('/auth');
    return null;
  }

  return <DashboardLayout session={session} />;
};

export default StudentDashboard;