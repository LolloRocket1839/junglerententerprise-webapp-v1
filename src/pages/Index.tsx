import { Button } from "@/components/ui/button";
import { ArrowRight, Home, DollarSign, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to Jungle Rent
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in">
            Invest in student housing, rent your room, or find your perfect short-term stay
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in">
            <Button
              variant="secondary"
              size="lg"
              className="bg-secondary hover:bg-secondary-dark text-primary-dark"
              asChild
            >
              <Link to="/invest">
                Discover Investments <ArrowRight className="ml-2" />
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
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-primary-dark/20 via-background to-background backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary-dark">
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
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-light text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Jungle Rent today and be part of the future of student housing investment and
            management.
          </p>
          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary-dark text-primary-dark"
            asChild
          >
            <Link to="/register">
              Join Now <ArrowRight className="ml-2" />
            </Link>
          </Button>
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
  <div className="p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-primary-dark">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Index;