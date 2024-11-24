import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Invest from "./pages/Invest";
import Stay from "./pages/Stay";
import Rent from "./pages/Rent";
import Referral from "./pages/Referral";
import JungleHelp from "./components/chat/JungleHelp";
import ListRoom from "./pages/ListRoom";
import StudentDashboard from "./components/rent/StudentDashboard";

const queryClient = new QueryClient();

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'glass' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-medium bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
            Jungle Rent
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/invest" className="text-sm text-white/80 hover:text-white transition-colors">
              Invest
            </Link>
            <Link to="/rent" className="text-sm text-white/80 hover:text-white transition-colors">
              Rent
            </Link>
            <Link to="/stay" className="text-sm text-white/80 hover:text-white transition-colors">
              Stay
            </Link>
            <Link to="/referral" className="text-sm text-white/80 hover:text-white transition-colors">
              Referral
            </Link>
            <Link to="/student" className="text-sm text-white/80 hover:text-white transition-colors">
              Student
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white/80 hover:text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in glass">
            <Link to="/invest" className="block px-4 py-2 text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
              Invest
            </Link>
            <Link to="/rent" className="block px-4 py-2 text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
              Rent
            </Link>
            <Link to="/stay" className="block px-4 py-2 text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
              Stay
            </Link>
            <Link to="/referral" className="block px-4 py-2 text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
              Referral
            </Link>
            <Link to="/student" className="block px-4 py-2 text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
              Student
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/invest" element={<Invest />} />
              <Route path="/rent" element={<Rent />} />
              <Route path="/stay" element={<Stay />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/list-room" element={<ListRoom />} />
              <Route path="/student" element={<StudentDashboard />} />
            </Routes>
          </div>
          <JungleHelp />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;