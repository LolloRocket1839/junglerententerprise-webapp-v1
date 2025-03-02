import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { 
  Search, MapPin, Calendar, Home, School, Euro, ArrowRight, 
  Filter, Leaf, Heart, CheckCircle, AlertCircle
} from 'lucide-react';

// Mock data for demonstration
const cities = [
  "Roma", "Milano", "Firenze", "Torino", "Bologna", "Napoli", "Padova", "Pisa"
];

const universities = {
  "Roma": ["La Sapienza", "Roma Tre", "LUISS"],
  "Milano": ["Politecnico di Milano", "Università degli Studi di Milano", "Bocconi"],
  "Firenze": ["Università degli Studi di Firenze"],
  "Torino": ["Politecnico di Torino", "Università degli Studi di Torino"],
  "Bologna": ["Università di Bologna"],
  "Napoli": ["Università degli Studi di Napoli Federico II"],
  "Padova": ["Università degli Studi di Padova"],
  "Pisa": ["Università di Pisa", "Scuola Normale Superiore"]
};

const mockProperties = [
  {
    id: "1",
    title: "Appartamento Via Garibaldi",
    address: "Via Giuseppe Garibaldi 45, Torino",
    description: "Elegante appartamento storico nel cuore di Torino con soffitti affrescati e pavimenti in parquet originale",
    city: "Torino",
    discounted_price_monthly: 650,
    market_price_monthly: 750,
    size_sqm: 75,
    rooms: 3,
    bathrooms: 1,
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"],
    distance_to_university: "5 min from Politecnico di Torino",
    availability_start: "2023-09-01",
    savings_percentage: 13,
    current_status: "available",
    has_balcony: true,
    has_kitchen: true,
    utilities_included: true
  },
  {
    id: "2",
    title: "Studio Moderno Navigli",
    address: "Via Corsico 12, Milano",
    description: "Studio moderno nel vivace quartiere dei Navigli, recentemente ristrutturato con finiture di design",
    city: "Milano",
    discounted_price_monthly: 750,
    market_price_monthly: 900,
    size_sqm: 45,
    rooms: 1,
    bathrooms: 1,
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c"],
    distance_to_university: "10 min from Università Bocconi",
    availability_start: "2023-10-01",
    savings_percentage: 17,
    current_status: "available",
    has_balcony: false,
    has_kitchen: true,
    utilities_included: false
  },
  {
    id: "3",
    title: "Casa Trastevere Roma",
    address: "Via della Scala 23, Roma",
    description: "Caratteristico bilocale nel cuore di Trastevere, con travi a vista e vicino a tutti i principali monumenti",
    city: "Roma",
    discounted_price_monthly: 850,
    market_price_monthly: 1050,
    size_sqm: 60,
    rooms: 2,
    bathrooms: 1,
    images: ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0"],
    distance_to_university: "15 min from La Sapienza",
    availability_start: "2023-09-15",
    savings_percentage: 19,
    current_status: "available",
    has_balcony: true,
    has_kitchen: true,
    utilities_included: true
  },
  {
    id: "4",
    title: "Loft Centro Firenze",
    address: "Via dei Servi 45, Firenze",
    description: "Elegante loft a due passi dal Duomo, con vista sui tetti del centro storico e arredamento di design",
    city: "Firenze",
    discounted_price_monthly: 900,
    market_price_monthly: 1100,
    size_sqm: 70,
    rooms: 2,
    bathrooms: 1,
    images: ["https://images.unsplash.com/photo-1600607687644-c94bf5588563"],
    distance_to_university: "8 min from Università degli Studi di Firenze",
    availability_start: "2023-10-15",
    savings_percentage: 18,
    current_status: "available",
    has_balcony: false,
    has_kitchen: true,
    utilities_included: false
  }
];

