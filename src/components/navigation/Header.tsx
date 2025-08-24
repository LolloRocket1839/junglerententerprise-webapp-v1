// Brand New Header Component 2025-01-24
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Download } from "lucide-react";
import MobileMenu from "./MobileMenu";
import DesktopNavigation from "./DesktopNavigation";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { session } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoDownload = (format: 'SVG' | 'PDF') => {
    if (format === 'SVG') {
      const svgContent = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#00ff88"/><text x="50" y="55" text-anchor="middle" fill="white" font-size="12" font-family="Arial, sans-serif">JR</text></svg>`;
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'jungle-rent-logo.svg';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 text-xl font-bold text-white hover:text-primary transition-colors">
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-primary hover:bg-primary/80 text-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/20">
                  JR
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleLogoDownload('SVG')}>
                    Download SVG Logo
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLogoDownload('PDF')}>
                    Download PDF Logo
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <span>Jungle Rent</span>
            </Link>

            <DesktopNavigation />

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        onNavigate={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default Header;