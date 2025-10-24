# Unified Properties System - Testing Guide

## Overview
This guide provides comprehensive testing procedures for the Unified Properties System migration. Follow these steps to ensure all functionality works correctly after migration.

---

## Pre-Migration Testing

### 1. Database Backup Verification
```sql
-- Verify backups exist
SELECT table_name, pg_size_pretty(pg_total_relation_size(table_name::regclass)) as size
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name LIKE '%_backup'
ORDER BY table_name;
```

**Expected Result:** All backup tables should be listed with their sizes.

### 2. Count Existing Records
```sql
-- Document current record counts
SELECT 'hubs' as table_name, COUNT(*) FROM hubs
UNION ALL SELECT 'tourist_properties', COUNT(*) FROM tourist_properties
UNION ALL SELECT 'tourist_bookings', COUNT(*) FROM tourist_bookings
UNION ALL SELECT 'investments', COUNT(*) FROM investments;
```

**Action:** Document these numbers for post-migration comparison.

---

## Post-Migration Data Verification

### 1. Record Count Validation
```sql
-- Verify all data was migrated
SELECT 
  (SELECT COUNT(*) FROM unified_properties) as unified_properties_count,
  (SELECT COUNT(*) FROM hubs) + 
  (SELECT COUNT(*) FROM tourist_properties) as expected_property_count,
  (SELECT COUNT(*) FROM unified_bookings) as unified_bookings_count,
  (SELECT COUNT(*) FROM tourist_bookings) as expected_booking_count;
```

**Expected Result:** `unified_properties_count` should approximately equal `expected_property_count`. Same for bookings.

### 2. Investment Linkage Verification
```sql
-- Check that all investments are linked to properties
SELECT 
  COUNT(*) as total_investments,
  COUNT(*) FILTER (WHERE property_id IS NOT NULL) as linked_investments,
  COUNT(*) FILTER (WHERE property_id IS NULL AND hub_id IS NOT NULL) as orphaned_investments
FROM investments;
```

**Expected Result:** `orphaned_investments` should be 0.

### 3. Usage Mode Distribution
```sql
-- Verify usage modes are correctly set
SELECT 
  usage_mode,
  COUNT(*) as count,
  ROUND(AVG(investment_goal), 2) as avg_investment_goal,
  ROUND(AVG(tourist_price_nightly), 2) as avg_nightly_price,
  ROUND(AVG(student_price_monthly), 2) as avg_monthly_price
FROM unified_properties
GROUP BY usage_mode;
```

**Expected Result:** 
- `hybrid`: Should have both investment_goal and prices
- `tourist_short`: Should have tourist_price_nightly
- `student_rental`: Should have student_price_monthly

### 4. Booking Date Integrity
```sql
-- Check for invalid booking dates
SELECT COUNT(*) as invalid_bookings
FROM unified_bookings
WHERE check_out <= check_in;
```

**Expected Result:** Should be 0.

---

## Functional Testing Checklist

### Student Rental Flow (/rent)

#### Test Case 1: Property Search
- [ ] Navigate to `/rent`
- [ ] Search for properties in a specific city
- [ ] **Expected:** Properties with `usage_mode IN ('student_rental', 'hybrid')` appear
- [ ] **Verify:** Monthly prices are displayed correctly

#### Test Case 2: Property Details
- [ ] Click on a property card
- [ ] **Expected:** Property detail dialog opens
- [ ] **Verify:** All property information displays correctly
- [ ] **Verify:** Amenities, images, and description are visible

#### Test Case 3: Student Booking
- [ ] Click "Book Now" on a property
- [ ] **Expected:** Auth check - redirects to login if not authenticated
- [ ] Login as a student
- [ ] Select dates within academic year
- [ ] Fill in university information
- [ ] Submit booking
- [ ] **Verify:** Booking created in `unified_bookings` with `booking_type: 'student_rental'`

**SQL Verification:**
```sql
SELECT * FROM unified_bookings 
WHERE guest_id = 'YOUR_USER_ID' 
  AND booking_type = 'student_rental'
ORDER BY created_at DESC LIMIT 1;
```

#### Test Case 4: Booking Conflict Prevention
- [ ] Try to book the same property for overlapping dates
- [ ] **Expected:** Booking should fail or show "unavailable" message

---

### Tourist Booking Flow (/stay)

#### Test Case 5: Tourist Property Search
- [ ] Navigate to `/stay`
- [ ] Search for properties
- [ ] **Expected:** Properties with `usage_mode IN ('tourist_short', 'hybrid')` appear
- [ ] **Verify:** Nightly prices and cleaning fees are displayed

#### Test Case 6: Date Selection
- [ ] Select check-in and check-out dates
- [ ] Select number of guests
- [ ] **Verify:** Total price = (nightly_rate × nights) + cleaning_fee
- [ ] **Verify:** Property capacity warning if guests exceed `rooms`

#### Test Case 7: Tourist Booking
- [ ] Complete guest information form
- [ ] Submit booking
- [ ] **Verify:** Booking created in `unified_bookings` with `booking_type: 'tourist_short'`

