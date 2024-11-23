import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface LoginOverlayProps {
  onClose?: () => void;
}

const LoginOverlay = ({ onClose }: LoginOverlayProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/');
        onClose?.();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, onClose]);

  return (
    <Dialog open onOpenChange={() => onClose?.()}>
      <DialogContent className="sm:max-w-[425px] glass">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#22c55e',
                  brandAccent: '#16a34a',
                }
              }
            }
          }}
          theme="dark"
          providers={['google']}
        />
      </DialogContent>
    </Dialog>
  );
};

export default LoginOverlay;