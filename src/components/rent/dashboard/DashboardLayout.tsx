import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import DashboardSidebar from './DashboardSidebar';
import DashboardContent from './DashboardContent';
import type { View } from './DashboardSidebar';
import type { Session } from '@supabase/supabase-js';

interface DashboardLayoutProps {
  session: Session;
  isEmailVerified: boolean;
}

const DashboardLayout = ({ session, isEmailVerified }: DashboardLayoutProps) => {
  const [activeView, setActiveView] = useState<View>("overview");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/');
        toast({
          title: "Session expired",
          description: "Please sign in again to continue.",
          variant: "destructive",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        isEmailVerified={isEmailVerified}
      />
      <div className="flex-1 p-8">
        <DashboardContent 
          isEmailVerified={isEmailVerified}
          activeView={activeView}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;