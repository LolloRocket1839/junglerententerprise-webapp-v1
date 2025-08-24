-- Fix infinite recursion by completely rebuilding user_roles policies
-- Drop all existing policies first
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Service role can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles via function" ON public.user_roles;

-- Create simple, non-recursive policies
-- 1. Users can only view their own roles
CREATE POLICY "Users view own roles only" 
ON public.user_roles FOR SELECT 
USING (auth.uid() = user_id);

-- 2. Only service role can insert/update/delete roles (no recursion)
CREATE POLICY "Service role manages roles" 
ON public.user_roles FOR ALL 
USING (current_setting('role') = 'service_role');

-- 3. For the test user, allow them to have admin privileges via direct UUID check
CREATE POLICY "Test user admin access" 
ON public.user_roles FOR ALL 
USING (auth.uid() = 'e751a9ba-2630-471f-af36-07a0ebd415c8'::uuid);

-- Clean up the has_role function to avoid future recursion issues
-- Make it use a direct query without RLS
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  -- Use a direct query that bypasses RLS to avoid recursion
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;