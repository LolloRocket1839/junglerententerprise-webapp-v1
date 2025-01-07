import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import DashboardSidebar from './DashboardSidebar';
import DashboardContent from './DashboardContent';
import type { View } from './DashboardSidebar';
import type { Session } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";

interface DashboardLayoutProps {
  session: Session;
  isEmailVerified: boolean;
}

const DashboardLayout = ({ session, isEmailVerified }: DashboardLayoutProps) => {
  const [activeView, setActiveView] = useState<View>('roommate');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar 
        activeView={activeView} 
        onViewChange={setActiveView}
        isEmailVerified={isEmailVerified}
      />
      <div className="flex-1 p-8">
        <DashboardContent 
          activeView={activeView}
          isEmailVerified={isEmailVerified}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;