import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, GraduationCap, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { GlassCard } from "@/components/ui/glass-card";

const UserTypeCard = ({ 
  icon: Icon, 
  title, 
  description, 
  linkTo, 
  buttonText 
}: { 
  icon: typeof DollarSign; 
  title: string; 
  description: string; 
  linkTo: string; 
  buttonText: string; 
}) => (
  <GlassCard 
    role="region"
    aria-label={`${title} information`}
  >
    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4 
                  group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-6 h-6" aria-hidden="true" />
    </div>
    <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{title}</h2>
    <p className="text-secondary/80 mb-4 sm:mb-6 text-sm sm:text-base">
      {description}
    </p>
    <Button
      variant="secondary"
      size="lg"
      className="w-full bg-primary/90 hover:bg-primary text-background group
                py-3 sm:py-4 text-base sm:text-lg touch-manipulation
                focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
      asChild
    >
      <Link to={linkTo} className="flex items-center justify-center gap-2">
        {buttonText}
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </Button>
  </GlassCard>
);

export const UserTypeSection = () => {
  return (
    <section 
      id="user-type-section"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8"
      aria-label="Choose your role"
    >
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <UserTypeCard
            icon={DollarSign}
            title="For Investors"
            description="Invest in sustainable student housing and earn above-market returns while supporting affordable education."
            linkTo="/invest"
            buttonText="Start Investing"
          />
          <UserTypeCard
            icon={GraduationCap}
            title="For Students"
            description="Find your perfect long-term student accommodation and connect with potential roommates."
            linkTo="/rent"
            buttonText="Find Housing"
          />
          <UserTypeCard
            icon={Calendar}
            title="Short-term Stay"
            description="Looking for temporary accommodation for exams, internships, or short courses? Find the perfect spot."
            linkTo="/stay"
            buttonText="Book Stay"
          />
        </div>
      </div>
    </section>
  );
};
