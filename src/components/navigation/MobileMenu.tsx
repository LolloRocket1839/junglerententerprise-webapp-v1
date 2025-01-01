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
        title: "Signed out successfully",
        description: "Come back soon!",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again",
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
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 h-full w-3/4 max-w-sm bg-gradient-to-b from-background to-background/95 p-6 shadow-xl">
        <div className="flex flex-col space-y-6">
          <button
            onClick={() => handleNavigation("/invest")}
            className="text-lg text-left text-white/80 hover:text-white transition-colors"
          >
            Invest
          </button>
          <button
            onClick={() => handleNavigation("/rent")}
            className="text-lg text-left text-white/80 hover:text-white transition-colors"
          >
            Rent
          </button>
          <button
            onClick={() => handleNavigation("/stay")}
            className="text-lg text-left text-white/80 hover:text-white transition-colors"
          >
            Stay
          </button>
          <button
            onClick={() => handleNavigation("/referral")}
            className="text-lg text-left text-white/80 hover:text-white transition-colors"
          >
            Referral
          </button>
          <button
            onClick={() => handleNavigation("/student")}
            className="text-lg text-left text-white/80 hover:text-white transition-colors"
          >
            Student
          </button>

          <div className="pt-6 border-t border-white/10">
            {session ? (
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            ) : (
              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={() => handleNavigation("/auth")}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
                <Button
                  variant="default"
                  onClick={() => handleNavigation("/auth")}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
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