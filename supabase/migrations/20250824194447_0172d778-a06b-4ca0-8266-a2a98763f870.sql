-- Fix remaining security issues

-- 1. Restrict platform_stats to authenticated users only
DROP POLICY IF EXISTS "Platform stats are public" ON public.platform_stats;
CREATE POLICY "Platform stats viewable by authenticated users" 
ON public.platform_stats FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- 2. Restrict hubs to authenticated users (public read is too broad)
DROP POLICY IF EXISTS "Public can view hubs" ON public.hubs;
CREATE POLICY "Authenticated users can view hubs" 
ON public.hubs FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- 3. Restrict student_properties to authenticated users
DROP POLICY IF EXISTS "Public can view student properties" ON public.student_properties;
CREATE POLICY "Authenticated users can view student properties" 
ON public.student_properties FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- 4. Create tourist_properties table policies (if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'tourist_properties') THEN
        EXECUTE 'ALTER TABLE public.tourist_properties ENABLE ROW LEVEL SECURITY';
        EXECUTE 'CREATE POLICY "Authenticated users can view tourist properties" ON public.tourist_properties FOR SELECT USING (auth.uid() IS NOT NULL)';
    END IF;
END $$;

-- 5. Fix remaining function search paths
CREATE OR REPLACE FUNCTION public.update_guest_stats()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE guests
    SET 
        previous_bookings = (
            SELECT COUNT(*) 
            FROM tourist_bookings 
            WHERE guest_id = NEW.guest_id
        ),
        average_rating = (
            SELECT AVG(rating)::DECIMAL(3,2)
            FROM tourist_reviews
            WHERE guest_id = NEW.guest_id
        )
    WHERE id = NEW.guest_id;
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.create_notification(
  profile_id uuid, 
  type text, 
  title text, 
  message text, 
  data jsonb DEFAULT '{}'::jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    notification_id UUID;
BEGIN
    INSERT INTO public.notifications (profile_id, type, title, message, data)
    VALUES (profile_id, type, title, message, data)
    RETURNING id INTO notification_id;
    
    RETURN notification_id;
END;
$$;

-- 6. Add missing RLS policies for tables that need them
DO $$
BEGIN
    -- Add missing policies for property_university_distances if table has RLS
    IF EXISTS (
        SELECT 1 FROM pg_class c 
        JOIN pg_namespace n ON n.oid = c.relnamespace 
        WHERE n.nspname = 'public' AND c.relname = 'property_university_distances'
        AND c.relrowsecurity = true
    ) THEN
        EXECUTE 'CREATE POLICY "Property distances viewable by authenticated users" ON public.property_university_distances FOR SELECT USING (auth.uid() IS NOT NULL)';
    END IF;

    -- Add missing policies for points_of_interest if table has RLS
    IF EXISTS (
        SELECT 1 FROM pg_class c 
        JOIN pg_namespace n ON n.oid = c.relnamespace 
        WHERE n.nspname = 'public' AND c.relname = 'points_of_interest'
        AND c.relrowsecurity = true
    ) THEN
        EXECUTE 'CREATE POLICY "Points of interest viewable by authenticated users" ON public.points_of_interest FOR SELECT USING (auth.uid() IS NOT NULL)';
    END IF;
END $$;