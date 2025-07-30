import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileMenuProps {
  session: any;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: () => void;
  
}

const MobileMenu = ({ session, isOpen, onClose, onNavigate }: MobileMenuProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

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
        title: t('signOutSuccess'),
        description: t('signOutMessage'),
      });
    } catch (error) {
      toast({
        title: t('signOutError'),
        description: t('tryAgain'),
        variant: "destructive",
      });
    }
  };

  console.log('MobileMenu rendering with properties link');
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
              onClick={() => handleNavigation("/properties")}
              className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95 w-full
                         bg-primary/20 px-4 py-2 rounded-lg border border-primary/30 font-semibold"
            >
              🏠 Tutte le Proprietà
            </button>
            <button
              onClick={() => handleNavigation("/invest")}
              className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95 w-full"
            >
              {t('invest')}
            </button>
            <button
              onClick={() => handleNavigation("/rent")}
              className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95"
            >
              {t('rent')}
            </button>
            <button
              onClick={() => handleNavigation("/marketplace")}
              className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95"
            >
              {t('marketplace')}
            </button>
            <button
              onClick={() => handleNavigation("/stay")}
              className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95"
            >
              {t('stay')}
            </button>
            <button
              onClick={() => handleNavigation("/referral")}
              className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95"
            >
              {t('referral')}
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
                {t('signOut')}
              </Button>
            ) : (
              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={() => handleNavigation("/auth")}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <LogIn className="w-4 h-4" />
                  {t('signIn')}
                </Button>
                <Button
                  variant="default"
                  onClick={() => handleNavigation("/auth")}
                  className="w-full flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#FB923C] text-white"
                >
                  <UserPlus className="w-4 h-4" />
                  {t('register')}
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
