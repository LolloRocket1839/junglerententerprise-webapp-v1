import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 h-full w-3/4 max-w-sm bg-[#1A1F2C] p-6 shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex-grow space-y-6">
            <button
              onClick={() => handleNavigation("/properties")}
              className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95 w-full
                         bg-primary/20 px-4 py-2 rounded-lg border border-primary/30 font-semibold"
            >
              🏠 Tutte le Proprietà
            </button>
            <button
              onClick={() => handleNavigation("/invest")}
              className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95 w-full"
            >
              {t('invest')}
            </button>
            <button
              onClick={() => handleNavigation("/rent")}
              className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95"
            >
              {t('rent')}
            </button>
            <button
              onClick={() => handleNavigation("/marketplace")}
              className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95"
            >
              {t('marketplace')}
            </button>
            <button
              onClick={() => handleNavigation("/stay")}
              className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95"
            >
              {t('stay')}
            </button>
            <button
              onClick={() => handleNavigation("/referral")}
              className="text-lg text-left text-white/90 hover:text-white transition-colors active:scale-95"
            >
              {t('referral')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
