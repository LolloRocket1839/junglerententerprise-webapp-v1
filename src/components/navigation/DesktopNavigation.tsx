import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

interface DesktopNavigationProps {
  onLanguageChange?: (lang: string) => void;
}

const languages = {
  IT: "Italiano",
  EN: "English",
  FR: "Français",
  DE: "Deutsch",
};

export default function DesktopNavigation({ onLanguageChange }: DesktopNavigationProps) {
  const { language, setLanguage, t } = useLanguage();

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
    </div>
  );
}