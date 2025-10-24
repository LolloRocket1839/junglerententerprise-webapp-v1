# Migration to Unified Properties System - Checklist

## ✅ Completed Components

### Database Layer
- [x] Created `unified_properties` table with all usage modes
- [x] Created `unified_bookings` table for all booking types
- [x] Created `property_revenue_tracking` table
- [x] Updated `investments` table to link to `property_id`
- [x] Set up RLS policies for all tables
- [x] Created Edge Function: `calculate-property-returns`

### Hooks & Utilities
- [x] Created `useUnifiedProperties` hook
- [x] Created `usePropertyRevenue` hook
- [x] Created `useCalculateReturns` hook
- [x] Updated `useBookingAvailability` for unified bookings
- [x] Created `propertyAdapter.ts` for backward compatibility

### Frontend Pages
- [x] Updated **Rent Page** (`src/pages/Rent.tsx`)
  - Uses `useUnifiedProperties` with `usageMode: 'student_rental'`
  - Creates bookings in `unified_bookings` table
  - Uses student-specific pricing fields
  
- [x] Updated **Stay Page** (`src/pages/Stay.tsx`)
  - Uses `useUnifiedProperties` with `usageMode: 'tourist_only'`
  - Creates bookings in `unified_bookings` table
  - Uses tourist-specific pricing fields
  
- [x] Updated **Invest Page** (`src/pages/Invest.tsx`)
  - Queries properties with investment goals
  - Links to unified properties for investment opportunities
  - Integrates with Stripe checkout

### Components
- [x] Updated `UnifiedPropertyGrid` component
- [x] Updated Student `PropertyCard` component
- [x] Updated `TouristPropertyCard` component
- [x] Updated Investment `PropertyCard` component
- [x] Updated `BookingForm` component
- [x] Updated `InvestmentDialog` component
- [x] Updated `InvestmentOpportunityDialog` component
- [x] Created `RevenueTracker` admin component

### Admin Dashboard
- [x] Added Revenue & Returns tab
- [x] Integrated `RevenueTracker` component
- [x] Property-level financial tracking
- [x] Platform-wide statistics
- [x] Calculate & distribute returns functionality

### Edge Functions
- [x] Updated `create-checkout` to use `property_id`
- [x] Created `calculate-property-returns` for revenue distribution

## 🔄 Data Migration Tasks

### If You Have Existing Data:

1. **Migrate Student Properties:**
   ```sql
   INSERT INTO unified_properties (
     title, description, address, city, country,
     rooms, bathrooms, size_sqm, amenities, images,
     student_price_monthly, academic_year_start, academic_year_end,
     deposit_amount, utilities_included,
     usage_mode, status
   )
   SELECT 
     title, description, address, city, country,
     rooms, bathrooms, size_sqm, amenities, images,
     monthly_price, availability_start, availability_end,
     deposit_amount, utilities_included,
     'student_rental', status
   FROM student_properties;
   ```

2. **Migrate Tourist Properties:**
   ```sql
   INSERT INTO unified_properties (
     title, description, address, city, country,
     rooms, bathrooms, size_sqm, amenities, images,
     tourist_price_nightly, cleaning_fee, minimum_stay_nights,
     usage_mode, status
   )
   SELECT 
     title, description, address, city, country,
     capacity as rooms, bathrooms, size_sqm, amenities, images,
     price_per_night, cleaning_fee, minimum_nights,
     'tourist_short', status
   FROM tourist_properties;
   ```

3. **Migrate Investment Hubs:**
   ```sql
   INSERT INTO unified_properties (
     title, description, address, city, country,
     rooms, bathrooms, size_sqm, amenities, images,
     investment_goal, amount_raised, investor_share_percentage,
     current_value, usage_mode, status
   )
   SELECT 
     name as title, description, address, city, country,
     rooms, bathrooms, size_sqm, amenities, images,
     investment_goal, amount_raised, investor_share_percentage,
     current_value, 'hybrid', status
   FROM hubs;
   ```

