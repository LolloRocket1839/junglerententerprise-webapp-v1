import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { optimizeApiCall } from '../utils/performance';

interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

interface BookingData {
  id?: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  guestInfo?: GuestInfo;
  paymentStatus?: 'pending' | 'paid' | 'failed';
  paymentIntentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BookingStore {
  bookingData: BookingData;
  isLoading: boolean;
  error: string | null;
  setBookingData: (data: Partial<BookingData>) => void;
  createBooking: () => Promise<void>;
  updateBooking: (data: Partial<BookingData>) => Promise<void>;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookingData: {
        roomId: '',
        checkIn: new Date(),
        checkOut: new Date(),
        totalPrice: 0,
      },
      isLoading: false,
      error: null,

      setBookingData: (data) => {
        set((state) => ({
          bookingData: {
            ...state.bookingData,
            ...data,
            updatedAt: new Date(),
          },
        }));
      },

      createBooking: async () => {
        const { bookingData } = get();
        set({ isLoading: true, error: null });

        try {
          const { data, error } = await optimizeApiCall(
            () => supabase.from('bookings').insert([bookingData]).select(),
            'createBooking'
          );

          if (error) throw error;

          set((state) => ({
            bookingData: {
              ...state.bookingData,
              id: data[0].id,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            isLoading: false,
          }));
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : 'Failed to create booking',
            isLoading: false,
          });
        }
      },

      updateBooking: async (data) => {
        const { bookingData } = get();
        if (!bookingData.id) throw new Error('No booking ID found');

        set({ isLoading: true, error: null });

        try {
          const { error } = await optimizeApiCall(
            () =>
              supabase
                .from('bookings')
                .update({
                  ...data,
                  updatedAt: new Date(),
                })
                .eq('id', bookingData.id),
            'updateBooking'
          );

          if (error) throw error;

          set((state) => ({
            bookingData: {
              ...state.bookingData,
              ...data,
              updatedAt: new Date(),
            },
            isLoading: false,
          }));
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : 'Failed to update booking',
            isLoading: false,
          });
        }
      },

      clearBooking: () => {
        set({
          bookingData: {
            roomId: '',
            checkIn: new Date(),
            checkOut: new Date(),
            totalPrice: 0,
          },
          error: null,
        });
      },
    }),
    {
      name: 'booking-storage',
      partialize: (state) => ({
        bookingData: {
          roomId: state.bookingData.roomId,
          checkIn: state.bookingData.checkIn,
          checkOut: state.bookingData.checkOut,
          totalPrice: state.bookingData.totalPrice,
          guestInfo: state.bookingData.guestInfo,
        },
      }),
    }
  )
); 