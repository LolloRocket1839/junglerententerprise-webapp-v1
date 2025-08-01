import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { SmartDashboard } from '@/components/smart/SmartDashboard';
import { GlassCard } from '@/components/ui/glass-card';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Dashboard() {
  const { t } = useLanguage();
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
      <div className="min-h-screen bg-gradient-to-br from-[#1a472a] via-[#2d5a3f] to-[#3d6b52] flex items-center justify-center">
        <GlassCard className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-white/70">{t('loadingDashboard')}</p>
        </GlassCard>
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
      <div className="min-h-screen bg-gradient-to-br from-[#1a472a] via-[#2d5a3f] to-[#3d6b52] flex items-center justify-center">
        <GlassCard className="p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-white mb-4">{t('emailNotVerified')}</h1>
          <p className="text-white/70">
            {t('checkEmailVerification')}
          </p>
        </GlassCard>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a472a] via-[#2d5a3f] to-[#3d6b52] flex items-center justify-center">
        <GlassCard className="p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-white mb-4">{t('profileNotFound')}</h1>
          <p className="text-white/70">
            {t('profileLoadingError')}
          </p>
        </GlassCard>
      </div>
    );
  }

  // Render unified smart dashboard for all user types
  return <SmartDashboard userType={profile.user_type} userState={profile} />;
}