import { Button } from "@/components/ui/button";
import { ArrowRight, Home, DollarSign, Users, Calendar, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import OnboardingTour from "@/components/onboarding/OnboardingTour";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <OnboardingTour />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-background animate-gradient-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(46,246,46,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(46,246,46,0.1)_0%,transparent_50%)]" />
        
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-primary/5 rounded-full blur-3xl animate-float-slower" />
        
        {/* Main content */}
        <div className="container mx-auto text-center relative z-10">
          <div className="backdrop-blur-sm bg-white/5 p-4 sm:p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-primary/20 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider mb-4 sm:mb-6 animate-fade-in 
                         bg-gradient-to-r from-primary-light via-primary to-primary-light bg-clip-text text-transparent
                         drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] leading-relaxed tracking-wide">
              Welcome to <span className="tracking-widest">Jungle</span> <span className="tracking-widest">Rent</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-2xl mb-6 sm:mb-8 animate-fade-in text-secondary/90">
              Rent that pays
            </p>
            
            {/* Enhanced CTA Button with better touch target */}
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary 
                         text-background font-semibold px-6 sm:px-8 py-3 sm:py-6 text-base sm:text-lg 
                         transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-md group
                         min-w-[200px] sm:min-w-[250px] touch-manipulation"
              asChild
            >
              <Link to="/auth" className="flex items-center justify-center gap-2">
                Get Started 
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* User Type Selection - Enhanced with responsive grid */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Investor Card - Enhanced touch targets and responsive spacing */}
            <div className="backdrop-blur-sm bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl 
                          hover:shadow-primary/20 transition-all duration-300 group touch-manipulation">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4 
                            group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">For Investors</h2>
              <p className="text-secondary/80 mb-4 sm:mb-6 text-sm sm:text-base">
                Invest in sustainable student housing and earn above-market returns while supporting affordable education.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="w-full bg-primary/90 hover:bg-primary text-background group invest-link
                          py-3 sm:py-4 text-base sm:text-lg touch-manipulation"
                asChild
              >
                <Link to="/invest" className="flex items-center justify-center gap-2">
                  Start Investing 
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Student Card - Enhanced touch targets and responsive spacing */}
            <div className="backdrop-blur-sm bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl 
                          hover:shadow-primary/20 transition-all duration-300 group touch-manipulation">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4 
                            group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">For Students</h2>
              <p className="text-secondary/80 mb-4 sm:mb-6 text-sm sm:text-base">
                Find your perfect long-term student accommodation and connect with potential roommates.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="w-full bg-primary/90 hover:bg-primary text-background group rent-link
                          py-3 sm:py-4 text-base sm:text-lg touch-manipulation"
                asChild
              >
                <Link to="/rent" className="flex items-center justify-center gap-2">
                  Find Housing 
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Short-term Stay Card - Enhanced touch targets and responsive spacing */}
            <div className="backdrop-blur-sm bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl 
                          hover:shadow-primary/20 transition-all duration-300 group touch-manipulation">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4 
                            group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Short-term Stay</h2>
              <p className="text-secondary/80 mb-4 sm:mb-6 text-sm sm:text-base">
                Looking for temporary accommodation for exams, internships, or short courses? Find the perfect spot.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="w-full bg-primary/90 hover:bg-primary text-background group stay-link
                          py-3 sm:py-4 text-base sm:text-lg touch-manipulation"
                asChild
              >
                <Link to="/stay" className="flex items-center justify-center gap-2">
                  Book Stay 
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Enhanced with responsive spacing and touch targets */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-b from-primary/20 via-primary-dark/10 to-background/90 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center relative z-10">
          <div className="backdrop-blur-sm bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-secondary">How Jungle Rent Works</h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-secondary/90">
              We connect investors, students, and short-term stayers to create a sustainable student housing ecosystem.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-left">
              <div className="p-4 sm:p-6 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10 
                            transition-all duration-300 hover:bg-white/10 touch-manipulation">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-primary">For Investors</h3>
                <p className="text-secondary/80 text-sm sm:text-base">Invest in verified student properties and earn returns while supporting education.</p>
              </div>
              <div className="p-4 sm:p-6 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10 
                            transition-all duration-300 hover:bg-white/10 touch-manipulation">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-primary">For Students</h3>
                <p className="text-secondary/80 text-sm sm:text-base">Find affordable long-term housing and connect with compatible roommates.</p>
              </div>
              <div className="p-4 sm:p-6 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10 
                            transition-all duration-300 hover:bg-white/10 touch-manipulation">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-primary">For Short Stays</h3>
                <p className="text-secondary/80 text-sm sm:text-base">Book temporary accommodation for exams, internships, or short courses.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
