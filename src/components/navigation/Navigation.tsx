import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import MobileMenu from "./MobileMenu";
import DesktopNav from "./DesktopNav";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-[#1A1F2C]/95 backdrop-blur-sm border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          <Link 
            to="/" 
            className="text-xl sm:text-2xl font-medium bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent pt-2"
          >
            Jungle Rent
          </Link>

          <DesktopNav session={session} />
          
          <button 
            className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Menu di navigazione"
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
        session={session}
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