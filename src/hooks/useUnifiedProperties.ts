import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type UsageMode = 'student_only' | 'tourist_only' | 'hybrid' | 'all';

export interface UnifiedProperty {
  id: string;
  source: 'dealflow' | 'direct' | 'migrated_hub' | 'migrated_student';
  dealflow_id?: string;
  legacy_hub_id?: string;
  legacy_student_id?: string;
  status: string;
  
  // Basic Info
  title: string;
  description?: string;
  address: string;
  city: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  images: string[];
  floor_plan_url?: string;
  virtual_tour_url?: string;
  
  // Physical Characteristics
  size_sqm?: number;
  rooms: number;
  bathrooms?: number;
  floor_number?: number;
  has_kitchen: boolean;
  has_living_room: boolean;
  has_balcony: boolean;
  is_furnished: boolean;
  appliances: string[];
  
  // Amenities & Services
  amenities: string[];
  utilities: string[];
  internet_available: boolean;
  internet_speed?: number;
  utilities_included: boolean;
  estimated_utilities_cost?: number;
  
  // Financial
  acquisition_cost?: number;
  renovation_cost?: number;
  current_value?: number;
  
  // Usage Mode & Availability
  usage_mode: 'student_only' | 'tourist_only' | 'hybrid';
  
  // Student Rental Info
  student_price_monthly?: number;
  deposit_amount?: number;
  academic_year_start?: string;
  academic_year_end?: string;
  
  // Tourist Rental Info
  tourist_price_nightly?: number;
  cleaning_fee?: number;
  summer_period_start?: string;
  summer_period_end?: string;
  check_in_time?: string;
  check_out_time?: string;
  min_stay_nights?: number;
  
  // Investment Info
  investment_goal: number;
  amount_raised: number;
  tokens_issued: number;
  investor_share_percentage: number;
  
  // Metadata
  created_at: string;
  updated_at: string;
}

interface UseUnifiedPropertiesOptions {
  usageMode?: UsageMode;
  city?: string;
  status?: string;
  enabled?: boolean;
}

export const useUnifiedProperties = (options: UseUnifiedPropertiesOptions = {}) => {
  const { usageMode = 'all', city, status = 'active', enabled = true } = options;

  return useQuery({
    queryKey: ['unified-properties', usageMode, city, status],
    queryFn: async () => {
      try {
        let query = supabase
          .from('unified_properties')
          .select('*')
          .eq('status', status);

        // Filter by usage mode
        if (usageMode !== 'all') {
          if (usageMode === 'hybrid') {
            query = query.eq('usage_mode', 'hybrid');
          } else {
            query = query.in('usage_mode', [usageMode, 'hybrid']);
          }
        }

        // Filter by city if provided
        if (city) {
          query = query.eq('city', city);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching unified properties:', error);
          toast.error("Impossibile caricare le proprietà");
          throw error;
        }

        return data as UnifiedProperty[];
      } catch (error) {
        console.error('Error in unified properties query:', error);
        toast.error("Si è verificato un errore nel caricamento delle proprietà");
        return [];
      }
    },
    enabled,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUnifiedProperty = (propertyId: string | null) => {
  return useQuery({
    queryKey: ['unified-property', propertyId],
    queryFn: async () => {
      if (!propertyId) return null;

      try {
        const { data, error } = await supabase
          .from('unified_properties')
          .select('*')
          .eq('id', propertyId)
          .single();

        if (error) {
          console.error('Error fetching property:', error);
          throw error;
        }

        return data as UnifiedProperty;
      } catch (error) {
        console.error('Error in property query:', error);
        return null;
      }
    },
    enabled: !!propertyId,
    retry: 1,
  });
};