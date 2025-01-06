import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import StudentSchedule from '../StudentSchedule';
import StudentSwap from '../StudentSwap';
import DashboardStats from '../DashboardStats';
import ActivityFeed from '../ActivityFeed';
import RoommateFinder from '../roommate/RoommateFinder';
import MarketplaceGrid from '../../marketplace/MarketplaceGrid';
import { AlertCircle } from 'lucide-react';

type View = "overview" | "schedule" | "messages" | "newsfeed" | "swap" | "roommate" | "marketplace" | "hub" | "settings";

interface DashboardContentProps {
  isEmailVerified: boolean;
}

const DashboardContent = ({ isEmailVerified }: DashboardContentProps) => {
  const [activeTab, setActiveTab] = useState<View>("overview");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Verify user session
  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ['auth-session'],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        toast({
          title: "Authentication Error",
          description: "Please sign in to access all features.",
          variant: "destructive"
        });
        throw error;
      }
      return session;
    }
  });

  // Check if user has a profile
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['user-profile', session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session?.user?.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      return data;
    }
  });

  // Listen for real-time updates
  useEffect(() => {
    if (!session?.user?.id) return;

    const channel = supabase
      .channel('dashboard-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          console.log('Notification update:', payload);
          // Refresh notifications
          toast({
            title: "New Update",
            description: "You have a new notification",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id, toast]);

  if (sessionLoading || profileLoading) {
    return (
      <div className="lg:col-span-9">
        <div className="glass-card p-8 text-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="lg:col-span-9">
        <div className="glass-card p-8 text-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Authentication Required</h3>
          <p className="text-white/60 mb-6">
            Please sign in to access the student dashboard features.
          </p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/auth')}
            className="bg-white/5 hover:bg-white/10"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (!isEmailVerified) {
    return (
      <div className="lg:col-span-9">
        <div className="glass-card p-8 text-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Email Verification Required</h3>
          <p className="text-white/60 mb-6">
            To access all features of the student dashboard, please verify your email address.
            Check your inbox for a verification link.
          </p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/auth')}
            className="bg-white/5 hover:bg-white/10"
          >
            Back to Authentication
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-9 space-y-6">
      {activeTab === 'overview' && (
        <>
          <DashboardStats />
          <ActivityFeed />
        </>
      )}
      
      {activeTab === 'schedule' && <StudentSchedule />}
      
      {activeTab === 'swap' && <StudentSwap />}
      
      {activeTab === 'roommate' && <RoommateFinder />}
      
      {activeTab === 'marketplace' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">Jungle Exchange</h3>
              <p className="text-white/60">Buy, sell, and trade items within your student community</p>
            </div>
            <Button 
              variant="default" 
              className="glass-button hover:scale-105 transition-transform duration-300"
            >
              List New Item
            </Button>
          </div>
          <MarketplaceGrid />
        </div>
      )}
      
      {activeTab === 'messages' && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white">Messages</h3>
          <p className="text-white/60 mt-2">No messages yet.</p>
        </div>
      )}
      
      {activeTab === 'settings' && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white">Settings</h3>
          <p className="text-white/60 mt-2">Settings panel coming soon.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;