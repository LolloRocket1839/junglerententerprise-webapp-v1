import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface LoginOverlayProps {
  onClose?: () => void;
}

const LoginOverlay = ({ onClose }: LoginOverlayProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        toast({
          title: "Welcome!",
          description: "Successfully logged in",
        });
        navigate('/');
        onClose?.();
      } else if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, onClose, toast]);

  return (
    <Dialog open onOpenChange={() => onClose?.()}>
      <DialogContent className="sm:max-w-[425px] glass">
        <DialogTitle className="text-2xl font-semibold mb-4 text-center">
          Welcome to Jungle Rent
        </DialogTitle>
        
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#22c55e',
                    brandAccent: '#16a34a',
                    inputBackground: 'transparent',
                    inputText: 'white',
                  },
                  borderWidths: {
                    buttonBorderWidth: '1px',
                    inputBorderWidth: '1px',
                  },
                  radii: {
                    borderRadiusButton: '0.5rem',
                    buttonBorderRadius: '0.5rem',
                    inputBorderRadius: '0.5rem',
                  },
                },
              },
              className: {
                container: 'gap-4',
                button: 'bg-primary hover:bg-primary/90 text-white',
                input: 'bg-background/50 border-input',
                divider: 'bg-muted/50',
              },
            }}
            theme="dark"
            providers={['google']}
            onlyThirdPartyProviders
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginOverlay;