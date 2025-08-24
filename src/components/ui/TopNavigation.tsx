// COMPLETELY NEW NAVIGATION - NO OLD DEPENDENCIES
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Download, LogIn, LogOut, User, Home, Building, DollarSign, Bed, MapPin, Gift, ShoppingBag } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const TopNavigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { session, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "/properties", label: "Properties", icon: Building },
    { href: "/invest", label: "Invest", icon: DollarSign },
    { href: "/rent", label: "Rent", icon: Bed },
    { href: "/stay", label: "Stay", icon: MapPin },
    { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
    { href: "/referral", label: "Referral", icon: Gift },
  ];

  const handleLogoDownload = (format: 'SVG' | 'PDF') => {
    const svgContent = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#00ff88"/><text x="50" y="55" text-anchor="middle" fill="white" font-size="12" font-family="Arial, sans-serif">JR</text></svg>`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jungle-rent-logo.${format.toLowerCase()}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as 'en' | 'it' | 'ro' | 'es' | 'fr' | 'de');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-white hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-white hover:text-primary transition-colors">
                {language?.toUpperCase() || 'IT'}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleLanguageChange('it')}>
                  Italiano
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('fr')}>
                  Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('de')}>
                  Deutsch
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Section */}
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-primary">
                    <User className="w-4 h-4 mr-2" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <Link to="/auth">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link to="/" className="flex items-center space-x-3 text-lg font-semibold">
                    <Home className="w-5 h-5" />
                    Home
                  </Link>
                  
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="flex items-center space-x-3 text-lg font-medium hover:text-primary transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </Link>
                    );
                  })}

                  <div className="border-t pt-4 mt-4">
                    {session ? (
                      <>
                        <Link to="/dashboard" className="flex items-center space-x-3 text-lg font-medium mb-4">
                          <User className="w-5 h-5" />
                          Dashboard
                        </Link>
                        <Button 
                          onClick={() => signOut()}
                          variant="outline" 
                          className="w-full"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <Button asChild className="w-full">
                        <Link to="/auth">
                          <LogIn className="w-4 h-4 mr-2" />
                          Sign In
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;