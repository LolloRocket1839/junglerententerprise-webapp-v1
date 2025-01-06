import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import DashboardSidebar from './DashboardSidebar';
import DashboardContent from './DashboardContent';
import type { Session } from '@supabase/supabase-js';

interface DashboardLayoutProps {
  session: Session;
}

const DashboardLayout = ({ session }: DashboardLayoutProps) => {
  const [activeView, setActiveView] = useState<string>("overview");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/auth');
        toast({
          title: "Session Expired",
          description: "Please sign in to continue.",
          variant: "destructive"
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const isEmailVerified = session?.user?.email_confirmed_at != null;

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
          session={session}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;