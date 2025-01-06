import React from 'react';
import { ChevronRight, MapPin } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface InvestmentHeaderProps {
  propertyName: string;
  location: string;
}

const InvestmentHeader: React.FC<InvestmentHeaderProps> = ({
  propertyName,
  location
}) => {
  return (
    <div className="sticky top-0 z-10 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="p-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/invest" className="text-sm font-medium text-white/80 hover:text-white">
                Dashboard Investimenti
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm font-semibold text-white">{propertyName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="px-6 py-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
          {propertyName}
        </h2>
        <div className="flex items-center gap-2 text-gray-300">
          <MapPin className="w-4 h-4" />
          <span className="text-lg font-light tracking-wide">{location}</span>
        </div>
      </div>
    </div>
  );
};

export default InvestmentHeader;