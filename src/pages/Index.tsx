import { Button } from "@/components/ui/button";
import { ArrowRight, Home, DollarSign, Users, Calendar, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden px-4 py-8 sm:py-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-background animate-gradient-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(46,246,46,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(46,246,46,0.1)_0%,transparent_50%)]" />
        
        {/* Floating orbs - Adjusted for mobile */}
        <div className="absolute top-1/4 left-1/4 w-24 sm:w-64 h-24 sm:h-64 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-32 sm:w-96 h-32 sm:h-96 bg-primary/5 rounded-full blur-3xl animate-float-slower" />
        
        {/* Content with improved mobile spacing */}
        <div className="container mx-auto text-center relative z-10">
          <div className="backdrop-blur-sm bg-white/5 p-4 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
            <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-6 animate-fade-in text-primary">
              Welcome to Jungle Rent
            </h1>
            <p className="text-base sm:text-xl md:text-2xl mb-4 sm:mb-8 max-w-2xl mx-auto animate-fade-in text-secondary/90">
              Your one-stop platform for student housing solutions
            </p>
          </div>
        </div>
      </section>

      {/* User Type Selection - Mobile Optimized */}
      <section className="relative py-8 sm:py-20 px-4">
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Investor Path - Mobile Friendly */}
            <div className="backdrop-blur-sm bg-white/5 p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl hover:shadow-primary/20 transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-3 sm:mb-4">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h2 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-primary">For Investors</h2>
              <p className="text-sm sm:text-base text-secondary/80 mb-4 sm:mb-6">
                Invest in sustainable student housing and earn above-market returns while supporting affordable education.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="w-full bg-primary/90 hover:bg-primary text-background text-sm sm:text-base"
                asChild
              >
                <Link to="/invest" className="flex items-center justify-center gap-2">
                  Start Investing <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Student Path - Mobile Friendly */}
            <div className="backdrop-blur-sm bg-white/5 p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl hover:shadow-primary/20 transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-3 sm:mb-4">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h2 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-primary">For Students</h2>
              <p className="text-sm sm:text-base text-secondary/80 mb-4 sm:mb-6">
                Find your perfect long-term student accommodation and connect with potential roommates.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="w-full bg-primary/90 hover:bg-primary text-background text-sm sm:text-base"
                asChild
              >
                <Link to="/rent" className="flex items-center justify-center gap-2">
                  Find Housing <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Short-term Stay Path - Mobile Friendly */}
            <div className="backdrop-blur-sm bg-white/5 p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl hover:shadow-primary/20 transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-3 sm:mb-4">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h2 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-primary">Short-term Stay</h2>
              <p className="text-sm sm:text-base text-secondary/80 mb-4 sm:mb-6">
                Looking for temporary accommodation for exams, internships, or short courses? Find the perfect spot.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="w-full bg-primary/90 hover:bg-primary text-background text-sm sm:text-base"
                asChild
              >
                <Link to="/stay" className="flex items-center justify-center gap-2">
                  Book Stay <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Mobile Optimized */}
      <section className="relative py-8 sm:py-20 bg-gradient-to-b from-primary/20 via-primary-dark/10 to-background/90 px-4">
        <div className="container mx-auto text-center relative z-10">
          <div className="backdrop-blur-sm bg-white/5 p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl">
            <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-6 text-secondary">How Jungle Rent Works</h2>
            <p className="text-base sm:text-xl mb-4 sm:mb-8 max-w-2xl mx-auto text-secondary/90">
              We connect investors, students, and short-term stayers to create a sustainable student housing ecosystem.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 text-left">
              <div className="p-3 sm:p-6 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10">
                <h3 className="text-base sm:text-xl font-semibold mb-2 text-primary">For Investors</h3>
                <p className="text-sm sm:text-base text-secondary/80">Invest in verified student properties and earn returns while supporting education.</p>
              </div>
              <div className="p-3 sm:p-6 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10">
                <h3 className="text-base sm:text-xl font-semibold mb-2 text-primary">For Students</h3>
                <p className="text-sm sm:text-base text-secondary/80">Find affordable long-term housing and connect with compatible roommates.</p>
              </div>
              <div className="p-3 sm:p-6 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10">
                <h3 className="text-base sm:text-xl font-semibold mb-2 text-primary">For Short Stays</h3>
                <p className="text-sm sm:text-base text-secondary/80">Book temporary accommodation for exams, internships, or short courses.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;