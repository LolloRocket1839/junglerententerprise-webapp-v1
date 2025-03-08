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
  language: string;
}

const menuItems = {
  IT: {
    invest: "Investi",
    rent: "Affitta",
    marketplace: "Marketplace",
    stay: "Soggiorna",
    students: "Studenti",
    referral: "Referral",
    signOut: "Esci",
    signIn: "Accedi",
    register: "Registrati",
    signOutSuccess: "Disconnessione effettuata",
    signOutMessage: "Torna presto!",
    signOutError: "Errore durante la disconnessione",
    tryAgain: "Riprova più tardi",
  },
  EN: {
    invest: "Invest",
    rent: "Rent",
    marketplace: "Marketplace",
    stay: "Stay",
    students: "Students",
    referral: "Referral",
    signOut: "Sign Out",
    signIn: "Sign In",
    register: "Register",
    signOutSuccess: "Signed out successfully",
    signOutMessage: "Come back soon!",
    signOutError: "Error signing out",
    tryAgain: "Please try again later",
  },
  FR: {
    invest: "Investir",
    rent: "Louer",
    marketplace: "Marketplace",
    stay: "Séjourner",
    students: "Étudiants",
    referral: "Parrainage",
    signOut: "Déconnexion",
    signIn: "Connexion",
    register: "S'inscrire",
    signOutSuccess: "Déconnexion réussie",
    signOutMessage: "À bientôt !",
    signOutError: "Erreur de déconnexion",
    tryAgain: "Veuillez réessayer plus tard",
  },
  DE: {
    invest: "Investieren",
    rent: "Mieten",
    marketplace: "Marktplatz",
    stay: "Aufenthalt",
    students: "Studenten",
    referral: "Empfehlung",
    signOut: "Abmelden",
    signIn: "Anmelden",
    register: "Registrieren",
    signOutSuccess: "Erfolgreich abgemeldet",
    signOutMessage: "Bis bald!",
    signOutError: "Fehler beim Abmelden",
    tryAgain: "Bitte versuchen Sie es später erneut",
  },
};

const MobileMenu = ({ session, isOpen, onClose, onNavigate, language = "IT" }: MobileMenuProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const text = menuItems[language as keyof typeof menuItems];

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
        title: text.signOutSuccess,
        description: text.signOutMessage,
      });
    } catch (error) {
      toast({
        title: text.signOutError,
        description: text.tryAgain,
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
        <div className="flex flex-col h-full">
          <div className="flex-grow space-y-6">
            <button
              onClick={() => handleNavigation("/invest")}
              className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95 w-full"
            >
              {text.invest}
            </button>
            <button
              onClick={() => handleNavigation("/rent")}
              className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95"
            >
              {text.rent}
            </button>
            <button
              onClick={() => handleNavigation("/marketplace")}
              className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95"
            >
              {text.marketplace}
            </button>
            <button
              onClick={() => handleNavigation("/stay")}
              className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95"
            >
              {text.stay}
            </button>
            <button
              onClick={() => handleNavigation("/student")}
              className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95"
            >
              {text.students}
            </button>
            <button
              onClick={() => handleNavigation("/referral")}
              className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95"
            >
              {text.referral}
            </button>
          </div>

          <div className="pt-6 border-t border-white/20">
            {session ? (
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                <LogOut className="w-4 h-4" />
                {text.signOut}
              </Button>
            ) : (
              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={() => handleNavigation("/auth")}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <LogIn className="w-4 h-4" />
                  {text.signIn}
                </Button>
                <Button
                  variant="default"
                  onClick={() => handleNavigation("/auth")}
                  className="w-full flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#FB923C] text-white"
                >
                  <UserPlus className="w-4 h-4" />
                  {text.register}
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
