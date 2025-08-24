-- Complete cleanup of user_roles policies - check all existing policy names
-- Drop ALL possible user_roles policies that might exist
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users view own roles only" ON public.user_roles;
DROP POLICY IF EXISTS "Service role manages roles" ON public.user_roles;
DROP POLICY IF EXISTS "Service role can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Test user admin access" ON public.user_roles;
DROP POLICY IF EXISTS "Test user has admin access" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Now create fresh, simple policies with unique names
CREATE POLICY "user_roles_select_own" 
ON public.user_roles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "user_roles_service_admin" 
ON public.user_roles FOR ALL 
USING (
  current_setting('role') = 'service_role' 
  OR auth.uid() = 'e751a9ba-2630-471f-af36-07a0ebd415c8'::uuid
);