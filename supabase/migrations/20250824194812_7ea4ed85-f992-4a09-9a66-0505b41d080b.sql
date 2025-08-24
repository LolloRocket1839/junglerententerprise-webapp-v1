-- Drop and recreate the has_role function to fix parameter naming
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role);

-- Create the function with correct parameter names and no recursion
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