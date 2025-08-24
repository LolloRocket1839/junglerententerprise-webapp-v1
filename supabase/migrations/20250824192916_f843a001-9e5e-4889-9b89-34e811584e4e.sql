-- Drop and recreate the function with all needed fields
DROP FUNCTION IF EXISTS public.get_public_profile_summaries();

CREATE OR REPLACE FUNCTION public.get_public_profile_summaries()
RETURNS TABLE (
  id uuid,
  first_name text,
  last_name text,
  avatar_url text,
  bio text,
  current_city text,
  future_city text,
  budget_min numeric,
  budget_max numeric,
  move_in_date timestamptz,
  preferences jsonb,
  created_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    p.id,
    p.first_name,
    p.last_name,
    p.avatar_url,
    p.bio,
    p.current_city,
    p.future_city,
    p.budget_min,
    p.budget_max,
    p.move_in_date,
    p.preferences,
    p.created_at
  FROM profiles p
  WHERE p.id != COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000'::uuid);
$$;