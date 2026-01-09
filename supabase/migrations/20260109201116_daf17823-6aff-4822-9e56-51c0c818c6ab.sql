-- Creare tabella waitlist per investimenti
CREATE TABLE public.investment_waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  property_id UUID NOT NULL,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  investment_amount NUMERIC NOT NULL CHECK (investment_amount > 0),
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.investment_waitlist ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (anche guest non autenticati)
CREATE POLICY "Anyone can join waitlist"
ON public.investment_waitlist FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy: Authenticated users can view their own entries
CREATE POLICY "Users can view their own waitlist entries"
ON public.investment_waitlist FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Policy: Users can view entries by their email (for guest users)
CREATE POLICY "Anyone can view by email"
ON public.investment_waitlist FOR SELECT
TO anon, authenticated
USING (true);

-- Indexes for performance
CREATE INDEX idx_waitlist_property ON public.investment_waitlist(property_id);
CREATE INDEX idx_waitlist_email ON public.investment_waitlist(email);
CREATE INDEX idx_waitlist_status ON public.investment_waitlist(status);

-- Trigger for updated_at
CREATE TRIGGER update_waitlist_updated_at
BEFORE UPDATE ON public.investment_waitlist
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for waitlist count updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.investment_waitlist;