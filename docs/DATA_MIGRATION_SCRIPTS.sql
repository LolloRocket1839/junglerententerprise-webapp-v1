-- DATA MIGRATION SCRIPTS FOR UNIFIED PROPERTIES SYSTEM
-- Execute these scripts in order to migrate existing data to unified_properties

-- ==============================================================================
-- STEP 1: Backup existing data (RECOMMENDED)
-- ==============================================================================
-- Create backup tables before migration
-- CREATE TABLE hubs_backup AS SELECT * FROM hubs;
-- CREATE TABLE student_properties_backup AS SELECT * FROM student_properties;
-- CREATE TABLE tourist_properties_backup AS SELECT * FROM tourist_properties;
-- CREATE TABLE tourist_bookings_backup AS SELECT * FROM tourist_bookings;

-- ==============================================================================
-- STEP 2: Migrate Investment Hubs to unified_properties
-- ==============================================================================
-- Migrate hubs as hybrid properties (can serve both student and tourist markets)
INSERT INTO unified_properties (
  title,
  description,
  address,
  city,
  country,
  rooms,
  bathrooms,
  size_sqm,
  amenities,
  images,
  investment_goal,
  amount_raised,
  investor_share_percentage,
  current_value,
  tourist_price_nightly,
  student_price_monthly,
  usage_mode,
  status,
  created_at,
  updated_at
)
SELECT 
  name as title,
  description,
  COALESCE(location, 'Address not specified') as address,
  COALESCE(location, 'City not specified') as city,
  'Italy' as country,
  4 as rooms, -- Default value, adjust as needed
  2 as bathrooms, -- Default value, adjust as needed
  100 as size_sqm, -- Default value, adjust as needed
  amenities,
  images,
  investment_goal,
  amount_raised,
  70 as investor_share_percentage, -- Default 70%
  investment_goal as current_value,
  price_per_night as tourist_price_nightly,
  (price_per_night * 30 * 0.7) as student_price_monthly, -- Estimate: nightly * 30 days * 70% discount
  'hybrid' as usage_mode,
  'active' as status,
  created_at,
  updated_at
FROM hubs
WHERE NOT EXISTS (
  SELECT 1 FROM unified_properties 
  WHERE unified_properties.title = hubs.name
)
ON CONFLICT DO NOTHING;

-- ==============================================================================
-- STEP 3: Migrate Student Properties to unified_properties
-- ==============================================================================
-- Note: If you don't have a student_properties table, skip this step
-- This is a template for if you had separate student properties

/*
INSERT INTO unified_properties (
  title,
  description,
  address,
  city,
  country,
  rooms,
  bathrooms,
  size_sqm,
  amenities,
  images,
  student_price_monthly,
  academic_year_start,
  academic_year_end,
  deposit_amount,
  utilities_included,
  usage_mode,
  status,
  created_at,
  updated_at
)
SELECT 
  title,
  description,
  address,
  city,
  country,
  rooms,
  bathrooms,
  size_sqm,
  amenities,
  images,
  monthly_price as student_price_monthly,
  availability_start as academic_year_start,
  availability_end as academic_year_end,
  deposit_amount,
  utilities_included,
  'student_rental' as usage_mode,
  status,
  created_at,
  updated_at
FROM student_properties
WHERE NOT EXISTS (
  SELECT 1 FROM unified_properties 
  WHERE unified_properties.address = student_properties.address
)
ON CONFLICT DO NOTHING;
*/

-- ==============================================================================
-- STEP 4: Migrate Tourist Properties to unified_properties
-- ==============================================================================
-- Migrate existing tourist_properties if they exist separately

INSERT INTO unified_properties (
  title,
  description,
  address,
  city,
  country,
  rooms,
  bathrooms,
  size_sqm,
  amenities,
  images,
  tourist_price_nightly,
  cleaning_fee,
  minimum_stay_nights,
  usage_mode,
  status,
  created_at,
  updated_at
)
SELECT 
  title,
  description,
  address,
  city,
  'Italy' as country,
  capacity as rooms,
  bathrooms,
  100 as size_sqm, -- Default if not available
  amenities,
  images,
  price_per_night as tourist_price_nightly,
  cleaning_fee,
  2 as minimum_stay_nights, -- Default minimum stay
  'tourist_short' as usage_mode,
  'active' as status,
  created_at,
  updated_at
FROM tourist_properties
WHERE NOT EXISTS (
  SELECT 1 FROM unified_properties 
  WHERE unified_properties.address = tourist_properties.address
)
ON CONFLICT DO NOTHING;

-- ==============================================================================
-- STEP 5: Migrate Tourist Bookings to unified_bookings
-- ==============================================================================
-- Map old tourist_bookings to unified_bookings

