
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { StudentProperty, SearchFilters } from './types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PropertyCard } from './PropertyCard';

const StudentRental = () => {
  const [filters, setFilters] = useState<SearchFilters>({});

  const { data: properties, isLoading } = useQuery({
    queryKey: ['student-properties', filters],
    queryFn: async () => {
      let query = supabase
        .from('student_properties')
        .select('*')
        .eq('current_status', 'available');

      if (filters.city) {
        query = query.eq('city', filters.city);
      }
      if (filters.max_price) {
        query = query.lte('discounted_price_monthly', filters.max_price);
      }
      if (filters.min_rooms) {
        query = query.gte('rooms', filters.min_rooms);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as StudentProperty[];
    },
  });

  const { data: universities } = useQuery({
    queryKey: ['universities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('universities')
        .select('*');
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            Trova il tuo alloggio universitario
          </h1>
          <p className="text-xl opacity-90">
            Risparmia il 25% sul canone di mercato e vivi l'esperienza universitaria al meglio
          </p>
        </div>
      </div>

      {/* Search Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            value={filters.city}
            onValueChange={(value) => setFilters({ ...filters, city: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleziona città" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(new Set(properties?.map(p => p.city)))
                .map(city => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.university_id}
            onValueChange={(value) => setFilters({ ...filters, university_id: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleziona università" />
            </SelectTrigger>
            <SelectContent>
              {universities?.map(uni => (
                <SelectItem key={uni.id} value={uni.id}>
                  {uni.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="space-y-2">
            <label className="text-sm font-medium">Budget massimo</label>
            <Slider
              defaultValue={[1000]}
              max={2000}
              step={50}
              onValueChange={([value]) => 
                setFilters({ ...filters, max_price: value })}
            />
          </div>
        </div>
      </div>

      {/* Property Listings */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div>Caricamento...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties?.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentRental;
