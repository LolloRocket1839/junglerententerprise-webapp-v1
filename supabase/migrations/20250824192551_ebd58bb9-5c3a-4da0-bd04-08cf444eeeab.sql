-- Fix remaining function search_path security issues

-- Update remaining functions with proper search_path
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