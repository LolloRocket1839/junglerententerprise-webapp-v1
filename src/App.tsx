import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Index from "./pages/Index";
import Invest from "./pages/Invest";
import Stay from "./pages/Stay";
import Rent from "./pages/Rent";
import Referral from "./pages/Referral";
import LoginOverlay from "./components/auth/LoginOverlay";
import JungleHelp from "./components/chat/JungleHelp";

const queryClient = new QueryClient();

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                <Link to="/" className="text-xl font-bold text-primary">
                  Jungle Rent
                </Link>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-4">
                  <Button variant="ghost" asChild className="text-secondary">
                    <Link to="/invest">Invest</Link>
                  </Button>
                  <Button variant="ghost" asChild className="text-secondary">
                    <Link to="/rent">Rent</Link>
                  </Button>
                  <Button variant="ghost" asChild className="text-secondary">
                    <Link to="/stay">Stay</Link>
                  </Button>
                  <Button variant="ghost" asChild className="text-secondary">
                    <Link to="/referral">Referral</Link>
                  </Button>
                  <Button variant="default" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                </div>

                {/* Mobile Menu Button */}
                <button 
                  className="md:hidden text-secondary p-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              {/* Mobile Navigation */}
              {isMenuOpen && (
                <div className="md:hidden py-4 space-y-2 animate-fade-in">
                  <Button variant="ghost" asChild className="w-full text-secondary justify-start">
                    <Link to="/invest" onClick={() => setIsMenuOpen(false)}>Invest</Link>
                  </Button>
                  <Button variant="ghost" asChild className="w-full text-secondary justify-start">
                    <Link to="/rent" onClick={() => setIsMenuOpen(false)}>Rent</Link>
                  </Button>
                  <Button variant="ghost" asChild className="w-full text-secondary justify-start">
                    <Link to="/stay" onClick={() => setIsMenuOpen(false)}>Stay</Link>
                  </Button>
                  <Button variant="ghost" asChild className="w-full text-secondary justify-start">
                    <Link to="/referral" onClick={() => setIsMenuOpen(false)}>Referral</Link>
                  </Button>
                  <Button variant="default" asChild className="w-full justify-start">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/stay" element={<Stay />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/login" element={<LoginOverlay />} />
          </Routes>
          <JungleHelp />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;