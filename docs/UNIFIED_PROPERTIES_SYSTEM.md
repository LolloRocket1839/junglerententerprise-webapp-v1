# Unified Properties System Documentation

## Overview

The Unified Properties System consolidates the previous separate systems (Student Rentals, Tourist Stays, Investment Hubs) into a single, flexible property management architecture using the `unified_properties` table.

## Database Architecture

### Core Table: `unified_properties`

The `unified_properties` table serves as the central repository for all property data, supporting three usage modes:

- `student_rental`: Long-term academic rentals
- `tourist_short`: Short-term vacation rentals  
- `hybrid`: Properties that can serve both markets

#### Key Fields by Usage Mode

**Student Rental Fields:**
- `student_price_monthly`: Monthly rent for students
- `academic_year_start`: Start of academic availability
- `academic_year_end`: End of academic availability
- `deposit_amount`: Required security deposit
- `utilities_included`: Whether utilities are included

**Tourist Short-term Fields:**
- `tourist_price_nightly`: Nightly rate for tourists
- `cleaning_fee`: One-time cleaning charge
- `minimum_stay_nights`: Minimum booking duration

**Investment Fields:**
- `investment_goal`: Total investment target amount
- `amount_raised`: Current amount invested
- `investor_share_percentage`: Investor profit share (default 70%)
- `current_value`: Current property valuation

**Shared Fields:**
- `title`, `description`, `address`, `city`, `country`
- `rooms`, `bathrooms`, `size_sqm`
- `amenities`: JSONB array of features
- `images`: Array of image URLs
- `status`: active, pending, sold, rented

## Related Tables

### `unified_bookings`
Handles both student rentals and tourist bookings:
- `booking_type`: 'student_rental' | 'tourist_short'
- `start_date`, `end_date`: Booking period
- `total_price`: Final booking cost
- `status`: pending, confirmed, cancelled
- Links to `guests` table via `guest_id`

### `property_revenue_tracking`
Tracks financial performance per property per period:
- Revenue breakdown (student, tourist, other)
- Expense tracking (mortgage, taxes, maintenance, etc.)
- Net income calculation
- Investor distribution amounts

### `investments`
Records individual investments in properties:
- Links to `unified_properties` via `property_id`
- Tracks investment amounts and investor information
- Connected to Stripe payment processing

## Frontend Components

### Property Display Components

**UnifiedPropertyGrid** (`src/components/properties/UnifiedPropertyGrid.tsx`)
- Displays properties filtered by usage mode
- Supports search and filtering
- Used across Rent, Stay, and Invest pages

**PropertyCard** (multiple variants)
- `src/components/rent/PropertyCard.tsx`: Student rental view
- `src/components/stay/TouristPropertyCard.tsx`: Tourist booking view
- `src/components/invest/PropertyCard.tsx`: Investment opportunity view

### Page Integration

**Rent Page** (`src/pages/Rent.tsx`)
- Queries properties with `usageMode: 'student_rental'` (includes hybrid)
- Uses `student_price_monthly` for pricing
- Creates bookings with `booking_type: 'student_rental'`

**Stay Page** (`src/pages/Stay.tsx`)
- Queries properties with `usageMode: 'tourist_only'` (includes hybrid)
- Uses `tourist_price_nightly` and `cleaning_fee` for pricing
- Creates bookings with `booking_type: 'tourist_short'`

**Invest Page** (`src/pages/Invest.tsx`)
- Queries properties where `investment_goal > 0`
- Displays investment progress and ROI projections
- Integrates with Stripe for payment processing

## Hooks & Data Fetching

### `useUnifiedProperties`
Primary hook for fetching properties:
```typescript
const { data: properties, isLoading } = useUnifiedProperties({
  usageMode: 'student_rental' | 'tourist_only' | 'investment',
  city?: string,
  minPrice?: number,
  maxPrice?: number
});
```

### `usePropertyRevenue`
Fetches revenue data for a specific property:
```typescript
const { data: revenue } = usePropertyRevenue(propertyId, enabled);
// Returns: RevenueBreakdown with totals and period details
```

### `useCalculateReturns`
Triggers Edge Function to calculate and distribute returns:
```typescript
const { calculateReturns, isCalculating } = useCalculateReturns();
await calculateReturns(revenueData);
```

## Edge Functions

### `calculate-property-returns`
**Purpose:** Calculates monthly property returns and distributes to investors

**Input:** `RevenueData` with revenue/expense breakdown
**Process:**
1. Validates property exists and has investors
2. Calculates net income (revenue - expenses)
3. Splits profit per `investor_share_percentage`
4. Creates `property_revenue_tracking` record
5. Distributes returns to individual investors
6. Records transactions in investor accounts

**Output:** `CalculateReturnsResponse` with detailed breakdown

### `create-checkout`
**Purpose:** Creates Stripe checkout session for property investments

**Input:** Investment amount and `property_id`
**Process:**
1. Creates pending investment record
2. Generates Stripe checkout session
3. Returns checkout URL for redirect

## Admin Dashboard

### Revenue Tracker Component
**Location:** `src/components/admin/RevenueTracker.tsx`

**Features:**
- View revenue by property
- Calculate and distribute monthly returns
- Platform-wide financial statistics
- ROI tracking per property

**Access:** Admin page → Revenue & Returns tab

## Utility Adapters

### `propertyAdapter.ts`
Provides backward-compatible accessors for legacy code:
- `getMonthlyPrice(property)`: Gets student monthly rent
- `getMarketPrice(property)`: Calculates market comparison
- `getDiscountPercentage(property)`: Calculates savings
- `getDepositAmount(property)`: Gets security deposit

## Migration Notes

### From Old System
The previous system used separate tables:
- `student_properties` → Now in `unified_properties` with `usage_mode: 'student_rental'`
- `tourist_properties` → Now in `unified_properties` with `usage_mode: 'tourist_short'`
- `hubs` → Now in `unified_properties` with investment fields populated

### Hybrid Properties
Properties can serve multiple markets by setting `usage_mode: 'hybrid'`:
- Appears in both Rent (student) and Stay (tourist) searches
- Uses `student_price_monthly` for long-term pricing
- Uses `tourist_price_nightly` for short-term pricing
- Booking conflicts are prevented via `unified_bookings` availability checks

## Testing Checklist

- [ ] Student can search and book long-term rentals
- [ ] Tourist can search and book short-term stays
- [ ] Investor can view and invest in properties
- [ ] Hybrid properties appear in both Rent and Stay results
- [ ] Booking conflicts are prevented across booking types
- [ ] Admin can track revenue per property
- [ ] Returns calculation and distribution works correctly
- [ ] Investment progress updates accurately
- [ ] All pricing calculations are correct per usage mode

## Future Enhancements

1. **Automated Revenue Import:** Connect to property management systems
2. **Investor Portal:** Dedicated dashboard for investment tracking
3. **Dynamic Pricing:** Adjust rates based on demand and seasonality
4. **Calendar Integration:** Real-time availability across platforms
5. **Advanced Analytics:** Predictive ROI modeling and market analysis

## Support & Resources

- Database Schema: Check Supabase Table Editor
- Edge Function Logs: Supabase Functions Dashboard
- Revenue Data: Admin → Revenue & Returns tab
- Property Management: Admin → Property Manager tab
