-- Create RLS policies for profiles table
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Create RLS policies for user_roles table
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create RLS policies for jungle_wallet table
CREATE POLICY "Users can view their own wallet" 
ON public.jungle_wallet 
FOR SELECT 
USING (auth.uid() = profile_id);

CREATE POLICY "Users can update their own wallet" 
ON public.jungle_wallet 
FOR UPDATE 
USING (auth.uid() = profile_id);

-- Create RLS policies for wallet_transactions table
CREATE POLICY "Users can view their own transactions" 
ON public.wallet_transactions 
FOR SELECT 
USING (auth.uid() = (SELECT profile_id FROM jungle_wallet WHERE id = wallet_id));

-- Fix function search paths
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Create profile for new user
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (new.id, '', '');
  
  -- Create wallet for new user
  INSERT INTO public.jungle_wallet (profile_id)
  VALUES (new.id);
  
  RETURN new;
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Set default role as student if no role specified
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    COALESCE(
      (NEW.raw_user_meta_data->>'initial_role')::app_role,
      'student'::app_role
    )
  );
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_roommate_answer()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  coin_amount INTEGER;
BEGIN
  -- Get coin reward for the question
  SELECT coin_reward INTO coin_amount
  FROM roommate_questions
  WHERE id = NEW.question_id;

  -- Award coins to user
  PERFORM add_jungle_coins(
    coin_amount,
    'Answered roommate question'
  );

  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.has_role(user_id uuid, required_role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = $1
      AND role = $2
  );
$function$;

CREATE OR REPLACE FUNCTION public.update_guest_stats()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;