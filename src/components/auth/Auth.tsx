import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Session check error:', error);
        return;
      }

      if (session?.user) {
        handleAuthSuccess(session);
      }
    };

    checkSession();

    // Handle auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session);

      if (event === 'SIGNED_IN') {
        handleAuthSuccess(session);
      }

      if (event === 'SIGNED_OUT') {
        toast({
          title: "Disconnesso",
          description: "Hai effettuato il logout con successo.",
        });
        navigate('/auth');
      }

      if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed successfully');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleAuthSuccess = (session: any) => {
    if (!session?.user) return;

    // For test account, bypass verification
    if (session.user.email === 'test@jungle.com') {
      toast({
        title: "Benvenuto!",
        description: "Accesso effettuato con successo.",
      });
      navigate('/student');
      return;
    }

    // Check if email is verified
    if (session.user.email_confirmed_at) {
      toast({
        title: "Bentornato!",
        description: "Accesso effettuato con successo.",
      });
      navigate('/student');
    } else {
      toast({
        title: "Verifica la tua email",
        description: "Controlla la tua casella di posta per il link di verifica.",
      });
    }
  };

  const handleTestLogin = async () => {
    // Gate test login in production
    if (import.meta.env.PROD) {
      console.warn('Test login is disabled in production');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@jungle.com',
        password: 'testpassword123',
      });

      if (error) {
        console.error('Test login error:', error);
        toast({
          title: "Errore",
          description: "Impossibile accedere con l'account di test. Assicurati che esista in Supabase.",
          variant: "destructive",
        });
        return;
      }

      // Auth state change listener will handle the navigation
    } catch (error) {
      console.error('Test login error:', error);
      toast({
        title: "Errore",
        description: "Impossibile accedere con l'account di test. Assicurati che esista in Supabase.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#111111] to-[#222222] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Benvenuto su Jungle</h2>
          
          <div className="mb-6">
            {!import.meta.env.PROD && (
              <>
                <Button 
                  onClick={handleTestLogin}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3"
                >
                  Accesso Test Rapido (Salta Verifica)
                </Button>
                <p className="text-xs text-white/60 mt-2 text-center">
                  Solo per sviluppo: Accede automaticamente con test@jungle.com
                </p>
              </>
            )}
          </div>

          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#22c55e',
                    brandAccent: '#16a34a',
                  },
                },
              },
              className: {
                container: 'auth-container',
                button: 'auth-button',
                input: 'auth-input',
              },
            }}
            providers={[]}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;