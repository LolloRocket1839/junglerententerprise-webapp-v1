import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, UserPlus, Globe, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface DesktopNavProps {
  session: any;
}

const DesktopNav = ({ session }: DesktopNavProps) => {
  const [language, setLanguage] = useState("IT");

  const languages = {
    IT: "Italiano",
    EN: "English",
    FR: "Français",
    DE: "Deutsch",
  };

  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link 
        to="/invest" 
        className="text-base text-white/80 hover:text-white transition-all duration-300 
                   hover:border-b-2 hover:border-primary font-sans tracking-wide"
      >
        Investi
      </Link>
      <Link 
        to="/rent" 
        className="text-base text-white/80 hover:text-white transition-all duration-300 
                   hover:border-b-2 hover:border-primary font-sans tracking-wide"
      >
        Affitta
      </Link>
      <Link 
        to="/marketplace" 
        className="text-base text-white/80 hover:text-white transition-all duration-300 
                   hover:border-b-2 hover:border-primary font-sans tracking-wide"
      >
        Marketplace
      </Link>
      <Link 
        to="/stay" 
        className="text-base text-white/80 hover:text-white transition-all duration-300 
                   hover:border-b-2 hover:border-primary font-sans tracking-wide"
      >
        Soggiorna
      </Link>
      <Link 
        to="/student" 
        className="text-base text-white/80 hover:text-white transition-all duration-300 
                   hover:border-b-2 hover:border-primary font-sans tracking-wide"
      >
        Studenti
      </Link>
      <Link 
        to="/referral" 
        className="text-base text-white/80 hover:text-white transition-all duration-300 
                   hover:border-b-2 hover:border-primary font-sans tracking-wide"
      >
        Referral
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-white/80 hover:text-white"
          >
            <Globe className="w-4 h-4" />
            {language}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          {Object.entries(languages).map(([code, name]) => (
            <DropdownMenuItem
              key={code}
              className="flex items-center justify-between"
              onClick={() => setLanguage(code)}
            >
              {name}
              {language === code && <Check className="w-4 h-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      {session ? (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => supabase.auth.signOut()}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white"
        >
          <LogOut className="w-4 h-4" />
          Esci
        </Button>
      ) : (
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2 bg-black/40 hover:bg-black/60 text-white border-white/20
                     shadow-lg hover:shadow-xl transition-all duration-300"
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
            className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white
                     shadow-lg hover:shadow-xl transition-all duration-300"
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
