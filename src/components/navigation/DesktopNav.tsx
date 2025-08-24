import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, UserPlus, Globe, Check, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DesktopNavProps {
  onLanguageChange?: (lang: string) => void;
}

const languages = {
  IT: "Italiano",
  EN: "English",
  FR: "Français",
  DE: "Deutsch",
};

// Navigation component for desktop and mobile
export function DesktopNav({ onLanguageChange }: DesktopNavProps) {
  const { language, setLanguage, t } = useLanguage();
  const { session, signOut } = useAuth();

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as 'en' | 'it' | 'ro' | 'es' | 'fr' | 'de');
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  return (
    <div className="hidden md:flex items-center space-x-6">
      <Link 
        to="/properties" 
        className="text-base text-white/90 hover:text-white transition-all duration-300 
                   hover:border-b-2 hover:border-primary font-sans tracking-wide font-semibold
                   bg-primary/20 px-3 py-1 rounded-full border border-primary/30"
      >
        🏠 Tutte le Proprietà
      </Link>
      <Link 
        to="/invest" 
        className="text-base text-white/80 hover:text-white transition-all duration-300 
                   hover:border-b-2 hover:border-primary font-sans tracking-wide"
      >
        {t('invest')}
      </Link>
      <Link 
        to="/rent" 
        className="text-base text-white/80 hover:text-white transition-all duration-300 
                   hover:border-b-2 hover:border-primary font-sans tracking-wide"
      >
        {t('rent')}
      </Link>
      <Link 
        to="/marketplace" 
        className="text-base text-white/80 hover:text-white transition-all duration-300 
                   hover:border-b-2 hover:border-primary font-sans tracking-wide"
      >
        {t('marketplace')}
      </Link>
      <Link 
        to="/stay" 
        className="text-base text-white/80 hover:text-white transition-all duration-300 
                   hover:border-b-2 hover:border-primary font-sans tracking-wide"
      >
        {t('stay')}
      </Link>
      <Link 
        to="/referral" 
        className="text-base text-white/80 hover:text-white transition-all duration-300 
                   hover:border-b-2 hover:border-primary font-sans tracking-wide"
      >
        {t('referral')}
      </Link>
      <Link 
        to="/admin" 
        className="text-base text-white/80 hover:text-white transition-all duration-300 
                   hover:border-b-2 hover:border-primary font-sans tracking-wide"
      >
        Admin
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
              onClick={() => handleLanguageChange(code)}
            >
              {name}
              {language === code && <Check className="w-4 h-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      {session ? (
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center gap-2 text-white/80 hover:text-white"
            asChild
          >
            <Link to="/dashboard">
              <User className="w-4 h-4" />
              Dashboard
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={signOut}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white"
          >
            <LogOut className="w-4 h-4" />
            {t('signOut')}
          </Button>
        </div>
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
              {t('signIn')}
            </Link>
          </Button>
          <Button 
            variant="default"
            size="sm"
            className="flex items-center gap-2 bg-[#F97316] hover:bg-[#FB923C] text-white
                     shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <Link to="/auth">
              <UserPlus className="w-4 h-4" />
              {t('register')}
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
