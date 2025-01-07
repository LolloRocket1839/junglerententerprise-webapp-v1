import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import DashboardSidebar from './DashboardSidebar';
import DashboardContent from './DashboardContent';
import type { View } from './DashboardSidebar';

interface DashboardLayoutProps {
  session: Session;
}

const DashboardLayout = ({ session }: DashboardLayoutProps) => {
  const [activeView, setActiveView] = useState<View>("overview");
  const navigate = useNavigate();
  const { toast } = useToast();

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
        />
      </div>
    </div>
  );
};

export default DashboardLayout;