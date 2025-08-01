import React from 'react';
import { ChevronRight, MapPin, X } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DialogClose } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { investTranslations } from '@/translations/invest';

interface InvestmentHeaderProps {
  propertyName: string;
  location: string;
}

const InvestmentHeader: React.FC<InvestmentHeaderProps> = ({
  propertyName,
  location
}) => {
  const { t } = useLanguage();
  return (
    <div className="sticky top-0 z-10 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="relative p-4">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4 text-white" />
          <span className="sr-only">{t('closeDialog')}</span>
        </DialogClose>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/invest" className="text-sm font-medium text-white/80 hover:text-white">
                {t('investmentDashboard')}
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