-- FASE 1: DATABASE UNIFICATION
-- Create unified property model to serve student, tourist, and investor verticals

-- Step 1: Create ENUMs
CREATE TYPE usage_mode AS ENUM ('student_only', 'tourist_only', 'hybrid');
CREATE TYPE property_source AS ENUM ('dealflow', 'direct', 'migrated_hub', 'migrated_student');
CREATE TYPE booking_type AS ENUM ('student_academic', 'tourist_short');

-- Step 2: Create unified_properties table
CREATE TABLE unified_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Source tracking
  source property_source NOT NULL DEFAULT 'direct',
  dealflow_id UUID,
  legacy_hub_id UUID,
  legacy_student_id UUID,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'active',
  
  -- Basic Info
  title TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  images TEXT[] DEFAULT '{}',
  floor_plan_url TEXT,
  virtual_tour_url TEXT,
  
  -- Physical Characteristics
  size_sqm INTEGER,
  rooms INTEGER NOT NULL,
  bathrooms INTEGER,
  floor_number INTEGER,
  has_kitchen BOOLEAN DEFAULT false,
  has_living_room BOOLEAN DEFAULT false,
  has_balcony BOOLEAN DEFAULT false,
  is_furnished BOOLEAN DEFAULT false,
  appliances TEXT[] DEFAULT '{}',
  
  -- Amenities & Services
  amenities TEXT[] DEFAULT '{}',
  utilities TEXT[] DEFAULT '{}',
  internet_available BOOLEAN DEFAULT false,
  internet_speed INTEGER,
  utilities_included BOOLEAN DEFAULT false,
  estimated_utilities_cost NUMERIC,
  
  -- Financial - Acquisition
  acquisition_cost NUMERIC,
  renovation_cost NUMERIC,
  current_value NUMERIC,
  
  -- Usage Mode & Availability
  usage_mode usage_mode NOT NULL DEFAULT 'hybrid',
  
  -- Student Rental Info
  student_price_monthly NUMERIC,
  deposit_amount NUMERIC,
  academic_year_start DATE,
  academic_year_end DATE,
  
  -- Tourist Rental Info
  tourist_price_nightly NUMERIC,
  cleaning_fee NUMERIC,
  summer_period_start DATE,
  summer_period_end DATE,
  check_in_time TEXT,
  check_out_time TEXT,
  min_stay_nights INTEGER DEFAULT 1,
  
  -- Investment Info
  investment_goal NUMERIC NOT NULL DEFAULT 100000,
  amount_raised NUMERIC NOT NULL DEFAULT 0,
  tokens_issued INTEGER DEFAULT 0,
  investor_share_percentage NUMERIC DEFAULT 70,
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_unified_properties_city ON unified_properties(city);
CREATE INDEX idx_unified_properties_usage_mode ON unified_properties(usage_mode);
CREATE INDEX idx_unified_properties_status ON unified_properties(status);
CREATE INDEX idx_unified_properties_dealflow ON unified_properties(dealflow_id);
CREATE INDEX idx_unified_properties_legacy_hub ON unified_properties(legacy_hub_id);
CREATE INDEX idx_unified_properties_legacy_student ON unified_properties(legacy_student_id);

-- RLS Policies
ALTER TABLE unified_properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active properties"
  ON unified_properties FOR SELECT
  USING (status = 'active');

CREATE POLICY "Admins can manage all properties"
  ON unified_properties FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_unified_properties_updated_at
  BEFORE UPDATE ON unified_properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Step 3: Create property_revenue_tracking table
CREATE TABLE property_revenue_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES unified_properties(id) ON DELETE CASCADE,
  
  -- Period
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  
  -- Revenue Breakdown
  student_revenue NUMERIC DEFAULT 0,
  tourist_revenue NUMERIC DEFAULT 0,
  other_revenue NUMERIC DEFAULT 0,
  total_revenue NUMERIC GENERATED ALWAYS AS (student_revenue + tourist_revenue + other_revenue) STORED,
  
  -- Expenses
  mortgage_payment NUMERIC DEFAULT 0,
  property_tax NUMERIC DEFAULT 0,
  insurance NUMERIC DEFAULT 0,
  utilities NUMERIC DEFAULT 0,
  maintenance NUMERIC DEFAULT 0,
  platform_fees NUMERIC DEFAULT 0,
  management_fees NUMERIC DEFAULT 0,
  total_expenses NUMERIC GENERATED ALWAYS AS (
    mortgage_payment + property_tax + insurance + utilities + 
    maintenance + platform_fees + management_fees
  ) STORED,
  
  -- Net Income
  net_income NUMERIC GENERATED ALWAYS AS (
    student_revenue + tourist_revenue + other_revenue - 
    (mortgage_payment + property_tax + insurance + utilities + 
     maintenance + platform_fees + management_fees)
  ) STORED,
  
  -- Distribution
  investor_distribution NUMERIC,
  jungle_rent_share NUMERIC,
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_revenue_tracking_property ON property_revenue_tracking(property_id);
CREATE INDEX idx_revenue_tracking_period ON property_revenue_tracking(period_start, period_end);

