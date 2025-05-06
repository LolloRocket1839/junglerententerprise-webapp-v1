-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE,
    check_in TIMESTAMP WITH TIME ZONE NOT NULL,
    check_out TIMESTAMP WITH TIME ZONE NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    guest_info JSONB,
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
    payment_intent_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS bookings_user_id_idx ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS bookings_room_id_idx ON public.bookings(room_id);
CREATE INDEX IF NOT EXISTS bookings_check_in_idx ON public.bookings(check_in);
CREATE INDEX IF NOT EXISTS bookings_check_out_idx ON public.bookings(check_out);
CREATE INDEX IF NOT EXISTS bookings_payment_status_idx ON public.bookings(payment_status);
CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON public.bookings(created_at);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own bookings"
    ON public.bookings
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
    ON public.bookings
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
    ON public.bookings
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookings"
    ON public.bookings
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Create function to check room availability
CREATE OR REPLACE FUNCTION public.check_room_availability()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM public.bookings
        WHERE room_id = NEW.room_id
        AND payment_status = 'paid'
        AND (
            (check_in <= NEW.check_in AND check_out > NEW.check_in)
            OR (check_in < NEW.check_out AND check_out >= NEW.check_out)
            OR (check_in >= NEW.check_in AND check_out <= NEW.check_out)
        )
    ) THEN
        RAISE EXCEPTION 'Room is not available for the selected dates';
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for room availability check
CREATE TRIGGER check_room_availability_trigger
    BEFORE INSERT OR UPDATE ON public.bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.check_room_availability(); 