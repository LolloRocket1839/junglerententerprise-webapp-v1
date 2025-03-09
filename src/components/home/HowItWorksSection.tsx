
import { GlassCard } from "@/components/ui/glass-card";
import { FeatureCard } from "@/components/ui/feature-card";
import { DollarSign, GraduationCap, Calendar } from "lucide-react";
import { GradientBackground } from "@/components/ui/gradient-background";

export const HowItWorksSection = () => {
  return (
    <GradientBackground 
      variant="secondary"
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 mt-10"
      aria-label="Come funziona"
    >
      <div className="container mx-auto text-center relative z-10">
        <GlassCard className="max-w-6xl mx-auto backdrop-blur-lg">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-primary">
            Come Funziona Jungle Rent
          </h2>
          <p className="text-lg sm:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto text-secondary/90">
            Connettiamo investitori, studenti e ospiti per creare un ecosistema abitativo studentesco sostenibile.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 text-left">
            <FeatureCard
              icon={DollarSign}
              title="Per Investitori"
              description="Puoi investire in proprietà affittate da studenti a partire da 50 euro e guadagnare rendimenti sostenendo l'istruzione."
            />
            <FeatureCard
              icon={GraduationCap}
              title="Per Studenti"
              description="Trova alloggi a lungo termine a prezzi accessibili e connettiti con coinquilini compatibili."
            />
            <FeatureCard
              icon={Calendar}
              title="Per Brevi Soggiorni"
              description="Prenota alloggi temporanei per esami, tirocini o corsi brevi."
            />
          </div>
        </GlassCard>
      </div>
    </GradientBackground>
  );
};