ALTER TABLE property_revenue_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view revenue tracking"
  ON property_revenue_tracking FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage revenue tracking"
  ON property_revenue_tracking FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_revenue_tracking_updated_at
  BEFORE UPDATE ON property_revenue_tracking
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Step 4: Create unified_bookings table
CREATE TABLE unified_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES unified_properties(id) ON DELETE CASCADE,
  guest_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Booking Type
  booking_type booking_type NOT NULL,
  
  -- Dates
  check_in TIMESTAMPTZ NOT NULL,
  check_out TIMESTAMPTZ NOT NULL,
  
  -- Financial
  total_price NUMERIC NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending',
  
  -- Student-specific fields
  university TEXT,
  academic_year TEXT,
  student_id_number TEXT,
  
  -- Tourist-specific fields
  number_of_guests INTEGER,
  special_requests TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_unified_bookings_property ON unified_bookings(property_id);
CREATE INDEX idx_unified_bookings_guest ON unified_bookings(guest_id);
CREATE INDEX idx_unified_bookings_type ON unified_bookings(booking_type);
CREATE INDEX idx_unified_bookings_dates ON unified_bookings(check_in, check_out);

ALTER TABLE unified_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookings"
  ON unified_bookings FOR SELECT
  USING (auth.uid() = guest_id);

CREATE POLICY "Users can create bookings"
  ON unified_bookings FOR INSERT
  WITH CHECK (auth.uid() = guest_id);

CREATE POLICY "Admins can view all bookings"
  ON unified_bookings FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update bookings"
  ON unified_bookings FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_unified_bookings_updated_at
  BEFORE UPDATE ON unified_bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Step 5: Migrate data from hubs to unified_properties
INSERT INTO unified_properties (
  legacy_hub_id,
  source,
  title,
  description,
  address,
  city,
  images,
  amenities,
  tourist_price_nightly,
  investment_goal,
  amount_raised,
  usage_mode,
  status,
  rooms
)
SELECT 
  id as legacy_hub_id,
  'migrated_hub'::property_source as source,
  name as title,
  description,
  location as address,
  COALESCE(SPLIT_PART(location, ',', -1), location) as city,
  images,
  amenities,
  price_per_night as tourist_price_nightly,
  investment_goal,
  amount_raised,
  'tourist_only'::usage_mode as usage_mode,
  'active' as status,
  2 as rooms
FROM hubs;

-- Step 6: Migrate data from student_properties to unified_properties
INSERT INTO unified_properties (
  legacy_student_id,
  source,
  title,
  description,
  address,
  city,
  postal_code,
  latitude,
  longitude,
  images,
  floor_plan_url,
  virtual_tour_url,
  size_sqm,
  rooms,
  bathrooms,
  has_kitchen,
  has_living_room,
  has_balcony,
  is_furnished,
  appliances,
  utilities,
  internet_available,
  internet_speed,
  student_price_monthly,
  deposit_amount,
  utilities_included,
  estimated_utilities_cost,
  academic_year_start,
  academic_year_end,
  usage_mode,
  status
)
SELECT 
  id as legacy_student_id,
  'migrated_student'::property_source as source,
  title,
  description,
  address,
  city,
  postal_code,
  latitude,
  longitude,
  images,
  floor_plan_url,
  virtual_tour_url,
  size_sqm,
  rooms,
  bathrooms,
  has_kitchen,
  has_living_room,
  has_balcony,
  is_furnished,
  appliances,
  utilities,
  internet_available,
  internet_speed,
  discounted_price_monthly as student_price_monthly,
  deposit_amount,
  utilities_included,
  estimated_utilities_cost,
  availability_start::DATE as academic_year_start,
  availability_end::DATE as academic_year_end,
  'student_only'::usage_mode as usage_mode,
  current_status as status
FROM student_properties;

-- Step 7: Add property_id column to investments table
ALTER TABLE investments ADD COLUMN property_id UUID REFERENCES unified_properties(id);

-- Migrate existing hub_id to property_id
UPDATE investments i
SET property_id = up.id
FROM unified_properties up
WHERE i.hub_id = up.legacy_hub_id;

CREATE INDEX idx_investments_property ON investments(property_id);

-- Step 8: Create view for backward compatibility
CREATE VIEW hubs_view AS
SELECT 
  id,
  title as name,
  city as location,
  description,
  tourist_price_nightly as price_per_night,
  amenities,
  images,
  NULL::NUMERIC as rating,
  0 as reviews_count,
  investment_goal,
  amount_raised,
  created_at,
  updated_at
FROM unified_properties
WHERE usage_mode IN ('tourist_only', 'hybrid');