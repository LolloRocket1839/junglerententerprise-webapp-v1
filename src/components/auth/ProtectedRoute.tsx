import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { GlassCard } from '@/components/ui/glass-card';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireEmailVerification?: boolean;
}

export function ProtectedRoute({ children, requireEmailVerification = false }: ProtectedRouteProps) {
  const { session, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassCard className="p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="text-center mt-4">Loading...</p>
        </GlassCard>
      </div>
    );
  }

  if (!session || !user) {
    // Redirect to auth page with return URL
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check email verification if required
  if (requireEmailVerification) {
    const isEmailVerified = user.email === 'test@jungle.com' || !!user.email_confirmed_at;
    
    if (!isEmailVerified) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <GlassCard className="max-w-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Email Verification Required</h2>
            <p className="text-muted-foreground">
              Please check your email and click the verification link before accessing this page.
            </p>
          </GlassCard>
        </div>
      );
    }
  }

  return <>{children}</>;
}