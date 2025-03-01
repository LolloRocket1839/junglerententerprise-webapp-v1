
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { TouristProperty } from '@/types/tourist';
import { TouristPropertyCard } from '@/components/stay/TouristPropertyCard';

const Stay = () => {
  const { data: properties, isLoading } = useQuery({
    queryKey: ['tourist-properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tourist_properties')
        .select('*');
      
      if (error) throw error;
      return data as TouristProperty[];
    },
  });

  const handlePropertySelect = (property: TouristProperty) => {
    console.log('Proprietà selezionata:', property);
    // Implementeremo la vista dei dettagli della proprietà in seguito
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 gradient-text">Soggiorna</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties?.map((property) => (
          <TouristPropertyCard
            key={property.id}
            property={property}
            onSelect={handlePropertySelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Stay;
