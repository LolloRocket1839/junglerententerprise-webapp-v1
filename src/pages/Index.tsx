import { Button } from "@/components/ui/button";
import { ArrowRight, Home, DollarSign, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Dynamic background with multiple layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-background animate-gradient-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(46,246,46,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(46,246,46,0.1)_0%,transparent_50%)]" />
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-slower" />
        
        {/* Content with glassmorphism */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
              Welcome to Jungle Rent
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in text-secondary/90">
              Invest in student housing, rent your room, or find your perfect short-term stay
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in">
              <Button
                variant="secondary"
                size="lg"
                className="group bg-primary/90 hover:bg-primary text-background transition-all duration-300 shadow-lg hover:shadow-primary/50"
                asChild
              >
                <Link to="/invest" className="flex items-center">
                  Discover Investments
                  <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 hover:bg-white/20 border-white"
              asChild
            >
              <Link to="/rent">
                Rent Your Room <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 hover:bg-white/20 border-white"
              asChild
            >
              <Link to="/stay">
                Book Your Stay <ArrowRight className="ml-2" />
              </Link>
            </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary-dark/5 to-background/95" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl">
            <h2 className="text-4xl font-bold text-center mb-12 text-primary">
              Why Choose Jungle Rent?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<DollarSign size={32} />}
                title="Smart Investments"
                description="Invest in student housing through SFPs and earn returns from both long-term and short-term rentals."
              />
              <FeatureCard
                icon={<Home size={32} />}
                title="Quality Housing"
                description="Find comfortable and affordable housing options, perfect for students and short-term stays."
              />
              <FeatureCard
                icon={<Users size={32} />}
                title="Community First"
                description="Join a community of investors, students, and travelers all benefiting from shared spaces."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary-dark/10 to-background/90" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl">
            <h2 className="text-4xl font-bold mb-6 text-secondary">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-secondary/90">
              Join Jungle Rent today and be part of the future of student housing investment and
              management.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-light text-background transition-all duration-300"
              asChild
            >
              <Link to="/register">
                Join Now <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="p-6 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-primary">{title}</h3>
    <p className="text-secondary/80">{description}</p>
  </div>
);

export default Index;
