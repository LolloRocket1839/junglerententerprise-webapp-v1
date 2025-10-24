# Unified Properties System - Quick Start Guide

Welcome to the Unified Properties System! This guide will help you get started quickly with the new architecture.

## 🎯 What Changed?

The platform now uses **one unified table** (`unified_properties`) instead of three separate systems:
- ❌ OLD: `hubs`, `student_properties`, `tourist_properties`
- ✅ NEW: `unified_properties` with `usage_mode` field

## 🚀 Quick Start (5 minutes)

### For Developers

**1. Understanding the Data Model**

Every property now has a `usage_mode`:
- `student_rental` - Long-term academic rentals
- `tourist_short` - Short-term vacation stays  
- `hybrid` - Properties serving both markets

**2. Fetching Properties in Code**

```typescript
// Get student rental properties
const { data } = useUnifiedProperties({ 
  usageMode: 'student_rental',
  city: 'Rome' 
});

// Get tourist properties
const { data } = useUnifiedProperties({ 
  usageMode: 'tourist_only', // Includes hybrid
  city: 'Florence' 
});

// Get investment opportunities
const { data } = useUnifiedProperties({ 
  usageMode: 'investment' // Where investment_goal > 0
});
```

**3. Creating a Booking**

```typescript
// Student booking
await supabase.from('unified_bookings').insert({
  property_id: propertyId,
  guest_id: userId,
  booking_type: 'student_rental',
  check_in: startDate,
  check_out: endDate,
  total_price: calculatedTotal
});

// Tourist booking
await supabase.from('unified_bookings').insert({
  property_id: propertyId,
  guest_id: userId,
  booking_type: 'tourist_short',
  check_in: checkIn,
  check_out: checkOut,
  total_price: (nights * nightlyRate) + cleaningFee
});
```

### For Admins

**1. Access Revenue Tracking**
- Go to Admin Dashboard
- Click "Revenue & Returns" tab
- View property performance metrics
- Click "Calculate & Distribute Returns" to process monthly revenue

**2. Managing Properties**
- All properties are in the Property Manager
- Edit usage_mode to change how property is marketed
- Set pricing for different usage modes

**3. Running Migrations**
If you have existing data in old tables:
1. Open Supabase SQL Editor
2. Copy scripts from `docs/DATA_MIGRATION_SCRIPTS.sql`
3. Run Step 2 (Hubs) first, then Steps 3-4 (other properties)
4. Verify with Step 7 (verification queries)

## 📊 Data Migration (If Needed)

**Before Migration:**
```sql
-- Count current records
SELECT COUNT(*) FROM hubs;
SELECT COUNT(*) FROM tourist_properties;
SELECT COUNT(*) FROM tourist_bookings;
```

**Run Migration:**
```sql
-- Copy from docs/DATA_MIGRATION_SCRIPTS.sql
-- Execute steps 2-6 in order
```

**Verify Migration:**
```sql
-- Should match old counts
SELECT COUNT(*) FROM unified_properties;
SELECT COUNT(*) FROM unified_bookings;

-- Check linkage
SELECT COUNT(*) FROM investments WHERE property_id IS NOT NULL;
```

## 🎨 Frontend Usage

### Rent Page (`/rent`)
- Shows properties with `usage_mode IN ('student_rental', 'hybrid')`
- Uses `student_price_monthly` for pricing
- Creates bookings with `booking_type: 'student_rental'`

### Stay Page (`/stay`)
- Shows properties with `usage_mode IN ('tourist_short', 'hybrid')`
- Uses `tourist_price_nightly` and `cleaning_fee`
- Creates bookings with `booking_type: 'tourist_short'`

### Invest Page (`/invest`)
- Shows properties where `investment_goal > 0`
- Displays investment progress and ROI projections
- Links to Stripe for payments

## 🔧 Common Tasks

### Adding a New Property

**Student Rental Only:**
```sql
INSERT INTO unified_properties (
  title, description, address, city, country,
  rooms, bathrooms, size_sqm,
  student_price_monthly, deposit_amount,
  usage_mode, status
) VALUES (
  'Cozy Studio near Sapienza',
  'Perfect for students',
  'Via dei Marsi 45',
  'Rome', 'Italy',
  1, 1, 45,
  650, 1300,
  'student_rental', 'active'
);
```

