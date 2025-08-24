-- Comprehensive Security Fixes Migration

-- =====================================================
-- 1. CREATE SECURE PROFILE ACCESS FUNCTION
-- =====================================================

-- Create secure function for roommate matching that only exposes safe data
CREATE OR REPLACE FUNCTION public.get_public_profile_summaries()
RETURNS TABLE (
  id uuid,
  first_name text,
  bio text,
  current_city text,
  future_city text,
  budget_min numeric,
  budget_max numeric,
  move_in_date timestamptz,
  created_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    p.id,
    p.first_name,
    p.bio,
    p.current_city,
    p.future_city,
    p.budget_min,
    p.budget_max,
    p.move_in_date,
    p.created_at
  FROM profiles p
  WHERE p.id != COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000'::uuid);
$$;

-- =====================================================
-- 2. REMOVE DANGEROUS PUBLIC POLICIES
-- =====================================================

-- Drop dangerous public policies on roommate data
DROP POLICY IF EXISTS "Allow public access to roommate answers" ON public.roommate_answers;
DROP POLICY IF EXISTS "Allow public access to roommate matches" ON public.roommate_matches;
DROP POLICY IF EXISTS "Allow public access to wallet transactions" ON public.wallet_transactions;

-- Remove the overly broad profile matching policy
DROP POLICY IF EXISTS "Users can view limited profile data for matching" ON public.profiles;

-- =====================================================
-- 3. SECURE SECURITY DEFINER FUNCTIONS
-- =====================================================

-- Revoke public access to sensitive functions
REVOKE ALL ON FUNCTION public.add_jungle_coins(integer, text) FROM public;
REVOKE ALL ON FUNCTION public.add_jungle_coins(integer, text) FROM authenticated;

REVOKE ALL ON FUNCTION public.create_notification(uuid, text, text, text, jsonb) FROM public;
REVOKE ALL ON FUNCTION public.create_notification(uuid, text, text, text, jsonb) FROM authenticated;

-- Create restricted wrapper for jungle coins (only for system use via triggers)
CREATE OR REPLACE FUNCTION public.system_add_jungle_coins(amount integer, reason text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- This function can only be called by triggers or service role
  IF current_setting('role') NOT IN ('service_role', 'supabase_admin') AND 
     NOT EXISTS (SELECT 1 FROM pg_stat_activity WHERE application_name LIKE '%trigger%') THEN
    RAISE EXCEPTION 'Access denied: This function is for system use only';
  END IF;
  
  PERFORM add_jungle_coins(amount, reason);
END;
$$;

-- =====================================================
-- 4. SECURE STORAGE BUCKETS
-- =====================================================

-- Make chat_attachments private
UPDATE storage.buckets 
SET public = false 
WHERE id = 'chat_attachments';

-- Create secure storage policies for chat attachments
CREATE POLICY "Users can view their own chat attachments"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'chat_attachments' AND 
  auth.uid()::text = ANY(string_to_array(name, '/'))
);

CREATE POLICY "Users can upload their own chat attachments"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'chat_attachments' AND 
  auth.uid()::text = (string_to_array(name, '/'))[1]
);

-- =====================================================
-- 5. SECURE USER ROLES TABLE
-- =====================================================

-- Enable RLS on user_roles if not already enabled
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create admin-only policies for user roles
CREATE POLICY "Only admins can manage user roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role
  )
);

-- =====================================================
-- 6. HARDEN EXISTING SECURITY DEFINER FUNCTIONS
-- =====================================================

-- Update handle_new_user function with proper search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
begin
  -- Create profile for new user, pulling first/last name from metadata when available
  insert into public.profiles (id, first_name, last_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', '')
  )
  on conflict (id) do nothing;

  -- Create wallet for new user (idempotent)
  insert into public.jungle_wallet (profile_id)
  values (new.id)
  on conflict do nothing;

  return new;
end;
$$;

-- Update handle_new_user_role function with proper search_path
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
begin
  insert into public.user_roles (user_id, role)
  values (
    new.id,
    coalesce((new.raw_user_meta_data->>'initial_role')::app_role, 'student'::app_role)
  )
  on conflict (user_id, role) do nothing;

  return new;
end;
$$;

-- Update has_role function with proper search_path
CREATE OR REPLACE FUNCTION public.has_role(user_id uuid, required_role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = $1
      AND role = $2
  );
$$;