
import React, { lazy, Suspense } from 'react';
import { Euro, CheckCircle, School, Leaf } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const LazyHoverCardContent = lazy(() => import("@/components/ui/hover-card").then(mod => ({ 
  default: mod.HoverCardContent 
})));

const LoadingFallback = () => (
  <div className="w-80 h-24 bg-[#1a1a1a] animate-pulse rounded-lg" />
);

export const ValuePropositions = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="glass-card p-6 transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Euro className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Risparmio</h3>
            <p className="text-white/60 text-sm">Fino al 20% sul mercato</p>
          </div>
        </HoverCardTrigger>
        <Suspense fallback={<LoadingFallback />}>
          <LazyHoverCardContent className="w-80 bg-[#1a1a1a] border-white/20 text-white">
            <div className="space-y-2">
              <h4 className="font-semibold">Risparmia con Jungle</h4>
              <p className="text-sm text-white/80">
                Offriamo prezzi competitivi attraverso contratti a lungo termine e partnership dirette con i proprietari.
                Nessuna commissione nascosta.
              </p>
            </div>
          </LazyHoverCardContent>
        </Suspense>
      </HoverCard>

      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="glass-card p-6 transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Verificati</h3>
            <p className="text-white/60 text-sm">Alloggi certificati</p>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 bg-[#1a1a1a] border-white/20 text-white">
          <div className="space-y-2">
            <h4 className="font-semibold">Qualità Garantita</h4>
            <p className="text-sm text-white/80">
              Ogni alloggio viene ispezionato e verificato dal nostro team. Garantiamo standard di qualità e sicurezza elevati.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="glass-card p-6 transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <School className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Per Studenti</h3>
            <p className="text-white/60 text-sm">Vicino alle università</p>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 bg-[#1a1a1a] border-white/20 text-white">
          <div className="space-y-2">
            <h4 className="font-semibold">Pensato per Studenti</h4>
            <p className="text-sm text-white/80">
              Alloggi selezionati in base alla vicinanza alle università e ai servizi essenziali per la vita studentesca.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="glass-card p-6 transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Sostenibile</h3>
            <p className="text-white/60 text-sm">Edilizia eco-friendly</p>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 bg-[#1a1a1a] border-white/20 text-white">
          <div className="space-y-2">
            <h4 className="font-semibold">Impatto Ambientale</h4>
            <p className="text-sm text-white/80">
              Promuoviamo alloggi con certificazioni energetiche elevate e pratiche sostenibili per ridurre l'impatto ambientale.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
