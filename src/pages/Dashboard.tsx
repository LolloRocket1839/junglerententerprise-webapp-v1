import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { SmartDashboard } from '@/components/smart/SmartDashboard';
import { supabase } from '@/integrations/supabase/client';

export default function Dashboard() {
  const { session, isLoading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !session) {
      navigate('/auth');
    }
  }, [session, authLoading, navigate]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect to auth
  }

  // Check if email is verified (bypass for test account)
  const isEmailVerified = session.user.email === 'test@jungle.com' || !!session.user.email_confirmed_at;

  if (!isEmailVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Email non verificata</h1>
          <p className="text-muted-foreground">
            Controlla la tua email e clicca sul link di verifica per accedere alla dashboard.
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Profilo non trovato</h1>
          <p className="text-muted-foreground">
            Si è verificato un errore nel caricamento del profilo.
          </p>
        </div>
      </div>
    );
  }

  // Render unified smart dashboard for all user types
  return <SmartDashboard userType={profile.user_type} userState={profile} />;
}