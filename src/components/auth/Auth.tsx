import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#111111] to-[#222222] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome to Jungle</h2>
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