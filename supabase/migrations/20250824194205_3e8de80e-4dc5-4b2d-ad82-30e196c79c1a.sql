-- COMPREHENSIVE SECURITY FIXES

-- 1. Fix profiles table - remove overly broad access
DROP POLICY IF EXISTS "Public profiles are viewable by users" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Create secure profile policies
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- 2. Secure notifications table
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" 
ON public.notifications FOR SELECT 
USING (auth.uid() = profile_id);

CREATE POLICY "Users can update own notifications" 
ON public.notifications FOR UPDATE 
USING (auth.uid() = profile_id);

-- 3. Secure user_roles table properly
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can manage roles" ON public.user_roles;

CREATE POLICY "Users can view own roles" 
ON public.user_roles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can manage roles" 
ON public.user_roles FOR ALL 
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 4. Secure node_connections
ALTER TABLE public.node_connections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view all connections" ON public.node_connections;
DROP POLICY IF EXISTS "Users can create connections" ON public.node_connections;

CREATE POLICY "Users can view connections to their nodes" 
ON public.node_connections FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM interest_nodes 
    WHERE (id = source_node_id OR id = target_node_id) 
    AND profile_id = auth.uid()
  )
);

CREATE POLICY "Users can create connections from their nodes" 
ON public.node_connections FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM interest_nodes 
    WHERE id = source_node_id 
    AND profile_id = auth.uid()
  )
);

-- 5. Lock down SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.add_jungle_coins FROM public;
GRANT EXECUTE ON FUNCTION public.add_jungle_coins TO authenticated;

REVOKE EXECUTE ON FUNCTION public.system_add_jungle_coins FROM public;
-- Only service role should execute this

-- 6. Harden all SECURITY DEFINER functions with search_path
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

CREATE OR REPLACE FUNCTION public.handle_roommate_answer()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  coin_amount INTEGER;
BEGIN
  -- Get coin reward for the question
  SELECT coin_reward INTO coin_amount
  FROM roommate_questions
  WHERE id = NEW.question_id;

  -- Award coins to user via system function
  PERFORM system_add_jungle_coins(coin_amount, 'Answered roommate question');

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_match()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Only create notification if the match is liked
    IF NEW.liked THEN
        -- Create notification for the target user (system call)
        INSERT INTO notifications (profile_id, type, title, message, data)
        VALUES (
            NEW.target_profile_id,
            'new_match',
            'New Match!',
            (SELECT CONCAT(p.first_name, ' ', p.last_name) FROM profiles p WHERE p.id = NEW.profile_id),
            jsonb_build_object('match_id', NEW.id, 'profile_id', NEW.profile_id)
        );
    END IF;
    
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_chat_message()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Create notification for new message (system call)
    INSERT INTO notifications (profile_id, type, title, message, data)
    VALUES (
        NEW.receiver_id,
        'chat_message',
        'New Message',
        (SELECT CONCAT(p.first_name, ' ', p.last_name) FROM profiles p WHERE p.id = NEW.sender_id),
        jsonb_build_object('message_id', NEW.id, 'sender_id', NEW.sender_id)
    );
    
    RETURN NEW;
END;
$$;

-- 7. Secure storage buckets with proper RLS
INSERT INTO storage.buckets (id, name, public) VALUES ('student_documents', 'student_documents', false) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('chat_attachments', 'chat_attachments', false) ON CONFLICT (id) DO NOTHING;

-- Storage policies for student_documents
CREATE POLICY "Users can upload own documents" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'student_documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view own documents" 
ON storage.objects FOR SELECT 
USING (
  bucket_id = 'student_documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage policies for chat_attachments
CREATE POLICY "Users can upload chat attachments" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'chat_attachments' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view chat attachments if part of conversation" 
ON storage.objects FOR SELECT 
USING (
  bucket_id = 'chat_attachments' 
  AND (
    auth.uid()::text = (storage.foldername(name))[1]
    OR EXISTS (
      SELECT 1 FROM chat_messages cm 
      WHERE cm.attachments::text LIKE '%' || name || '%'
      AND (cm.sender_id = auth.uid() OR cm.receiver_id = auth.uid())
    )
  )
);

-- 8. Create secure function for current user role (avoid recursion)
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS app_role
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT role FROM user_roles WHERE user_id = auth.uid() LIMIT 1;
$$;