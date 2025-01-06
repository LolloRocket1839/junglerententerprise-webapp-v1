import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import DashboardSidebar from './DashboardSidebar';
import DashboardContent from './DashboardContent';

type View = "overview" | "schedule" | "messages" | "newsfeed" | "swap" | "roommate" | "marketplace" | "hub" | "settings";

const DashboardLayout = () => {
  const [activeView, setActiveView] = useState<View>("overview");

  const { data: session } = useQuery({
    queryKey: ['auth-session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  const isEmailVerified = session?.user?.email_confirmed_at != null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-12 gap-6">
        <DashboardSidebar 
          isEmailVerified={isEmailVerified} 
          onViewChange={setActiveView}
          activeView={activeView}
        />
        <DashboardContent isEmailVerified={isEmailVerified} />
      </div>
    </div>
  );
};

export default DashboardLayout;