const EnhancedRentalSection = () => {
  const [searchParams, setSearchParams] = useState({
    city: '',
    university: '',
    roomType: '',
    minPrice: '',
    maxPrice: '',
    moveInDate: ''
  });
  const [activeTab, setActiveTab] = useState('search');
  const [selectedCity, setSelectedCity] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [viewedProperties, setViewedProperties] = useState([]);
  const [applications, setApplications] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // In a real app, fetch this from the database
          setFavorites(["1"]);
          setViewedProperties(["1", "2"]);
          setApplications([{
            property_id: "3",
            status: "pending",
            submitted_at: "2023-08-15"
          }]);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    // Filter properties whenever search params change
    if (selectedCity) {
      const filtered = mockProperties.filter(property => 
        property.city === selectedCity &&
        (searchParams.minPrice ? property.discounted_price_monthly >= parseInt(searchParams.minPrice) : true) &&
        (searchParams.maxPrice ? property.discounted_price_monthly <= parseInt(searchParams.maxPrice) : true) &&
        (searchParams.roomType ? 
          (searchParams.roomType === 'studio' && property.rooms === 1) ||
          (searchParams.roomType === 'apartment' && property.rooms > 1) : 
          true)
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
        variant: "destructive",
      });
      return;
    }
    
    setSelectedCity(searchParams.city);
    setActiveTab('results');
    
    toast({
      title: "Ricerca effettuata",
      description: `Mostrando risultati per ${searchParams.city}`,
    });
  };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setActiveTab('property');
    
    // Add to viewed properties if not already there
    if (!viewedProperties.includes(property.id)) {
      setViewedProperties([...viewedProperties, property.id]);
    }
  };

  const toggleFavorite = (propertyId) => {
    if (favorites.includes(propertyId)) {
      setFavorites(favorites.filter(id => id !== propertyId));
      toast({
        title: "Rimosso dai preferiti",
        description: "Proprietà rimossa dai preferiti",
      });
    } else {
      setFavorites([...favorites, propertyId]);
      toast({
        title: "Aggiunto ai preferiti",
        description: "Proprietà aggiunta ai preferiti",
      });
    }
  };

  const handleApply = (property) => {
    // Check if already applied
    if (applications.some(app => app.property_id === property.id)) {
      toast({
        title: "Hai già fatto domanda",
        description: "Hai già inviato una domanda per questa proprietà",
        variant: "destructive",
      });
      return;
    }
    
    // Add to applications
    const newApplication = {
      property_id: property.id,
      status: "pending",
      submitted_at: new Date().toISOString().split('T')[0]
    };
    
    setApplications([...applications, newApplication]);
    toast({
      title: "Domanda inviata",
      description: "La tua domanda è stata inviata con successo",
      variant: "success",
    });
  };

  const renderSearchForm = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Trova la tua casa ideale</h1>
        <p className="text-lg text-white/70">
          Risparmia fino al 20% sul mercato con affitti a lungo termine verificati da Jungle
        </p>
      </div>

      <div className="glass-card p-6 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-white/80 mb-2 block">Città</label>
            <Select
              value={searchParams.city}
              onValueChange={(value) => setSearchParams({...searchParams, city: value})}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Seleziona una città" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-white/20">
                {cities.map((city) => (
                  <SelectItem key={city} value={city} className="text-white hover:bg-white/10">
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-white/80 mb-2 block">Università</label>
            <Select
              value={searchParams.university}
              onValueChange={(value) => setSearchParams({...searchParams, university: value})}
              disabled={!searchParams.city}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Seleziona l'università" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-white/20">
                {searchParams.city && universities[searchParams.city]?.map((university) => (
                  <SelectItem key={university} value={university} className="text-white hover:bg-white/10">
                    {university}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="outline" 
            className="bg-white/10 text-white hover:bg-white/20 border-white/20"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" /> Filtri avanzati
          </Button>
          {showFilters && (
            <span className="text-white/60 text-sm">
              Filtri attivi
            </span>
          )}
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 animate-fade-in py-4 px-1 border-y border-white/10">
            <div>
              <label className="text-white/80 mb-2 block">Tipologia</label>
              <Select
                value={searchParams.roomType}
                onValueChange={(value) => setSearchParams({...searchParams, roomType: value})}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Tipo di alloggio" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/20">
                  <SelectItem value="studio" className="text-white hover:bg-white/10">
                    Monolocale
                  </SelectItem>
                  <SelectItem value="apartment" className="text-white hover:bg-white/10">
                    Appartamento
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-white/80 mb-2 block">Prezzo Min (€)</label>
              <Input
                type="number"
                placeholder="0"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                value={searchParams.minPrice}
                onChange={(e) => setSearchParams({...searchParams, minPrice: e.target.value})}
              />
            </div>

            <div>
              <label className="text-white/80 mb-2 block">Prezzo Max (€)</label>
              <Input
                type="number"
                placeholder="2000"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                value={searchParams.maxPrice}
                onChange={(e) => setSearchParams({...searchParams, maxPrice: e.target.value})}
              />
            </div>
          </div>
        )}

        <Button 
          onClick={handleSearch} 
          className="w-full bg-primary hover:bg-primary/90"
        >
          <Search className="mr-2 h-4 w-4" /> Cerca Alloggi
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="glass-card p-4">
          <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Euro className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-white font-semibold">Risparmio</h3>
          <p className="text-white/60 text-sm">Fino al 20% sul mercato</p>
        </div>
        
        <div className="glass-card p-4">
          <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-white font-semibold">Verificati</h3>
          <p className="text-white/60 text-sm">Alloggi certificati</p>
        </div>
        
        <div className="glass-card p-4">
          <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <School className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-white font-semibold">Per Studenti</h3>
          <p className="text-white/60 text-sm">Vicino alle università</p>
        </div>
        
        <div className="glass-card p-4">
          <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Leaf className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-white font-semibold">Sostenibile</h3>
          <p className="text-white/60 text-sm">Edilizia eco-friendly</p>
        </div>
      </div>
    </div>
  );

  const renderResultsList = () => (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {filteredProperties.length} alloggi trovati a {selectedCity}
        </h2>
        <Button 
          variant="outline" 
          className="bg-white/10 text-white hover:bg-white/20 border-white/20"
          onClick={() => setActiveTab('search')}
        >
          Modifica ricerca
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProperties.map(property => (
          <Card key={property.id} className="glass-card overflow-hidden group">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={property.images[0]} 
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(property.id);
                }}
              >
                <Heart className={`h-5 w-5 ${favorites.includes(property.id) ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <div className="absolute top-2 left-2">
                <Badge className="bg-green-500 text-white">
                  -{property.savings_percentage}%
                </Badge>
              </div>
            </div>
            
            <div className="p-5">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-1">{property.title}</h3>
                <div className="flex items-center text-white/60 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.address}
                </div>
                <div className="flex items-center text-white/60 text-sm mt-1">
                  <School className="w-4 h-4 mr-1" />
                  {property.distance_to_university}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="glass p-2 rounded text-center">
                  <span className="text-white text-sm font-semibold">{property.rooms}</span>
                  <span className="block text-white/60 text-xs">Stanze</span>
                </div>
                <div className="glass p-2 rounded text-center">
                  <span className="text-white text-sm font-semibold">{property.bathrooms}</span>
                  <span className="block text-white/60 text-xs">Bagni</span>
                </div>
                <div className="glass p-2 rounded text-center">
                  <span className="text-white text-sm font-semibold">{property.size_sqm}m²</span>
                  <span className="block text-white/60 text-xs">Superficie</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white/60 text-sm">Prezzo di mercato</span>
                  <div className="flex items-center">
                    <span className="text-white/60 text-sm line-through mr-2">
                      €{property.market_price_monthly}/mese
                    </span>
                    <span className="text-lg font-bold text-white">
                      €{property.discounted_price_monthly}/mese
                    </span>
                  </div>
                </div>
                <Button onClick={() => handlePropertySelect(property)}>
                  Dettagli <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        
        {filteredProperties.length === 0 && (
          <div className="col-span-full glass-card p-8 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-white/50 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Nessun alloggio trovato</h3>
            <p className="text-white/60 mb-4">
              Nessun alloggio corrisponde ai criteri di ricerca selezionati.
              Prova a modificare i filtri o a cercare in un'altra città.
            </p>
            <Button onClick={() => setActiveTab('search')}>
              Modifica ricerca
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderPropertyDetail = () => {
    if (!selectedProperty) return null;
    
    const isApplied = applications.some(app => app.property_id === selectedProperty.id);
    const applicationStatus = isApplied ? 
      applications.find(app => app.property_id === selectedProperty.id)?.status : null;
      
    return (
      <div className="max-w-6xl mx-auto animate-fade-in">
        <Button 
          variant="outline" 
          className="mb-6 bg-white/10 text-white hover:bg-white/20 border-white/20"
          onClick={() => setActiveTab('results')}
        >
          Torna ai risultati
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="glass-card overflow-hidden">
              <div className="relative aspect-video">
                <img 
                  src={selectedProperty.images[0]} 
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white"
                  onClick={() => toggleFavorite(selectedProperty.id)}
                >
                  <Heart className={`h-5 w-5 ${favorites.includes(selectedProperty.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-500 text-white">
                    -{selectedProperty.savings_percentage}%
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedProperty.title}
                  </h2>
                  <div className="flex items-center text-white/60">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedProperty.address}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Descrizione</h3>
                  <p className="text-white/80">{selectedProperty.description}</p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="glass p-3 rounded text-center">
                    <Home className="w-5 h-5 text-primary mx-auto mb-1" />
                    <span className="text-white text-sm font-semibold">{selectedProperty.rooms}</span>
                    <span className="block text-white/60 text-xs">Stanze</span>
                  </div>
                  <div className="glass p-3 rounded text-center">
                    <span className="text-white text-sm font-semibold">{selectedProperty.bathrooms}</span>
                    <span className="block text-white/60 text-xs">Bagni</span>
                  </div>
                  <div className="glass p-3 rounded text-center">
                    <span className="text-white text-sm font-semibold">{selectedProperty.size_sqm}m²</span>
                    <span className="block text-white/60 text-xs">Superficie</span>
                  </div>
                  <div className="glass p-3 rounded text-center">
                    <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
                    <span className="text-white text-sm font-semibold">
                      {new Date(selectedProperty.availability_start).toLocaleDateString('it-IT', {month: 'short', day: 'numeric'})}
                    </span>
                    <span className="block text-white/60 text-xs">Disponibile dal</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Caratteristiche</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center text-white/80">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      {selectedProperty.has_balcony ? "Balcone" : "No balcone"}
                    </div>
                    <div className="flex items-center text-white/80">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      {selectedProperty.has_kitchen ? "Cucina" : "No cucina"}
                    </div>
                    <div className="flex items-center text-white/80">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      {selectedProperty.utilities_included ? "Utenze incluse" : "Utenze escluse"}
                    </div>
                    <div className="flex items-center text-white/80">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      Arredato
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div>
            <Card className="glass-card p-6 mb-6 sticky top-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Dettagli di prezzo
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-white/80">
                  <span>Prezzo di mercato</span>
                  <span className="line-through">€{selectedProperty.market_price_monthly}/mese</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Prezzo scontato</span>
                  <span>€{selectedProperty.discounted_price_monthly}/mese</span>
                </div>
                <div className="flex justify-between text-green-500">
                  <span>Risparmio</span>
                  <span>€{selectedProperty.market_price_monthly - selectedProperty.discounted_price_monthly}/mese</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between text-white/80">
                  <span>Cauzione</span>
                  <span>€{selectedProperty.discounted_price_monthly * 2}</span>
                </div>
              </div>
              
              {isApplied ? (
                <div className="bg-primary/20 p-4 rounded-lg mb-4 text-center">
                  <CheckCircle className="mx-auto h-6 w-6 text-primary mb-2" />
                  <p className="text-white font-semibold">
                    Domanda già presentata
                  </p>
                  <p className="text-white/60 text-sm">
                    Stato: {applicationStatus === 'pending' ? 'In attesa' : applicationStatus}
                  </p>
                </div>
              ) : (
                <Button 
                  className="w-full mb-4 bg-primary hover:bg-primary/90"
                  onClick={() => handleApply(selectedProperty)}
                >
                  Presenta Domanda
                </Button>
              )}
              
              <div className="text-white/60 text-sm text-center">
                <p>Una volta presentata la domanda, verrai contattato dal proprietario per un colloquio.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative pb-20 md:pb-0">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-xl" />
      </div>

      <Tabs defaultValue="search" className="w-full relative" value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="search" className="focus:outline-none">
          {renderSearchForm()}
        </TabsContent>
        
        <TabsContent value="results" className="focus:outline-none">
          {renderResultsList()}
        </TabsContent>
        
        <TabsContent value="property" className="focus:outline-none">
          {renderPropertyDetail()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedRentalSection;
