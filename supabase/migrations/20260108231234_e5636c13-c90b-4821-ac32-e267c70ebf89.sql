-- Create student_applications table
CREATE TABLE IF NOT EXISTS public.student_applications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    property_id uuid NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'withdrawn')),
    move_in_date DATE,
    message TEXT,
    documents TEXT[],
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.student_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own applications"
ON public.student_applications FOR SELECT TO authenticated
USING (auth.uid() = student_id);

CREATE POLICY "Students can create applications"
ON public.student_applications FOR INSERT TO authenticated
WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Admins can manage all applications"
ON public.student_applications FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add admin policies to tourist_bookings
CREATE POLICY "Admins can manage all tourist_bookings"
ON public.tourist_bookings FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add admin policies to profiles for management
CREATE POLICY "Admins can update all profiles"
ON public.profiles FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add admin policies to payment_transactions
CREATE POLICY "Admins can view all payments"
ON public.payment_transactions FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));