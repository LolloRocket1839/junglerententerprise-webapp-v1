-- Drop function and all dependent policies
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role) CASCADE;

-- Now create the corrected function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  -- Bypass RLS by using a security definer function that has elevated privileges
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- Now recreate the user_roles policies without recursion
-- Drop any remaining policies first
DROP POLICY IF EXISTS "Users view own roles only" ON public.user_roles;
DROP POLICY IF EXISTS "Service role manages roles" ON public.user_roles;
DROP POLICY IF EXISTS "Test user admin access" ON public.user_roles;

-- Create clean, simple policies
CREATE POLICY "Users can view own roles" 
ON public.user_roles FOR SELECT 
USING (auth.uid() = user_id);

-- Service role can manage everything  
CREATE POLICY "Service role can manage roles" 
ON public.user_roles FOR ALL 
USING (current_setting('role') = 'service_role');

-- Test user gets admin access (for development)
CREATE POLICY "Test user has admin access" 
ON public.user_roles FOR ALL 
USING (auth.uid() = 'e751a9ba-2630-471f-af36-07a0ebd415c8'::uuid);