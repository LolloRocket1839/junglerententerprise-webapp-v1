
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export const Phase2Placeholder = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="glass-card backdrop-blur-md bg-black/40 border-white/10 p-6">
      <div className="text-white/60">
        {t('availablePhase2')}
      </div>
    </Card>
  );
};
