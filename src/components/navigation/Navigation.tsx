
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Download } from "lucide-react";
import MobileMenu from "./MobileMenu";
// Force cache refresh with timestamp comment
import DesktopNav from "./DesktopNav";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { session } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Remove unused handler since we use setLanguage directly
  const handleLogoDownload = (format: string) => {
    const logoUrl = "/lovable-uploads/1b19592a-c8d6-4a22-8f33-b07c78292f13.png";
    const link = document.createElement('a');
    
    if (format === 'jpg' || format === 'png') {
      // Convert to JPG if needed
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        if (format === 'jpg') {
          ctx!.fillStyle = '#FFFFFF';
          ctx!.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        ctx!.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = `jungle-rent-logo.${format}`;
            link.click();
            URL.revokeObjectURL(url);
          }
        }, `image/${format === 'jpg' ? 'jpeg' : 'png'}`);
      };
      
      img.crossOrigin = 'anonymous';
      img.src = logoUrl;
    } else if (format === 'svg') {
      // Create SVG version
      const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="100" fill="#10B981"/>
          <text x="100" y="110" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">JR</text>
        </svg>
      `;
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = 'jungle-rent-logo.svg';
      link.click();
      URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      // For PDF, we'll use a simple approach with canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = 400;
        canvas.height = 400;
        
        ctx!.fillStyle = '#FFFFFF';
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
        ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Convert to PDF would require a PDF library, so we'll download as high-res PNG with PDF name
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = 'jungle-rent-logo.pdf.png';
            link.click();
            URL.revokeObjectURL(url);
          }
        }, 'image/png');
      };
      
      img.crossOrigin = 'anonymous';
      img.src = logoUrl;
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#1A1F2C]/95 backdrop-blur-sm shadow-lg border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center gap-2">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-xl sm:text-2xl font-medium bg-gradient-to-r from-primary via-primary-light to-primary 
                       bg-clip-text text-transparent transition-all duration-300 hover:scale-105"
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <img 
                    src="/lovable-uploads/1b19592a-c8d6-4a22-8f33-b07c78292f13.png" 
                    alt="Jungle Rent Logo" 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem onClick={() => handleLogoDownload('jpg')} className="cursor-pointer">
                    <Download size={16} className="mr-2" />
                    {t('download')} JPG
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLogoDownload('png')} className="cursor-pointer">
                    <Download size={16} className="mr-2" />
                    {t('download')} PNG
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLogoDownload('svg')} className="cursor-pointer">
                    <Download size={16} className="mr-2" />
                    {t('download')} SVG
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLogoDownload('pdf')} className="cursor-pointer">
                    <Download size={16} className="mr-2" />
                    {t('download')} PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <span>Jungle Rent</span>
            </Link>
          </div>

          <DesktopNav 
            onLanguageChange={setLanguage}
          />
          
          <button 
            className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300
                     active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
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

export default Navigation;
