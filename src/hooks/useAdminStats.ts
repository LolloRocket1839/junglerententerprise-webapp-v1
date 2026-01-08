import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface AdminStats {
  totalProperties: number;
  totalUsers: number;
  pendingApplications: number;
  activeBookings: number;
  monthlyRevenue: number;
  totalInvestments: number;
}

export function useAdminStats() {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async (): Promise<AdminStats> => {
      const [
        propertiesRes,
        usersRes,
        applicationsRes,
        bookingsRes,
        investmentsRes,
        revenueRes
      ] = await Promise.all([
        supabase.from('unified_properties').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('student_applications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('unified_bookings').select('*', { count: 'exact', head: true }).eq('status', 'confirmed'),
        supabase.from('investments').select('amount').eq('status', 'completed'),
        supabase.from('property_revenue_tracking').select('total_revenue')
      ]);

      const totalInvestments = investmentsRes.data?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0;
      const monthlyRevenue = revenueRes.data?.reduce((sum, rev) => sum + Number(rev.total_revenue || 0), 0) || 0;

      return {
        totalProperties: propertiesRes.count || 0,
        totalUsers: usersRes.count || 0,
        pendingApplications: applicationsRes.count || 0,
        activeBookings: bookingsRes.count || 0,
        monthlyRevenue,
        totalInvestments
      };
    },
    staleTime: 30000, // 30 seconds
  });
}
