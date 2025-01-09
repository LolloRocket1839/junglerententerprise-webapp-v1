import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface MobileMenuProps {
  session: any;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: () => void;
}

const MobileMenu = ({ session, isOpen, onClose, onNavigate }: MobileMenuProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNavigation = (path: string) => {
    onClose();
    onNavigate();
    navigate(path);
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      handleNavigation('/');
      toast({
        title: "Disconnessione effettuata",
        description: "Torna presto!",
      });
    } catch (error) {
      toast({
        title: "Errore durante la disconnessione",
        description: "Riprova più tardi",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 h-full w-3/4 max-w-sm bg-[#1A1F2C] p-6 shadow-xl">
        <div className="flex flex-col space-y-6">
          <button
            onClick={() => handleNavigation("/invest")}
            className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95"
          >
            Investi
          </button>
          <button
            onClick={() => handleNavigation("/rent")}
            className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95"
          >
            Affitta
          </button>
          <button
            onClick={() => handleNavigation("/marketplace")}
            className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95"
          >
            Marketplace
          </button>
          <button
            onClick={() => handleNavigation("/stay")}
            className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95"
          >
            Soggiorna
          </button>
          <button
            onClick={() => handleNavigation("/student")}
            className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95"
          >
            Studenti
          </button>
          <button
            onClick={() => handleNavigation("/referral")}
            className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95"
          >
            Referral
          </button>

          <div className="pt-6 border-t border-white/20">
            {session ? (
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                <LogOut className="w-4 h-4" />
                Esci
              </Button>
            ) : (
              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={() => handleNavigation("/auth")}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <LogIn className="w-4 h-4" />
                  Accedi
                </Button>
                <Button
                  variant="default"
                  onClick={() => handleNavigation("/auth")}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-background"
                >
                  <UserPlus className="w-4 h-4" />
                  Registrati
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;