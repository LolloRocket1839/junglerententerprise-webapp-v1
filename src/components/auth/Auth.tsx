import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md glass p-8 rounded-xl">
        <h1 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
          Welcome to Jungle Rent
        </h1>
        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#4CAF50',
                  brandAccent: '#388E3C',
                }
              }
            },
            className: {
              container: 'glass',
              button: 'glass-button',
              input: 'glass-input',
            }
          }}
          providers={[]}
        />
      </div>
    </div>
  );
};

export default Auth;