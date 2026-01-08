import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: () => void;
}

const MobileMenu = ({ isOpen, onClose, onNavigate }: MobileMenuProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleNavigation = (path: string) => {
    onClose();
    onNavigate();
    navigate(path);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 h-full w-3/4 max-w-sm bg-background p-6 shadow-xl border-l border-border">
        <div className="flex flex-col h-full">
          <button
            onClick={onClose}
            className="self-end p-2 mb-6 rounded-lg hover:bg-muted transition-colors"
            aria-label="Close menu"
          >
            <X size={24} className="text-foreground" />
          </button>
          
          <div className="flex-grow space-y-4">
            <button
              onClick={() => handleNavigation("/invest")}
              className="text-lg text-left text-foreground hover:text-primary transition-colors w-full py-2 border-b border-border"
            >
              Per Investitori
            </button>
            <button
              onClick={() => handleNavigation("/sell")}
              className="text-lg text-left text-foreground hover:text-primary transition-colors w-full py-2 border-b border-border"
            >
              Vendi Immobile
            </button>
            <button
              onClick={() => handleNavigation("/rent")}
              className="text-lg text-left text-foreground hover:text-primary transition-colors w-full py-2 border-b border-border"
            >
              Per Studenti
            </button>
            <button
              onClick={() => handleNavigation("/stay")}
              className="text-lg text-left text-foreground hover:text-primary transition-colors w-full py-2 border-b border-border"
            >
              Soggiorni
            </button>
            <button
              onClick={() => handleNavigation("/marketplace")}
              className="text-lg text-left text-foreground hover:text-primary transition-colors w-full py-2 border-b border-border"
            >
              Marketplace
            </button>
          </div>

          <button
            onClick={() => handleNavigation("/auth")}
            className="w-full py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            Accedi
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
