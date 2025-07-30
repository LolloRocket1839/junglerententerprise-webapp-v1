-- Create storage bucket for marketplace images
INSERT INTO storage.buckets (id, name, public)
VALUES ('marketplace-images', 'marketplace-images', true);

-- Create policies for marketplace images
CREATE POLICY "Anyone can view marketplace images" ON storage.objects
FOR SELECT USING (bucket_id = 'marketplace-images');

CREATE POLICY "Authenticated users can upload marketplace images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'marketplace-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own marketplace images" ON storage.objects
FOR UPDATE USING (bucket_id = 'marketplace-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own marketplace images" ON storage.objects
FOR DELETE USING (bucket_id = 'marketplace-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add looking_for column to marketplace_items if it doesn't exist
ALTER TABLE marketplace_items ADD COLUMN IF NOT EXISTS looking_for TEXT;