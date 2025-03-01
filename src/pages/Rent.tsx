
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PropertyCard } from '@/components/rent/PropertyCard';
import { StudentProperty } from '@/types/rental';
import { toast } from 'sonner';

const Rent = () => {
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['student-properties'],
    queryFn: async () => {
      console.log('Fetching student properties...');
      const { data, error } = await supabase
        .from('student_properties')
        .select('*')
        .eq('city', 'Torino');
      
      if (error) {
        console.error('Error fetching properties:', error);
        throw error;
      }
      
      console.log('Properties fetched:', data);
      return data as StudentProperty[];
    }
  });

  React.useEffect(() => {
    if (error) {
      toast.error('Errore nel caricamento delle proprietà');
    }
  }, [error]);

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center text-red-500">
          Si è verificato un errore nel caricamento delle proprietà.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Affitto per Studenti a Torino</h1>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Affitto per Studenti a Torino</h1>
        <div className="text-center text-gray-500">
          Nessuna proprietà disponibile al momento a Torino.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 gradient-text">Affitto per Studenti a Torino</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onSelect={(property) => {
              console.log('Property selected:', property);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Rent;