**SQL Verification:**
```sql
SELECT 
  ub.*,
  up.title,
  up.tourist_price_nightly,
  up.cleaning_fee,
  (EXTRACT(days FROM (ub.check_out - ub.check_in)) * up.tourist_price_nightly + up.cleaning_fee) as expected_total
FROM unified_bookings ub
JOIN unified_properties up ON up.id = ub.property_id
WHERE ub.booking_type = 'tourist_short'
ORDER BY ub.created_at DESC LIMIT 1;
```

---

### Investment Flow (/invest)

#### Test Case 8: Investment Opportunities
- [ ] Navigate to `/invest`
- [ ] **Expected:** Properties with `investment_goal > 0` are displayed
- [ ] **Verify:** Investment progress bars show `amount_raised / investment_goal`
- [ ] **Verify:** ROI projections are calculated based on `investor_share_percentage`

#### Test Case 9: Investment Process
- [ ] Click on an investment opportunity
- [ ] Enter investment amount
- [ ] **Expected:** Stripe checkout opens
- [ ] **Verify:** Pending investment record created
- [ ] Complete payment (use Stripe test mode)
- [ ] **Verify:** Investment record updated with `payment_status: 'completed'`
- [ ] **Verify:** Property `amount_raised` increases

**SQL Verification:**
```sql
SELECT 
  i.id,
  i.amount,
  i.status,
  i.payment_status,
  up.title,
  up.amount_raised,
  up.investment_goal,
  ROUND((up.amount_raised::numeric / up.investment_goal) * 100, 2) as funding_percentage
FROM investments i
JOIN unified_properties up ON up.id = i.property_id
ORDER BY i.created_at DESC LIMIT 5;
```

---

### Hybrid Property Testing

#### Test Case 10: Hybrid Property Visibility
- [ ] Create a property with `usage_mode: 'hybrid'`
- [ ] Navigate to `/rent`
- [ ] **Expected:** Hybrid property appears in results
- [ ] Navigate to `/stay`
- [ ] **Expected:** Same hybrid property appears here too

#### Test Case 11: Dual Booking Prevention
- [ ] Book hybrid property as student rental (Sept 1 - May 31)
- [ ] Try to book same property as tourist stay (overlapping dates)
- [ ] **Expected:** Booking should fail or show unavailable

**SQL Verification:**
```sql
-- Check for booking conflicts on hybrid properties
SELECT 
  up.title,
  ub1.booking_type as booking_1_type,
  ub1.check_in as booking_1_start,
  ub1.check_out as booking_1_end,
  ub2.booking_type as booking_2_type,
  ub2.check_in as booking_2_start,
  ub2.check_out as booking_2_end
FROM unified_bookings ub1
JOIN unified_bookings ub2 ON ub1.property_id = ub2.property_id 
  AND ub1.id != ub2.id
  AND ub1.check_in < ub2.check_out 
  AND ub1.check_out > ub2.check_in
JOIN unified_properties up ON up.id = ub1.property_id
WHERE up.usage_mode = 'hybrid';
```

**Expected Result:** Should return 0 rows (no conflicts).

---

### Admin Dashboard Testing

#### Test Case 12: Revenue Tracking View
- [ ] Login as admin
- [ ] Navigate to Admin → Revenue & Returns tab
- [ ] **Expected:** List of properties with investment goals
- [ ] **Verify:** Revenue data displays for each property
- [ ] **Verify:** Platform-wide statistics are aggregated correctly

#### Test Case 13: Calculate Returns
- [ ] Select a property
- [ ] Click "Calculate & Distribute Returns"
- [ ] **Expected:** Edge Function executes successfully
- [ ] **Verify:** New record created in `property_revenue_tracking`
- [ ] **Verify:** Investor distributions are calculated

**SQL Verification:**
```sql
-- Check latest revenue calculation
SELECT 
  prt.*,
  up.title,
  up.investor_share_percentage,
  ROUND((prt.net_income * up.investor_share_percentage / 100), 2) as expected_investor_share
FROM property_revenue_tracking prt
JOIN unified_properties up ON up.id = prt.property_id
ORDER BY prt.created_at DESC LIMIT 1;
```

#### Test Case 14: Property Management
- [ ] Navigate to Admin → Property Manager
- [ ] **Expected:** All unified_properties are listed
- [ ] Try to edit a property
- [ ] Update `status`, prices, or descriptions
- [ ] **Verify:** Changes are saved correctly

---

## Performance Testing

### Test Case 15: Query Performance
```sql
-- Test property search performance
EXPLAIN ANALYZE
SELECT * FROM unified_properties
WHERE city = 'Rome'
  AND usage_mode = 'student_rental'
  AND status = 'active'
LIMIT 20;
```

**Expected Result:** Query should use indexes and complete in < 50ms.

