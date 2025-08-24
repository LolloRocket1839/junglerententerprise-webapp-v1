// ABSOLUTE FRESH START - DIFFERENT LOCATION 2025
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, LogIn, LogOut, User, Home, Building, DollarSign, Bed, MapPin, Gift, ShoppingBag } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const AppHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { session, signOut } = useAuth();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationLinks = [
    { href: "/properties", label: "Properties", icon: Building },
    { href: "/invest", label: "Invest", icon: DollarSign },
    { href: "/rent", label: "Rent", icon: Bed },
    { href: "/stay", label: "Stay", icon: MapPin },
    { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
    { href: "/referral", label: "Referral", icon: Gift },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 text-xl font-bold text-white hover:text-primary transition-colors">
            <div className="bg-primary hover:bg-primary/80 text-white p-2 rounded-full transition-colors">
              JR
            </div>
            <span>Jungle Rent</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navigationLinks.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-white hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger className="text-white hover:text-primary transition-colors">
                {language?.toUpperCase() || 'IT'}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage('it' as any)}>Italiano</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en' as any)}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('fr' as any)}>Français</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('de' as any)}>Deutsch</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
                  
                  {navigationLinks.map((item) => {
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
                        <Button onClick={() => signOut()} variant="outline" className="w-full">
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