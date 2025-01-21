import { GlassCard } from "@/components/ui/glass-card";
import { FeatureCard } from "@/components/ui/feature-card";
import { DollarSign, GraduationCap, Calendar } from "lucide-react";
import { GradientBackground } from "@/components/ui/gradient-background";

export const HowItWorksSection = () => {
  return (
    <GradientBackground 
      variant="secondary"
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 mt-10"
      aria-label="How it works"
    >
      <div className="container mx-auto text-center relative z-10">
        <GlassCard className="max-w-6xl mx-auto backdrop-blur-lg">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-secondary">
            How Jungle Rent Works
          </h2>
          <p className="text-lg sm:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto text-secondary/90">
            We connect investors, students, and short-term stayers to create a sustainable student housing ecosystem.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 text-left">
            <FeatureCard
              icon={DollarSign}
              title="For Investors"
              description="Invest in verified student properties and earn returns while supporting education."
            />
            <FeatureCard
              icon={GraduationCap}
              title="For Students"
              description="Find affordable long-term housing and connect with compatible roommates."
            />
            <FeatureCard
              icon={Calendar}
              title="For Short Stays"
              description="Book temporary accommodation for exams, internships, or short courses."
            />
          </div>
        </GlassCard>
      </div>
    </GradientBackground>
  );
};