
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PropertyCard } from '@/components/rent/PropertyCard';
import { StudentProperty } from '@/types/rental';

const Rent = () => {
  const { data: properties, isLoading } = useQuery({
    queryKey: ['student-properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('student_properties')
        .select('*');
      
      if (error) throw error;
      return data as StudentProperty[];
    },
  });

  const handlePropertySelect = (property: StudentProperty) => {
    console.log('Selected property:', property);
    // Will implement property detail view later
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
      <h1 className="text-4xl font-bold mb-8 gradient-text">Affitta per Studenti</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties?.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onSelect={handlePropertySelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Rent;
