import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Globe, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { UserMode, AdminMode } from "@/lib/types";

interface JungleHeaderProps {
  userMode: UserMode | AdminMode;
  onModeChange: (mode: UserMode | AdminMode | null) => void;
}

export function JungleHeader({ userMode, onModeChange }: JungleHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const getModeLabel = () => {
    switch (userMode) {
      case "investor":
        return "Investitore";
      case "student":
        return "Studente";
      case "tourist":
        return "Turista";
      case "administrator":
        return "Admin";
      default:
        return "";
    }
  };

  const getModeColor = () => {
    switch (userMode) {
      case "investor":
        return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20";
      case "student":
        return "bg-primary/10 text-primary border-primary/20";
      case "tourist":
        return "bg-amber-500/10 text-amber-700 border-amber-500/20";
      case "administrator":
        return "bg-purple-500/10 text-purple-700 border-purple-500/20";
      default:
        return "";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onModeChange(null)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/lovable-uploads/1b19592a-c8d6-4a22-8f33-b07c78292f13.png" 
              alt="Jungle Rent" 
              className="h-8 w-auto rounded"
            />
            <span className="font-serif font-bold text-xl text-foreground hidden sm:inline">
              Jungle Rent
            </span>
          </button>
          
          {userMode && (
            <Badge className={getModeColor()}>
              {getModeLabel()}
            </Badge>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                {language.toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("it")}>
                🇮🇹 Italiano
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                🇬🇧 English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mode Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <User className="h-4 w-4" />
                Cambia Modalità
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onModeChange("investor")}>
                💰 Investitore
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onModeChange("student")}>
                🎓 Studente
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onModeChange("tourist")}>
                ✈️ Turista
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onModeChange("administrator")}>
                ⚙️ Amministratore
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Logout */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onModeChange(null)}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            {t("nav.logout")}
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2 bg-transparent"
            onClick={() => {
              setLanguage(language === "it" ? "en" : "it");
              setIsMobileMenuOpen(false);
            }}
          >
            <Globe className="h-4 w-4" />
            {language === "it" ? "English" : "Italiano"}
          </Button>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">Cambia Modalità</p>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-transparent"
                onClick={() => { onModeChange("investor"); setIsMobileMenuOpen(false); }}
              >
                💰 Investitore
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-transparent"
                onClick={() => { onModeChange("student"); setIsMobileMenuOpen(false); }}
              >
                🎓 Studente
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-transparent"
                onClick={() => { onModeChange("tourist"); setIsMobileMenuOpen(false); }}
              >
                ✈️ Turista
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-transparent"
                onClick={() => { onModeChange("administrator"); setIsMobileMenuOpen(false); }}
              >
                ⚙️ Admin
              </Button>
            </div>
          </div>

          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2"
            onClick={() => { onModeChange(null); setIsMobileMenuOpen(false); }}
          >
            <LogOut className="h-4 w-4" />
            {t("nav.logout")}
          </Button>
        </div>
      )}
    </header>
  );
}
