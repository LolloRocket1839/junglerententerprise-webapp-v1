import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, TreePalm } from "lucide-react";
import { Link } from "react-router-dom";
import { GlassCard } from "@/components/ui/glass-card";

export const HeroSection = () => {
  return (
    <section 
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
      aria-label="Welcome section"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-background animate-gradient-slow" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(46,246,46,0.15)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(46,246,46,0.1)_0%,transparent_50%)]" />
      
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-primary/5 rounded-full blur-3xl animate-float-slower" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Leaf className="absolute top-2 left-4 h-4 w-4 text-primary/20 animate-float-slow" aria-hidden="true" />
        <TreePalm className="absolute bottom-2 right-4 h-4 w-4 text-primary/20 animate-float-slower" aria-hidden="true" />
      </div>
      
      {/* Main content */}
      <div className="container mx-auto text-center relative z-10">
        <GlassCard className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider mb-4 sm:mb-6 animate-fade-in 
                       bg-gradient-to-r from-primary-light via-primary to-primary-light bg-clip-text text-transparent
                       drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] leading-relaxed">
            Welcome to <span className="tracking-widest inline-block pb-3 leading-[1.4]">Jungle</span> <span className="tracking-widest">Rent</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-2xl mb-6 sm:mb-8 animate-fade-in text-secondary/90">
            Pay less earn more
          </p>
          
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary 
                     text-background font-semibold px-6 sm:px-8 py-3 sm:py-6 text-base sm:text-lg 
                     transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-md group
                     min-w-[200px] sm:min-w-[250px] touch-manipulation
                     focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
            asChild
            aria-label="Get started with Jungle Rent"
          >
            <Link to="/auth" className="flex items-center justify-center gap-2">
              Get Started 
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>
        </GlassCard>
      </div>
    </section>
  );
};