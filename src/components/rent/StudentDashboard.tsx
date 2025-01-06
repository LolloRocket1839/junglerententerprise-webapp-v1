import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from './dashboard/DashboardLayout';
import { useToast } from "@/components/ui/use-toast";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch current session
  const { data: session, isLoading: isSessionLoading } = useQuery({
    queryKey: ['auth-session'],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Session error:', error);
        return null;
      }
      return session;
    },
  });

  // Redirect if no session
  useEffect(() => {
    if (!isSessionLoading && !session) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access your dashboard.",
        variant: "destructive"
      });
      navigate('/auth');
    }
  }, [session, isSessionLoading, navigate, toast]);

  if (isSessionLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return <DashboardLayout session={session} />;
};

export default StudentDashboard;