### Test Case 16: Booking Availability Check
```sql
-- Test booking conflict check performance
EXPLAIN ANALYZE
SELECT ub.id
FROM unified_bookings ub
WHERE ub.property_id = 'SOME_PROPERTY_ID'
  AND ub.check_in < '2025-09-01'
  AND ub.check_out > '2025-06-01'
  AND ub.status != 'cancelled';
```

**Expected Result:** Should use index on `(property_id, check_in, check_out)`.

---

## Edge Cases Testing

#### Test Case 17: Missing Price Fields
- [ ] Create property with `usage_mode: 'hybrid'` but missing `student_price_monthly`
- [ ] View on `/rent`
- [ ] **Expected:** Graceful handling (shows placeholder or default)

#### Test Case 18: Fully Funded Investment
- [ ] Create property with `amount_raised >= investment_goal`
- [ ] Try to invest
- [ ] **Expected:** Should prevent new investments or show "Fully Funded"

#### Test Case 19: Expired Academic Year
- [ ] Create student property with `academic_year_end` in the past
- [ ] **Expected:** Should not appear in active results or show as "Unavailable"

#### Test Case 20: Negative Prices
```sql
-- Ensure no negative prices exist
SELECT COUNT(*) as invalid_properties
FROM unified_properties
WHERE student_price_monthly < 0 
   OR tourist_price_nightly < 0
   OR cleaning_fee < 0;
```

**Expected Result:** 0

---

## Security Testing

#### Test Case 21: RLS Policy Verification
```sql
-- Test as unauthenticated user
SET ROLE anon;

-- Should be able to view properties
SELECT COUNT(*) FROM unified_properties;

-- Should NOT be able to insert
-- This should fail:
-- INSERT INTO unified_properties (title) VALUES ('Test');

RESET ROLE;
```

#### Test Case 22: Booking Authorization
- [ ] Logout
- [ ] Try to create a booking via API call
- [ ] **Expected:** Request should fail with 401 Unauthorized

#### Test Case 23: Admin-Only Operations
- [ ] Login as non-admin user
- [ ] Try to access Admin dashboard
- [ ] Try to access Revenue Tracker
- [ ] **Expected:** Access denied or redirect

---

## Regression Testing

### Test Case 24: Original Features Still Work
- [ ] Marketplace functionality still works
- [ ] Roommate matching still works
- [ ] User profiles still work
- [ ] Jungle Wallet transactions still work
- [ ] Authentication flows still work

---

## Final Checklist

Before marking migration complete, ensure:

- [ ] All test cases pass
- [ ] No orphaned data in old tables
- [ ] All investments linked to `property_id`
- [ ] No booking conflicts detected
- [ ] Admin can calculate returns successfully
- [ ] All three property usage modes work correctly
- [ ] Performance is acceptable (queries < 100ms)
- [ ] RLS policies prevent unauthorized access
- [ ] Edge cases are handled gracefully
- [ ] Frontend UI displays all data correctly
- [ ] No console errors in browser
- [ ] Mobile responsive design works
- [ ] All translations are correct (if multilingual)

---

## Rollback Procedure

If critical issues are found:

1. **Stop new bookings/investments immediately**
2. **Restore from backup:**
   ```sql
   -- Example rollback
   TRUNCATE unified_properties CASCADE;
   INSERT INTO unified_properties SELECT * FROM unified_properties_backup;
   -- Repeat for other tables
   ```
3. **Revert frontend code** to use old hooks/tables
4. **Investigate issues** in staging environment
5. **Fix problems** and re-test before attempting migration again

---

## Success Criteria

Migration is considered successful when:
✅ All 24 test cases pass
✅ Zero orphaned records
✅ Zero booking conflicts
✅ All users can complete their primary workflows
✅ Performance meets benchmarks
✅ Admin can manage revenue tracking
✅ No critical errors in logs for 24 hours

---

## Support & Troubleshooting

**Common Issues:**

1. **"Property not found"** → Check that migration script linked property_id correctly
2. **Booking fails silently** → Check RLS policies and user authentication
3. **Investment doesn't show progress** → Verify `amount_raised` is being updated
4. **Revenue calculation fails** → Check Edge Function logs in Supabase dashboard
5. **Hybrid property not appearing** → Verify `usage_mode` is set correctly

**Debugging Queries:**
```sql
-- Find properties without required pricing
SELECT id, title, usage_mode,
  CASE 
    WHEN usage_mode IN ('student_rental', 'hybrid') AND student_price_monthly IS NULL 
      THEN 'Missing student price'
    WHEN usage_mode IN ('tourist_short', 'hybrid') AND tourist_price_nightly IS NULL 
      THEN 'Missing tourist price'
    ELSE 'OK'
  END as issue
FROM unified_properties
WHERE 
  (usage_mode IN ('student_rental', 'hybrid') AND student_price_monthly IS NULL)
  OR (usage_mode IN ('tourist_short', 'hybrid') AND tourist_price_nightly IS NULL);
```

---

For additional help, consult:
- `UNIFIED_PROPERTIES_SYSTEM.md` for architecture details
- `MIGRATION_CHECKLIST.md` for migration steps
- Supabase Dashboard → Logs for real-time error tracking
