
import { UnifiedSearch } from "@/components/rent/UnifiedSearch";
import { JungleLayers } from "@/components/backgrounds/JungleLayers";
import { LeafOverlay } from "@/components/backgrounds/LeafOverlay";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from '@/contexts/LanguageContext';

export default function Rent() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') as 'property' | 'roommate' || 'property';
  const searchQuery = searchParams.get('search') || '';

  return (
    <JungleLayers>
      <LeafOverlay />
      <main className="container mx-auto px-4 min-h-screen py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              {t('findIdealHome')}
            </h1>
            <p className="text-white/70 text-lg">
              {t('intelligentSearch')}
            </p>
          </div>
          
          <UnifiedSearch initialTab={tab} searchQuery={searchQuery} />
        </div>
      </main>
    </JungleLayers>
  );
}
