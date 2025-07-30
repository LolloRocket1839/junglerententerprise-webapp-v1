-- Insert mock data into student_properties table
INSERT INTO student_properties (
  id, title, description, address, city, postal_code,
  market_price_monthly, discounted_price_monthly, discount_percentage,
  size_sqm, rooms, bathrooms, 
  has_kitchen, has_living_room, has_balcony, is_furnished, 
  internet_available, utilities_included,
  images, availability_start, current_status,
  created_at, updated_at
) VALUES 
(
  '550e8400-e29b-41d4-a716-446655440001',
  'Appartamento Corso Duca',
  'Luminoso appartamento a due passi dal Politecnico di Torino. Recentemente ristrutturato, dotato di tutti i comfort per studenti e ottimo anche per soggiorni turistici.',
  'Corso Duca degli Abruzzi 24',
  'Torino',
  '10129',
  840, 840, 0,
  65, 2, 1,
  true, true, true, true,
  true, true,
  ARRAY['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'],
  '2024-09-01'::timestamp,
  'available'::property_status,
  now(), now()
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  'Bilocale Via Sacchi',
  'Elegante bilocale in stile liberty a pochi passi dalla stazione di Porta Nuova e dal Politecnico. Perfetto per studenti o turisti.',
  'Via Sacchi 18',
  'Torino',
  '10128',
  840, 840, 0,
  55, 2, 1,
  true, true, true, true,
  true, true,
  ARRAY['https://images.unsplash.com/photo-1600585154340-be6161a56a0c'],
  '2024-09-01'::timestamp,
  'available'::property_status,
  now(), now()
),
(
  '550e8400-e29b-41d4-a716-446655440003',
  'Studio Via Morgari',
  'Monolocale moderno nel cuore di San Salvario, quartiere universitario per eccellenza. Vicino a tutti i servizi e alla vita notturna.',
  'Via Morgari 14',
  'Torino',
  '10125',
  420, 420, 0,
  35, 1, 1,
  true, false, false, true,
  true, true,
  ARRAY['https://images.unsplash.com/photo-1600607687644-c94bf5588563'],
  '2024-09-15'::timestamp,
  'available'::property_status,
  now(), now()
),
(
  '550e8400-e29b-41d4-a716-446655440004',
  'Trilocale Corso Vittorio',
  'Spazioso appartamento con vista sulla Mole Antonelliana. Posizione strategica tra il Politecnico e il centro città.',
  'Corso Vittorio Emanuele II 68',
  'Torino',
  '10121',
  1260, 1260, 0,
  85, 3, 2,
  true, true, true, true,
  true, false,
  ARRAY['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'],
  '2024-09-01'::timestamp,
  'available'::property_status,
  now(), now()
),
(
  '550e8400-e29b-41d4-a716-446655440005',
  'Attico Via Verdi',
  'Prestigioso attico nel cuore della città, a pochi passi da Palazzo Nuovo. Vista panoramica su tutta la città.',
  'Via Verdi 15',
  'Torino',
  '10124',
  1260, 1260, 0,
  95, 3, 2,
  true, true, true, true,
  true, true,
  ARRAY['https://images.unsplash.com/photo-1600585154340-be6161a56a0c'],
  '2024-09-01'::timestamp,
  'available'::property_status,
  now(), now()
);

-- Create storage bucket for property images if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for property images
CREATE POLICY "Property images are viewable by everyone" ON storage.objects
FOR SELECT USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can upload property images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'property-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update property images" ON storage.objects
FOR UPDATE USING (bucket_id = 'property-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete property images" ON storage.objects
FOR DELETE USING (bucket_id = 'property-images' AND auth.role() = 'authenticated');