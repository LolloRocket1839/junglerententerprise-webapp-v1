-- Create student_applications table for booking requests
CREATE TABLE IF NOT EXISTS public.student_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES public.student_properties(id) ON DELETE CASCADE,
  move_in_date TIMESTAMP WITH TIME ZONE NOT NULL,
  move_out_date TIMESTAMP WITH TIME ZONE NOT NULL,
  payment_plan TEXT NOT NULL CHECK (payment_plan IN ('monthly', 'semester', 'annual')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  university TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.student_applications ENABLE ROW LEVEL SECURITY;

-- Students can view their own applications
CREATE POLICY "Students can view their own applications"
ON public.student_applications
FOR SELECT
USING (auth.uid() = student_id);

-- Students can create their own applications
CREATE POLICY "Students can create their own applications"
ON public.student_applications
FOR INSERT
WITH CHECK (auth.uid() = student_id);

-- Students can update their own applications
CREATE POLICY "Students can update their own applications"
ON public.student_applications
FOR UPDATE
USING (auth.uid() = student_id);

-- Add index for better query performance
CREATE INDEX idx_student_applications_student_id ON public.student_applications(student_id);
CREATE INDEX idx_student_applications_property_id ON public.student_applications(property_id);
CREATE INDEX idx_student_applications_status ON public.student_applications(status);