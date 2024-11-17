import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Building, TrendingUp } from "lucide-react";

const properties = [
  {
    id: 1,
    name: "Green Campus Residence",
    location: "Milan, Italy",
    type: "Student Housing",
    totalValue: "€2,500,000",
    tokenPrice: "€300",
    availability: "75%",
    expectedROI: "10%",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "Tech Hub Apartments",
    location: "Rome, Italy",
    type: "Student Housing",
    totalValue: "€3,200,000",
    tokenPrice: "€300",
    availability: "60%",
    expectedROI: "10%",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "Central Student Lofts",
    location: "Florence, Italy",
    type: "Student Housing",
    totalValue: "€1,800,000",
    tokenPrice: "€300",
    availability: "85%",
    expectedROI: "10%",
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
];

const InvestmentOpportunities = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Card 
          key={property.id} 
          className="glass overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 animate-fade-in"
        >
          <div className="aspect-video relative">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-2">
              {property.name}
            </h3>
            <div className="flex items-center gap-2 text-white/60 mb-4">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{property.location}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-white/60">Total Value</p>
                <p className="text-lg font-semibold text-white">
                  {property.totalValue}
                </p>
              </div>
              <div>
                <p className="text-sm text-white/60">Token Price</p>
                <p className="text-lg font-semibold text-white">
                  {property.tokenPrice}
                </p>
              </div>
              <div>
                <p className="text-sm text-white/60">Availability</p>
                <p className="text-lg font-semibold text-white">
                  {property.availability}
                </p>
              </div>
              <div>
                <p className="text-sm text-white/60">Expected ROI</p>
                <p className="text-lg font-semibold text-primary">
                  {property.expectedROI}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 glass hover:bg-white/20"
              >
                Details
              </Button>
              <Button
                variant="default"
                className="flex-1 bg-primary hover:bg-primary-dark text-white"
              >
                Invest Now
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default InvestmentOpportunities;