INSERT INTO unified_bookings (
  property_id,
  guest_id,
  booking_type,
  check_in,
  check_out,
  total_price,
  number_of_guests,
  special_requests,
  payment_status,
  status,
  created_at,
  updated_at
)
SELECT 
  -- Map old property_id to new unified_property id
  (SELECT up.id FROM unified_properties up 
   WHERE up.title = (SELECT tp.title FROM tourist_properties tp WHERE tp.id = tb.property_id)
   LIMIT 1) as property_id,
  tb.guest_id,
  'tourist_short' as booking_type,
  tb.check_in,
  tb.check_out,
  tb.total_price,
  tb.number_of_guests,
  tb.special_requests,
  tb.payment_status::text,
  tb.status::text,
  tb.created_at,
  tb.updated_at
FROM tourist_bookings tb
WHERE NOT EXISTS (
  SELECT 1 FROM unified_bookings ub
  WHERE ub.guest_id = tb.guest_id 
    AND ub.check_in = tb.check_in
    AND ub.check_out = tb.check_out
)
AND (SELECT up.id FROM unified_properties up 
     WHERE up.title = (SELECT tp.title FROM tourist_properties tp WHERE tp.id = tb.property_id)
     LIMIT 1) IS NOT NULL
ON CONFLICT DO NOTHING;

-- ==============================================================================
-- STEP 6: Update Investment Records to reference unified_properties
-- ==============================================================================
-- Update investments table to link to property_id instead of hub_id

UPDATE investments
SET property_id = (
  SELECT up.id 
  FROM unified_properties up
  INNER JOIN hubs h ON h.name = up.title
  WHERE h.id = investments.hub_id
)
WHERE hub_id IS NOT NULL 
  AND property_id IS NULL;

-- ==============================================================================
-- STEP 7: Verify Migration Results
-- ==============================================================================

-- Count records in each table
SELECT 'unified_properties' as table_name, COUNT(*) as count FROM unified_properties
UNION ALL
SELECT 'unified_bookings', COUNT(*) FROM unified_bookings
UNION ALL
SELECT 'investments with property_id', COUNT(*) FROM investments WHERE property_id IS NOT NULL
UNION ALL
SELECT 'hubs (original)', COUNT(*) FROM hubs
UNION ALL
SELECT 'tourist_properties (original)', COUNT(*) FROM tourist_properties
UNION ALL
SELECT 'tourist_bookings (original)', COUNT(*) FROM tourist_bookings;

-- Check for orphaned investments (without property_id)
SELECT COUNT(*) as orphaned_investments 
FROM investments 
WHERE property_id IS NULL AND hub_id IS NOT NULL;

-- Verify usage_mode distribution
SELECT usage_mode, COUNT(*) as count
FROM unified_properties
GROUP BY usage_mode;

-- ==============================================================================
-- STEP 8: (OPTIONAL) Drop old tables after verification
-- ==============================================================================
-- ONLY execute these after thoroughly testing the migration
-- and ensuring all data is correctly migrated

-- WARNING: This is IRREVERSIBLE. Make sure you have backups!
-- Uncomment only when you're 100% certain

-- DROP TABLE IF EXISTS hubs CASCADE;
-- DROP TABLE IF EXISTS tourist_properties CASCADE;
-- DROP TABLE IF EXISTS tourist_bookings CASCADE;

-- ==============================================================================
-- STEP 9: Create indexes for performance optimization
-- ==============================================================================

-- Index for property searches by city and usage mode
CREATE INDEX IF NOT EXISTS idx_unified_properties_city_usage 
ON unified_properties(city, usage_mode) 
WHERE status = 'active';

-- Index for property searches by investment status
CREATE INDEX IF NOT EXISTS idx_unified_properties_investment 
ON unified_properties(investment_goal, amount_raised) 
WHERE investment_goal > 0;

-- Index for booking lookups by property and dates
CREATE INDEX IF NOT EXISTS idx_unified_bookings_property_dates 
ON unified_bookings(property_id, check_in, check_out);

-- Index for booking lookups by guest
CREATE INDEX IF NOT EXISTS idx_unified_bookings_guest 
ON unified_bookings(guest_id, status);

-- Index for revenue tracking by property and period
CREATE INDEX IF NOT EXISTS idx_revenue_tracking_property_period 
ON property_revenue_tracking(property_id, period_start, period_end);

-- ==============================================================================
-- NOTES:
-- ==============================================================================
-- 1. Always test migrations on a development/staging database first
-- 2. Take backups before running any migration
-- 3. Run STEP 7 verification queries to ensure data integrity
-- 4. Manually verify a sample of migrated records
-- 5. Only drop old tables (STEP 8) after confirming everything works
-- 6. Update application code to use new tables before dropping old ones
-- 7. Consider a phased rollout: keep old tables temporarily in read-only mode
