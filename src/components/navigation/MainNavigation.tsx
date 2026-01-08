import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, TreePalm, Building2 } from "lucide-react";
import MobileMenu from "./MobileMenu";
import DesktopNavigation from "./DesktopNavigation";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";

const MainNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { session, isLoading } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-sm shadow-sm border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link 
            to="/" 
            className="flex items-center gap-3"
          >
            {/* Shield Logo */}
            <div className="w-10 h-12 bg-primary rounded-t-full rounded-b-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-1 border border-primary-foreground/20 rounded-t-full rounded-b-md" />
              <div className="flex flex-col items-center z-10">
                <TreePalm className="w-4 h-4 text-primary-foreground" />
                <Building2 className="w-3 h-3 text-primary-foreground" />
              </div>
            </div>
            <span className="text-xl font-medium text-foreground">Jungle Rent</span>
          </Link>

          <DesktopNavigation 
            onLanguageChange={setLanguage}
          />
          
          <button 
            className="md:hidden p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all duration-300
                     active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <X size={24} className="text-foreground" />
            ) : (
              <Menu size={24} className="text-foreground" />
            )}
          </button>
        </div>
      </div>

      <MobileMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={() => {
          setIsMenuOpen(false);
          navigate('/');
        }}
      />
    </nav>
  );
};

export default MainNavigation;
