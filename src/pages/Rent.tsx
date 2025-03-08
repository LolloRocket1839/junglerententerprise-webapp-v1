import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { SearchForm } from '@/components/rent/components/SearchForm';
import { PropertyList } from '@/components/rent/components/PropertyList';
import { PropertyDetail } from '@/components/rent/components/PropertyDetail';
import { mockProperties } from '@/components/rent/data/mockData';
import { SearchParams, Property, Application } from '@/components/rent/types';
import { DocumentUploadSection } from '@/components/rent/components/documents/DocumentUploadSection';
import { PaymentPlanTimeline } from '@/components/rent/components/payments/PaymentPlanTimeline';

const Rent = () => {
  const [searchParams, setSearchParams] = React.useState<SearchParams>({
    city: '',
    university: '',
    roomType: '',
    minPrice: '',
    maxPrice: '',
    moveInDate: ''
  });
  const [activeTab, setActiveTab] = React.useState('search');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [filteredProperties, setFilteredProperties] = React.useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = React.useState<Property | null>(null);
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const [applications, setApplications] = React.useState<Application[]>([]);
  const { toast } = useToast();

  React.useEffect(() => {
    if (selectedCity) {
      const filtered = mockProperties.filter(property =>
        property.city.toLowerCase() === selectedCity.toLowerCase() &&
        (searchParams.minPrice
          ? property.discounted_price_monthly >= parseInt(searchParams.minPrice)
          : true) &&
        (searchParams.maxPrice
          ? property.discounted_price_monthly <= parseInt(searchParams.maxPrice)
          : true) &&
        (searchParams.roomType
          ? (searchParams.roomType === 'studio' && property.rooms === 1) ||
            (searchParams.roomType === 'apartment' && property.rooms > 1)
          : true)
      );
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(mockProperties);
    }
  }, [selectedCity, searchParams]);

  const handleSearch = () => {
    if (!searchParams.city) {
      toast({
        title: "Specificare una città",
        description: "Per favore, seleziona una città per iniziare la ricerca",
        variant: "destructive"
      });
      return;
    }
    setSelectedCity(searchParams.city);
    setActiveTab('results');
    toast({
      title: "Ricerca effettuata",
      description: `Mostrando risultati per ${searchParams.city}`
    });
  };

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
    setActiveTab('property');
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleApply = (property: Property) => {
    if (applications.some(app => app.property_id === property.id)) {
      toast({
        title: "Hai già fatto domanda",
        description: "Hai già inviato una domanda per questa proprietà",
        variant: "destructive"
      });
      return;
    }

    const newApplication = {
      property_id: property.id,
      status: "pending",
      submitted_at: new Date().toISOString().split('T')[0]
    };
    setApplications([...applications, newApplication]);
    toast({
      title: "Domanda inviata",
      description: "La tua richiesta è stata inviata con successo"
    });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="search">
            <SearchForm
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              showFilters={true}
              setShowFilters={() => {}}
              handleSearch={handleSearch}
            />
          </TabsContent>

          <TabsContent value="results">
            <PropertyList
              properties={filteredProperties}
              selectedCity={selectedCity}
              favorites={favorites}
              onFavoriteToggle={toggleFavorite}
              onPropertySelect={handlePropertySelect}
              onBackToSearch={() => setActiveTab('search')}
            />
          </TabsContent>

          <TabsContent value="property">
            {selectedProperty && (
              <PropertyDetail
                property={selectedProperty}
                isFavorite={favorites.includes(selectedProperty.id)}
                onFavoriteToggle={toggleFavorite}
                onBack={() => setActiveTab('results')}
                onApply={handleApply}
                applications={applications}
              />
            )}
          </TabsContent>

          <TabsContent value="documents">
            <div className="grid gap-8 md:grid-cols-2">
              <DocumentUploadSection />
              <PaymentPlanTimeline />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Rent;
