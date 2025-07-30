import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PropertyCard from './PropertyCard';
import PropertyFilters from './PropertyFilters';
import { Loader2 } from 'lucide-react';

export interface UnifiedProperty {
  id: string;
  name: string;
  location: string;
  description?: string;
  images: string[];
  price_per_night?: number;
  market_price_monthly?: number;
  discounted_price_monthly?: number;
  investment_goal?: number;
  amount_raised?: number;
  rating?: number;
  reviews_count?: number;
  usage_types: ('investment' | 'short_term' | 'long_term')[];
  amenities?: string[];
  property_type: 'hub' | 'student_property';
  created_at: string;
}

export type PropertyUsageFilter = 'all' | 'investment' | 'short_term' | 'long_term';

const UnifiedPropertyGrid = () => {
  const [properties, setProperties] = useState<UnifiedProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usageFilter, setUsageFilter] = useState<PropertyUsageFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const loadProperties = async () => {
    try {
      setIsLoading(true);
      
      // Load hubs (investment + short-term)
      const { data: hubs, error: hubsError } = await supabase
        .from('hubs')
        .select('*');

      if (hubsError) throw hubsError;

      // Load student properties (long-term)
      const { data: studentProps, error: studentError } = await supabase
        .from('student_properties')
        .select('*');

      if (studentError) throw studentError;

      // Transform hubs
      const transformedHubs: UnifiedProperty[] = (hubs || []).map(hub => ({
        id: hub.id,
        name: hub.name,
        location: hub.location,
        description: hub.description,
        images: hub.images || [],
        price_per_night: hub.price_per_night,
        investment_goal: hub.investment_goal,
        amount_raised: hub.amount_raised,
        rating: hub.rating,
        reviews_count: hub.reviews_count,
        usage_types: ['investment', 'short_term'] as ('investment' | 'short_term' | 'long_term')[],
        amenities: hub.amenities,
        property_type: 'hub',
        created_at: hub.created_at
      }));

      // Transform student properties
      const transformedStudentProps: UnifiedProperty[] = (studentProps || []).map(prop => ({
        id: prop.id,
        name: prop.title,
        location: `${prop.address}, ${prop.city}`,
        description: prop.description,
        images: prop.images || [],
        market_price_monthly: prop.market_price_monthly,
        discounted_price_monthly: prop.discounted_price_monthly,
        usage_types: ['long_term'] as ('investment' | 'short_term' | 'long_term')[],
        amenities: [
          ...(prop.has_kitchen ? ['Cucina'] : []),
          ...(prop.has_living_room ? ['Soggiorno'] : []),
          ...(prop.has_balcony ? ['Balcone'] : []),
          ...(prop.is_furnished ? ['Arredato'] : []),
          ...(prop.internet_available ? ['Internet'] : []),
        ],
        property_type: 'student_property',
        created_at: prop.created_at
      }));

      const allProperties = [...transformedHubs, ...transformedStudentProps];
      setProperties(allProperties);

    } catch (error) {
      console.error('Error loading properties:', error);
      toast({
        title: "Errore",
        description: "Errore nel caricamento delle proprietà",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const filteredProperties = properties.filter(property => {
    const matchesUsage = usageFilter === 'all' || property.usage_types.includes(usageFilter);
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesUsage && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Tutte le Proprietà</h1>
        <p className="text-white/60">Scopri opportunità di investimento, affitto e soggiorni</p>
      </div>

      <PropertyFilters
        usageFilter={usageFilter}
        setUsageFilter={setUsageFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-white/60 text-lg">Nessuna proprietà trovata</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedPropertyGrid;