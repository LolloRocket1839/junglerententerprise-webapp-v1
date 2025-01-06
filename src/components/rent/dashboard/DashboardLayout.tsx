import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import DashboardSidebar from './DashboardSidebar';
import DashboardContent from './DashboardContent';
import { useNavigate } from 'react-router-dom';

type View = "overview" | "schedule" | "messages" | "newsfeed" | "swap" | "roommate" | "marketplace" | "hub" | "settings";

const DashboardLayout = () => {
  const [activeView, setActiveView] = useState<View>("overview");
  const navigate = useNavigate();
  const { toast } = useToast();

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

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/rent?tab=search');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!isSessionLoading && !session) {
      navigate('/rent?tab=search');
      toast({
        title: "Authentication Required",
        description: "Please sign in to access your dashboard.",
        variant: "destructive"
      });
    }
  }, [session, isSessionLoading, navigate, toast]);

  const isEmailVerified = session?.user?.email_confirmed_at != null;

  if (isSessionLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="glass-card p-6">
          <p className="text-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-12 gap-6">
        <DashboardSidebar 
          isEmailVerified={isEmailVerified} 
          onViewChange={setActiveView}
          activeView={activeView}
        />
        <DashboardContent 
          isEmailVerified={isEmailVerified}
          activeView={activeView}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;