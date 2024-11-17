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
          className="bg-white/[0.03] border border-white/[0.08] overflow-hidden transition-all duration-300 
                   hover:scale-[1.02] hover:shadow-card-hover hover:border-success/20 hover:bg-white/[0.05]"
        >
          <div className="aspect-video relative overflow-hidden">
            <div className="absolute inset-0 bg-image-overlay z-10" />
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white/90 mb-2">
              {property.name}
            </h3>
            <div className="flex items-center gap-2 text-white/70 mb-4">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{property.location}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-white/70">Total Value</p>
                <p className="text-lg font-semibold text-white/90">
                  {property.totalValue}
                </p>
              </div>
              <div>
                <p className="text-sm text-white/70">Token Price</p>
                <p className="text-lg font-semibold text-white/90">
                  {property.tokenPrice}
                </p>
              </div>
              <div>
                <p className="text-sm text-white/70">Availability</p>
                <p className="text-lg font-semibold text-neutral">
                  {property.availability}
                </p>
              </div>
              <div>
                <p className="text-sm text-white/70">Expected ROI</p>
                <p className="text-lg font-semibold text-success">
                  {property.expectedROI}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.05] 
                         hover:border-success/20 transition-all duration-300"
              >
                Details
              </Button>
              <Button
                variant="default"
                className="flex-1 bg-primary hover:bg-primary-hover active:bg-primary-active 
                         text-white transition-all duration-300"
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