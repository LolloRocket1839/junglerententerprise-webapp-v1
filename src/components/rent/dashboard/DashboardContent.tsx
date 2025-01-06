import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import DashboardStats from '../DashboardStats';
import ActivityFeed from '../ActivityFeed';
import ProcessSteps from '../ProcessSteps';
import StudentSchedule from '../StudentSchedule';
import StudentSwap from '../StudentSwap';
import RoommateFinder from '../roommate/RoommateFinder';

interface DashboardContentProps {
  isEmailVerified: boolean;
  activeView: string;
}

const DashboardContent = ({ isEmailVerified, activeView }: DashboardContentProps) => {
  const { toast } = useToast();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        toast({
          title: "Error loading profile",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
      return data;
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        (payload) => {
          console.log('Profile change received:', payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (!isEmailVerified) {
    return (
      <div className="lg:col-span-9">
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Email Verification Required</h2>
          <p className="text-white/70">
            Please verify your email address to access all features. Check your inbox for the verification link.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="lg:col-span-9">
        <div className="glass-card p-6">
          <p className="text-white">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeView) {
      case 'roommate':
        return <RoommateFinder />;
      case 'swap':
        return <StudentSwap />;
      case 'overview':
      default:
        return (
          <div className="grid gap-6">
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityFeed />
              <StudentSchedule />
            </div>
            <ProcessSteps />
          </div>
        );
    }
  };

  return (
    <div className="lg:col-span-9 space-y-6">
      {!profile && (
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Complete Your Profile</h2>
          <p className="text-white/70">
            Please complete your profile to access all features.
          </p>
        </div>
      )}

      {renderContent()}
    </div>
  );
};

export default DashboardContent;