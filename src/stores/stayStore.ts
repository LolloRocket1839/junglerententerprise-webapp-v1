import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import { measurePerformance, optimizeApiCall } from '../utils/performance';

export interface Stay {
  id: string;
  title: string;
  description: string;
  location: string;
  price_per_night: number;
  images: string[];
  amenities: string[];
  max_guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  category: string;
  rating: number;
  review_count: number;
  host_id: string;
  created_at: string;
  updated_at: string;
}

export interface StayFilters {
  location?: string;
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  priceRange?: [number, number];
  category?: string;
  amenities?: string[];
  rating?: number;
}

interface StayStore {
  stays: Stay[];
  featuredStays: Stay[];
  selectedStay: Stay | null;
  filters: StayFilters;
  loading: boolean;
  error: string | null;
  setStays: (stays: Stay[]) => void;
  setFeaturedStays: (stays: Stay[]) => void;
  setSelectedStay: (stay: Stay | null) => void;
  setFilters: (filters: StayFilters) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchStays: (filters?: StayFilters) => Promise<void>;
  fetchFeaturedStays: () => Promise<void>;
  fetchStayById: (id: string) => Promise<void>;
  createStay: (stay: Omit<Stay, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateStay: (id: string, stay: Partial<Stay>) => Promise<void>;
  deleteStay: (id: string) => Promise<void>;
}

const useStayStore = create<StayStore>()(
  persist(
    (set, get) => ({
      stays: [],
      featuredStays: [],
      selectedStay: null,
      filters: {},
      loading: false,
      error: null,

      setStays: (stays) => set({ stays }),
      setFeaturedStays: (stays) => set({ featuredStays: stays }),
      setSelectedStay: (stay) => set({ selectedStay: stay }),
      setFilters: (filters) => set({ filters }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      fetchStays: async (filters = {}) => {
        const { setLoading, setError, setStays } = get();
        setLoading(true);
        setError(null);

        try {
          const { data: stays, error } = await measurePerformance(
            'fetchStays',
            async () => {
              let query = supabase
                .from('stays')
                .select('*');

              if (filters.location) {
                query = query.ilike('location', `%${filters.location}%`);
              }

              if (filters.category) {
                query = query.eq('category', filters.category);
              }

              if (filters.priceRange) {
                query = query
                  .gte('price_per_night', filters.priceRange[0])
                  .lte('price_per_night', filters.priceRange[1]);
              }

              if (filters.amenities?.length) {
                query = query.contains('amenities', filters.amenities);
              }

              if (filters.rating) {
                query = query.gte('rating', filters.rating);
              }

              return query.order('created_at', { ascending: false });
            }
          );

          if (error) throw error;
          setStays(stays || []);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      },

      fetchFeaturedStays: async () => {
        const { setLoading, setError, setFeaturedStays } = get();
        setLoading(true);
        setError(null);

        try {
          const { data: stays, error } = await measurePerformance(
            'fetchFeaturedStays',
            async () => {
              return optimizeApiCall(
                'featured_stays',
                async () => {
                  return supabase
                    .from('stays')
                    .select('*')
                    .gte('rating', 4)
                    .order('rating', { ascending: false })
                    .limit(6);
                },
                5 * 60 * 1000 // Cache for 5 minutes
              );
            }
          );

          if (error) throw error;
          setFeaturedStays(stays || []);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      },

      fetchStayById: async (id) => {
        const { setLoading, setError, setSelectedStay } = get();
        setLoading(true);
        setError(null);

        try {
          const { data: stay, error } = await measurePerformance(
            'fetchStayById',
            async () => {
              return optimizeApiCall(
                `stay_${id}`,
                async () => {
                  return supabase
                    .from('stays')
                    .select('*')
                    .eq('id', id)
                    .single();
                },
                5 * 60 * 1000 // Cache for 5 minutes
              );
            }
          );

          if (error) throw error;
          setSelectedStay(stay);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      },

      createStay: async (stay) => {
        const { setLoading, setError } = get();
        setLoading(true);
        setError(null);

        try {
          const { error } = await measurePerformance(
            'createStay',
            async () => {
              return supabase
                .from('stays')
                .insert([stay]);
            }
          );

          if (error) throw error;
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      },

      updateStay: async (id, stay) => {
        const { setLoading, setError } = get();
        setLoading(true);
        setError(null);

        try {
          const { error } = await measurePerformance(
            'updateStay',
            async () => {
              return supabase
                .from('stays')
                .update(stay)
                .eq('id', id);
            }
          );

          if (error) throw error;
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      },

      deleteStay: async (id) => {
        const { setLoading, setError } = get();
        setLoading(true);
        setError(null);

        try {
          const { error } = await measurePerformance(
            'deleteStay',
            async () => {
              return supabase
                .from('stays')
                .delete()
                .eq('id', id);
            }
          );

          if (error) throw error;
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      },
    }),
    {
      name: 'stay-storage',
      partialize: (state) => ({
        filters: state.filters,
        selectedStay: state.selectedStay,
      }),
    }
  )
);

export default useStayStore; 