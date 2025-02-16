
import OnboardingTour from "@/components/onboarding/OnboardingTour";
import { HeroSection } from "@/components/home/HeroSection";
import { UserTypeSection } from "@/components/home/UserTypeSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <OnboardingTour />
      <HeroSection />
      <UserTypeSection />
      <HowItWorksSection />
    </div>
  );
};

export default Index;
