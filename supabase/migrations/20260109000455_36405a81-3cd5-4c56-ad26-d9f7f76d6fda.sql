-- RLS policies for investments table
-- Allow authenticated users to create their own investments
CREATE POLICY "Users can create own investments"
ON investments FOR INSERT
TO authenticated
WITH CHECK (profile_id = auth.uid());

-- Allow users to view their own investments
CREATE POLICY "Users can view own investments"
ON investments FOR SELECT
TO authenticated
USING (profile_id = auth.uid());

-- Allow users to update their own investments (for status changes)
CREATE POLICY "Users can update own investments"
ON investments FOR UPDATE
TO authenticated
USING (profile_id = auth.uid());