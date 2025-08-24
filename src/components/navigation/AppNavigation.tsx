// Fresh Navigation Component - 2025.1.24
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Download } from "lucide-react";
import MobileMenu from "./MobileMenu";
import DesktopNavigation from "./DesktopNavigation";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const AppNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { session } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoDownload = (format: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    canvas.width = 400;
    canvas.height = 400;
    
    // Create gradient background
    const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200);
    gradient.addColorStop(0, '#10B981');
    gradient.addColorStop(1, '#059669');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);
    
    // Add text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('JUNGLE', 200, 180);
    ctx.font = 'bold 36px Arial';
    ctx.fillText('LIVING', 200, 230);
    
    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (!blob) return;
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `jungle-living-logo.${format.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, `image/${format === 'JPG' ? 'jpeg' : format.toLowerCase()}`);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/80 backdrop-blur-lg shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Link 
                  to="/" 
                  className="text-2xl font-bold text-white flex items-center gap-3 
                           hover:scale-105 transition-transform duration-300 group cursor-pointer"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-glow 
                                rounded-full flex items-center justify-center shadow-lg
                                group-hover:shadow-primary/30 transition-all duration-300">
                    <span className="text-white font-bold text-lg">🏠</span>
                  </div>
                  <span className="bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent
                               font-sans tracking-wide">
                    JUNGLE LIVING
                  </span>
                  <Download className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                </Link>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={() => handleLogoDownload('PNG')}>
                  Download PNG Logo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLogoDownload('JPG')}>
                  Download JPG Logo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLogoDownload('SVG')}>
                  Download SVG Logo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLogoDownload('PDF')}>
                  Download PDF Logo
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <DesktopNavigation />

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        onNavigate={() => setIsMenuOpen(false)}
      />
    </nav>
  );
};

export default AppNavigation;