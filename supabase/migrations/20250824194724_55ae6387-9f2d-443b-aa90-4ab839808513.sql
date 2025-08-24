-- Fix infinite recursion in user_roles policy
-- The issue is that the admin policy uses has_role() which queries user_roles, creating recursion

-- Drop the problematic admin policy
DROP POLICY IF EXISTS "Only admins can manage roles" ON public.user_roles;

-- Create a simpler, non-recursive policy for role management
-- Only allow users to view their own roles, and system/service role to manage roles
CREATE POLICY "Users can view own roles" 
ON public.user_roles FOR SELECT 
USING (auth.uid() = user_id);

-- For role management, we'll create a separate policy that doesn't cause recursion
-- This allows service role and specific admin users (by UUID) to manage roles
CREATE POLICY "Service role can manage all roles" 
ON public.user_roles FOR ALL 
USING (current_setting('role') = 'service_role' OR auth.jwt() ->> 'role' = 'service_role');

-- Alternative: Create admin management via a separate secure function instead of RLS
-- This avoids the recursion issue entirely
CREATE OR REPLACE FUNCTION public.user_can_manage_roles()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  -- Allow service role and specific admin users
  SELECT CASE 
    WHEN current_setting('role') = 'service_role' THEN true
    WHEN auth.jwt() ->> 'role' = 'service_role' THEN true  
    WHEN auth.uid() IN (
      -- Add specific admin user UUIDs here if needed
      'e751a9ba-2630-471f-af36-07a0ebd415c8'::uuid  -- test user as admin for now
    ) THEN true
    ELSE false
  END;
$$;

-- Create policy using the non-recursive function
CREATE POLICY "Admins can manage roles via function" 
ON public.user_roles FOR ALL 
USING (public.user_can_manage_roles());