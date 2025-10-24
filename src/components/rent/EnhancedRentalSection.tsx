
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { SearchForm } from './components/SearchForm';
import { PropertyList } from './components/PropertyList';
import { PropertyDetail } from './components/PropertyDetail';
import { mockProperties } from './data/mockData';
import { SearchParams, Application } from './types';
import { UnifiedProperty } from '@/hooks/useUnifiedProperties';

const EnhancedRentalSection = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    city: '',
    university: '',
    roomType: '',
    minPrice: '',
    maxPrice: '',
    moveInDate: ''
  });
  const [activeTab, setActiveTab] = useState('search');
  const [selectedCity, setSelectedCity] = useState('');
  const [filteredProperties, setFilteredProperties] = useState<UnifiedProperty[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<UnifiedProperty | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewedProperties, setViewedProperties] = useState<string[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Esempio di dati caricati: preferiti, visualizzati, domande inviate
          setFavorites(["1"]);
          setViewedProperties(["1", "2"]);
          setApplications([
            {
              property_id: "3",
              status: "pending",
              submitted_at: "2023-08-15"
            }
          ]);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    loadUserData();
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      if (selectedCity) {
        try {
          let query = supabase
            .from('student_properties')
            .select('*')
            .eq('city', selectedCity)
            .eq('current_status', 'available');

          if (searchParams.minPrice) {
            query = query.gte('discounted_price_monthly', parseInt(searchParams.minPrice));
          }
          if (searchParams.maxPrice) {
            query = query.lte('discounted_price_monthly', parseInt(searchParams.maxPrice));
          }
          if (searchParams.roomType) {
            query = query.eq('rooms', parseInt(searchParams.roomType));
          }

          const { data, error } = await query;
          if (error) throw error;
          setFilteredProperties((data as UnifiedProperty[]) || []);
        } catch (error) {
          console.error('Error fetching properties:', error);
          setFilteredProperties([]);
        }
      } else {
        setFilteredProperties([]);
      }
    };
    fetchProperties();
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

  const handlePropertySelect = (property: UnifiedProperty) => {
    setSelectedProperty(property);
    setActiveTab('property');
    if (!viewedProperties.includes(property.id)) {
      setViewedProperties([...viewedProperties, property.id]);
    }
  };

  const toggleFavorite = (propertyId: string) => {
    if (favorites.includes(propertyId)) {
      setFavorites(favorites.filter(id => id !== propertyId));
      toast({
        title: "Rimosso dai preferiti",
        description: "Proprietà rimossa dai preferiti"
      });
    } else {
      setFavorites([...favorites, propertyId]);
      toast({
        title: "Aggiunto ai preferiti",
        description: "Proprietà aggiunta ai preferiti"
      });
    }
  };

  const handleApply = (property: UnifiedProperty) => {
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
      description: "La tua domanda è stata inviata con successo",
      variant: "default"
    });
  };

  return (
    <div className="min-h-screen relative pb-20 md:pb-0">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-xl" />
      </div>

      {/* Contenitore principale centrato e largo */}
      <div className="w-full max-w-screen-xl mx-auto px-8 sm:px-12 lg:px-16">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* TAB: Ricerca */}
          <TabsContent value="search" className="focus:outline-none">
            <div className="grid grid-cols-12 gap-8 w-full justify-items-stretch">
              {/* Colonna unica più larga, centrata orizzontalmente */}
              <div className="col-span-12 space-y-8">
                <SearchForm
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                  showFilters={showFilters}
                  setShowFilters={setShowFilters}
                  handleSearch={handleSearch}
                />
              </div>
            </div>
          </TabsContent>

          {/* TAB: Risultati */}
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

          {/* TAB: Dettaglio Proprietà */}
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
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedRentalSection;
