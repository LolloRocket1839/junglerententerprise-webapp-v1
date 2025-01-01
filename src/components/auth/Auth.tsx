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
    // Handle email verification
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        // Check if email is verified
        if (session?.user?.email_confirmed_at) {
          toast({
            title: "Welcome back!",
            description: "You've successfully signed in.",
          });
          navigate('/student');
        } else {
          toast({
            title: "Please verify your email",
            description: "Check your inbox for a verification link.",
          });
        }
      }

      if (event === 'USER_UPDATED') {
        if (session?.user?.email_confirmed_at) {
          toast({
            title: "Email verified!",
            description: "Your email has been successfully verified.",
          });
          navigate('/student');
        }
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleTestLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@jungle.com',
        password: 'testpassword123',
      });

      if (error) throw error;

      toast({
        title: "Test login successful",
        description: "You've been logged in with the test account.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login with test account. Make sure it exists in Supabase.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#111111] to-[#222222] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome to Jungle</h2>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6">
              <Button 
                onClick={handleTestLogin}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                Quick Test Login
              </Button>
              <p className="text-xs text-white/60 mt-2 text-center">
                Development only: test@jungle.com / testpassword123
              </p>
            </div>
          )}

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