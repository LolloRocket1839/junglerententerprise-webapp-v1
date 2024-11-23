import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/integrations/supabase/client";

interface LoginOverlayProps {
  onClose: () => void;
}

const LoginOverlay = ({ onClose }: LoginOverlayProps) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['google']}
        />
      </DialogContent>
    </Dialog>
  );
};

export default LoginOverlay;