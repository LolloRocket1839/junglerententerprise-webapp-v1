import { UnifiedSearch } from "@/components/rent/UnifiedSearch";
import { JungleLayers } from "@/components/backgrounds/JungleLayers";
import { LeafOverlay } from "@/components/backgrounds/LeafOverlay";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export default function Rent() {
  console.log('[Rent] Component rendering');
  
  const { t } = useLanguage();
  const { session, isLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') as 'property' | 'roommate' || 'property';
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    console.log('[Rent] Auth state:', { 
      session: !!session, 
      isLoading,
      user: session?.user?.email 
    });
  }, [session, isLoading]);

  if (isLoading) {
    console.log('[Rent] Showing loading state');
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  console.log('[Rent] Rendering main content');

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