4. **Migrate Bookings:**
   ```sql
   -- Student bookings
   INSERT INTO unified_bookings (
     property_id, guest_id, start_date, end_date,
     total_price, booking_type, status
   )
   SELECT 
     property_id, student_id as guest_id, start_date, end_date,
     total_cost, 'student_rental', status
   FROM student_bookings;

   -- Tourist bookings
   INSERT INTO unified_bookings (
     property_id, guest_id, start_date, end_date,
     total_price, booking_type, status
   )
   SELECT 
     property_id, guest_id, check_in, check_out,
     total_price, 'tourist_short', status
   FROM tourist_bookings;
   ```

5. **Update Investment Records:**
   ```sql
   UPDATE investments
   SET property_id = (
     SELECT id FROM unified_properties 
     WHERE unified_properties.old_hub_id = investments.hub_id
   )
   WHERE hub_id IS NOT NULL;
   ```

## 🧪 Testing Procedures

### 1. Student Rental Flow
- [ ] Navigate to /rent
- [ ] Search for properties in a specific city
- [ ] Filter by price range and rooms
- [ ] View property details
- [ ] Attempt to book (requires login)
- [ ] Verify booking appears in dashboard
- [ ] Check booking in database: `unified_bookings` with `booking_type: 'student_rental'`

### 2. Tourist Booking Flow
- [ ] Navigate to /stay
- [ ] Search for available properties
- [ ] Select dates and number of guests
- [ ] View pricing breakdown (nightly + cleaning fee)
- [ ] Complete booking (requires login)
- [ ] Verify booking appears in database
- [ ] Check booking conflicts are prevented

### 3. Investment Flow
- [ ] Navigate to /invest
- [ ] View available investment opportunities
- [ ] Check property details and projections
- [ ] Initiate investment (triggers Stripe)
- [ ] Verify investment record created
- [ ] Check `property_id` is correctly stored

### 4. Hybrid Property Behavior
- [ ] Create a property with `usage_mode: 'hybrid'`
- [ ] Verify it appears in /rent search results
- [ ] Verify it appears in /stay search results
- [ ] Book as student rental
- [ ] Confirm tourist booking is blocked for same dates
- [ ] Book different dates as tourist stay
- [ ] Verify both bookings coexist correctly

### 5. Revenue Tracking (Admin)
- [ ] Login as admin
- [ ] Navigate to Admin → Revenue & Returns
- [ ] View property-level revenue data
- [ ] Click "Calculate & Distribute Returns"
- [ ] Verify `property_revenue_tracking` record created
- [ ] Check investor distributions are calculated
- [ ] Verify platform statistics update

### 6. Edge Cases
- [ ] Booking overlapping dates (should fail)
- [ ] Investing in fully-funded property (should fail)
- [ ] Booking without authentication (should redirect to login)
- [ ] Accessing admin features without admin role (should block)
- [ ] Property with missing pricing fields (should show placeholders)

## 🚀 Deployment Steps

1. **Database Changes:**
   - All migrations are already applied
   - Verify RLS policies are active

2. **Edge Functions:**
   - `calculate-property-returns` is deployed
   - `create-checkout` is updated
   - Check logs for any errors

3. **Frontend:**
   - All components are updated
   - No breaking changes to existing functionality

4. **Post-Deployment:**
   - Monitor error logs for 24 hours
   - Check user feedback on bookings
   - Verify investment payments process correctly

## 📋 Rollback Plan

If issues arise:
1. Old tables (`hubs`, `student_properties`, etc.) are still intact
2. Revert frontend components to use old hooks
3. Disable new Edge Functions
4. Investigate issues in staging environment
5. Fix and redeploy

## ✨ Next Steps

1. **User Training:** Document new admin features
2. **Performance:** Monitor query performance on `unified_properties`
3. **Analytics:** Track booking conversion rates per usage mode
4. **Enhancements:** Consider dynamic pricing algorithms
5. **Mobile App:** Update mobile views for unified properties

## 📞 Support

- Check Supabase Dashboard for database issues
- Review Edge Function logs for backend errors
- Use browser console for frontend debugging
- Reference `UNIFIED_PROPERTIES_SYSTEM.md` for architecture details
