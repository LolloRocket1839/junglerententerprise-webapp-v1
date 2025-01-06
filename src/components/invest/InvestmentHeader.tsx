import React from 'react';
import { ChevronRight } from 'lucide-react';
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
    <>
      <div className="p-4 border-b border-white/10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/invest" className="text-sm font-medium text-white hover:text-white/90">
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

      <div className="p-6 border-b border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2 tracking-tight">
          {propertyName}
        </h2>
        <p className="text-lg font-light text-gray-300 text-center tracking-wide">
          {location}
        </p>
      </div>
    </>
  );
};

export default InvestmentHeader;