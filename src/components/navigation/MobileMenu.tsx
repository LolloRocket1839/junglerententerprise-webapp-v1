import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MobileMenuProps {
  session: any;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: () => void;
}

const MobileMenu = ({ session, isOpen, onClose, onNavigate }: MobileMenuProps) => {
  const handleNavigation = () => {
    onClose();
    onNavigate();
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
          <Link
            to="/invest"
            className="text-lg text-white/80 hover:text-white transition-colors"
            onClick={handleNavigation}
          >
            Invest
          </Link>
          <Link
            to="/rent"
            className="text-lg text-white/80 hover:text-white transition-colors"
            onClick={handleNavigation}
          >
            Rent
          </Link>
          <Link
            to="/stay"
            className="text-lg text-white/80 hover:text-white transition-colors"
            onClick={handleNavigation}
          >
            Stay
          </Link>
          <Link
            to="/referral"
            className="text-lg text-white/80 hover:text-white transition-colors"
            onClick={handleNavigation}
          >
            Referral
          </Link>
          <Link
            to="/student"
            className="text-lg text-white/80 hover:text-white transition-colors"
            onClick={handleNavigation}
          >
            Student
          </Link>

          <div className="pt-6 border-t border-white/10">
            {session ? (
              <Button
                variant="outline"
                onClick={async () => {
                  await supabase.auth.signOut();
                  handleNavigation();
                }}
                className="w-full flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            ) : (
              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={handleNavigation}
                  className="w-full flex items-center justify-center gap-2"
                  asChild
                >
                  <Link to="/auth">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Link>
                </Button>
                <Button
                  variant="default"
                  onClick={handleNavigation}
                  className="w-full flex items-center justify-center gap-2"
                  asChild
                >
                  <Link to="/auth">
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </Link>
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