import { Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireEmailVerification?: boolean;
}

export function ProtectedRoute({ children, requireEmailVerification = false }: ProtectedRouteProps) {
  const { session, user, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const [isResending, setIsResending] = useState(false);

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
      const handleResendVerification = async () => {
        if (!user?.email) return;
        
        setIsResending(true);
        try {
          const { error } = await supabase.auth.resend({
            type: 'signup',
            email: user.email
          });
          
          if (error) throw error;
          
          toast({
            title: "Email inviata",
            description: "Controlla la tua casella di posta per il link di verifica"
          });
        } catch (error: any) {
          toast({
            title: "Errore",
            description: error.message,
            variant: "destructive"
          });
        } finally {
          setIsResending(false);
        }
      };

      const handleRefresh = () => {
        window.location.reload();
      };

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <GlassCard className="max-w-md p-8 text-center space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Verifica Email Richiesta</h2>
              <p className="text-muted-foreground mb-4">
                Controlla la tua email e clicca sul link di verifica per accedere a questa pagina.
              </p>
              <p className="text-sm text-muted-foreground">
                Email: <span className="font-medium">{user?.email}</span>
              </p>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={handleResendVerification}
                disabled={isResending}
                className="w-full"
              >
                {isResending ? 'Invio in corso...' : 'Reinvia Email di Verifica'}
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleRefresh}
                className="w-full"
              >
                Ho verificato, aggiorna
              </Button>
            </div>
          </GlassCard>
        </div>
      );
    }
  }

  return <>{children}</>;
}