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
        to="/invest" 
        className="text-sm text-foreground/80 hover:text-primary transition-all duration-300 font-medium"
      >
        Per Investitori
      </Link>
      <Link 
        to="/sell" 
        className="text-sm text-foreground/80 hover:text-primary transition-all duration-300 font-medium"
      >
        Vendi Immobile
      </Link>
      <Link 
        to="/rent" 
        className="text-sm text-foreground/80 hover:text-primary transition-all duration-300 font-medium"
      >
        Per Studenti
      </Link>
      <Link 
        to="/stay" 
        className="text-sm text-foreground/80 hover:text-primary transition-all duration-300 font-medium"
      >
        Soggiorni
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-foreground/80 hover:text-primary"
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

      <Button 
        asChild
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6"
      >
        <Link to="/auth">Accedi</Link>
      </Button>
    </div>
  );
}
