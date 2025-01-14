import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DesktopNavProps {
  session: any;
}

const DesktopNav = ({ session }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link to="/invest" className="text-sm text-white/80 hover:text-white transition-colors">
        Investi
      </Link>
      <Link to="/rent" className="text-sm text-white/80 hover:text-white transition-colors">
        Affitta
      </Link>
      <Link to="/marketplace" className="text-sm text-white/80 hover:text-white transition-colors">
        Marketplace
      </Link>
      <Link to="/stay" className="text-sm text-white/80 hover:text-white transition-colors">
        Soggiorna
      </Link>
      <Link to="/student" className="text-sm text-white/80 hover:text-white transition-colors">
        Studenti
      </Link>
      <Link to="/referral" className="text-sm text-white/80 hover:text-white transition-colors">
        Referral
      </Link>
      
      {session ? (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => supabase.auth.signOut()}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Esci
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
            asChild
          >
            <Link to="/auth">
              <LogIn className="w-4 h-4" />
              Accedi
            </Link>
          </Button>
          <Button 
            variant="default"
            size="sm"
            className="flex items-center gap-2"
            asChild
          >
            <Link to="/auth">
              <UserPlus className="w-4 h-4" />
              Registrati
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default DesktopNav;