**Tourist Property:**
```sql
INSERT INTO unified_properties (
  title, description, address, city, country,
  rooms, bathrooms, size_sqm,
  tourist_price_nightly, cleaning_fee, minimum_stay_nights,
  usage_mode, status
) VALUES (
  'Charming Apartment in Trastevere',
  'Beautiful location',
  'Via della Scala 23',
  'Rome', 'Italy',
  2, 1, 60,
  120, 50, 2,
  'tourist_short', 'active'
);
```

**Hybrid Property (Both Markets):**
```sql
INSERT INTO unified_properties (
  title, description, address, city, country,
  rooms, bathrooms, size_sqm,
  student_price_monthly, deposit_amount,
  tourist_price_nightly, cleaning_fee,
  investment_goal, investor_share_percentage,
  usage_mode, status
) VALUES (
  'Modern Loft near Termini',
  'Flexible rental options',
  'Via Cavour 100',
  'Rome', 'Italy',
  3, 2, 85,
  1200, 2400,
  150, 70,
  250000, 70,
  'hybrid', 'active'
);
```

### Checking Property Revenue

```sql
SELECT 
  up.title,
  prt.period_start,
  prt.period_end,
  prt.student_revenue,
  prt.tourist_revenue,
  prt.total_revenue,
  prt.total_expenses,
  prt.net_income,
  prt.investor_distribution
FROM property_revenue_tracking prt
JOIN unified_properties up ON up.id = prt.property_id
WHERE up.title = 'Your Property Name'
ORDER BY prt.period_start DESC;
```

### Finding Available Properties

```typescript
// React component example
const SearchProperties = () => {
  const { data: properties } = useUnifiedProperties({
    usageMode: 'student_rental',
    city: 'Rome',
    minPrice: 500,
    maxPrice: 1000
  });

  return (
    <UnifiedPropertyGrid 
      properties={properties}
      onPropertySelect={handleSelect}
    />
  );
};
```

## 🐛 Troubleshooting

**Problem: Property not showing in search**
- Check `status` is 'active'
- Check `usage_mode` matches your query
- For student rentals, check `student_price_monthly` is set
- For tourist stays, check `tourist_price_nightly` is set

**Problem: Booking fails**
- Verify user is authenticated (`auth.uid()` exists)
- Check for date conflicts in `unified_bookings`
- Ensure `guest_id` matches logged-in user

**Problem: Investment not appearing**
- Check `investment_goal > 0`
- Verify `status = 'active'`
- Check `amount_raised < investment_goal`

**Problem: Revenue calculation fails**
- Check Edge Function logs in Supabase
- Verify property has investment data
- Ensure `investor_share_percentage` is set

## 📚 Next Steps

1. **Read Full Documentation**: Check `UNIFIED_PROPERTIES_SYSTEM.md`
2. **Run Tests**: Follow `TESTING_GUIDE.md`
3. **Migrate Data**: Use `DATA_MIGRATION_SCRIPTS.sql`
4. **Review Migration**: Check `MIGRATION_CHECKLIST.md`

## 🎓 Key Concepts

**Usage Modes:**
- Use `student_rental` for academic year rentals
- Use `tourist_short` for vacation stays
- Use `hybrid` for flexible properties serving both markets

**Booking Types:**
- `student_rental`: Long-term, academic calendar
- `tourist_short`: Short-term, nightly rates

**Investment Properties:**
- Any property can have `investment_goal > 0`
- Typically use `hybrid` usage_mode for maximum revenue
- Admin calculates returns monthly via Edge Function

**Pricing:**
- Student: `student_price_monthly` + `deposit_amount`
- Tourist: `tourist_price_nightly` × nights + `cleaning_fee`
- Both: Different pricing for different markets

## ✅ Success Checklist

- [ ] Understood the three usage modes
- [ ] Know how to query properties by usage mode
- [ ] Can create bookings for both types
- [ ] Understand hybrid property benefits
- [ ] Know how to access admin revenue tracking
- [ ] Can add new properties correctly
- [ ] Familiar with common troubleshooting

## 💡 Pro Tips

1. **Hybrid properties maximize revenue** - Consider converting suitable properties to hybrid mode
2. **Use `useUnifiedProperties` hook** - It handles all filtering logic
3. **Check booking conflicts** - The system prevents double-booking automatically
4. **Monitor revenue regularly** - Admin dashboard provides real-time insights
5. **Test in staging first** - Always test migrations before production

---

**Need Help?** 
- Check the full documentation in `docs/`
- Review Edge Function logs in Supabase Dashboard
- Use the testing guide to verify your setup

**Congratulations!** 🎉 You're now ready to use the Unified Properties System!
