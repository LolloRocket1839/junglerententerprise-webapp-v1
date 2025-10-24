# Production Deployment Checklist

## Pre-Deployment Verification

### Database & Backend
- [ ] All migrations executed successfully
- [ ] RLS policies tested and verified
- [ ] Edge Functions deployed and tested
- [ ] Database indexes created for performance
- [ ] Backup strategy in place
- [ ] Database connection pooling configured

### Security
- [ ] All secrets properly configured in Supabase
- [ ] API keys rotated and secured
- [ ] CORS settings configured correctly
- [ ] Rate limiting enabled on Edge Functions
- [ ] Authentication flows tested (login, signup, password reset)
- [ ] RLS policies prevent unauthorized access
- [ ] Input validation on all forms
- [ ] SQL injection prevention verified

### Performance
- [ ] Database queries optimized (use EXPLAIN ANALYZE)
- [ ] Images optimized and properly sized
- [ ] Lazy loading implemented for images
- [ ] Code splitting configured
- [ ] Bundle size analyzed and minimized
- [ ] Caching strategy implemented
- [ ] CDN configured for static assets

### Testing
- [ ] All critical user flows tested
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility checked (Chrome, Firefox, Safari)
- [ ] Error boundaries in place
- [ ] Loading states implemented
- [ ] Error messages user-friendly
- [ ] Analytics/monitoring setup complete

### Data Migration
- [ ] Migration scripts tested in staging
- [ ] All old data successfully migrated
- [ ] Zero orphaned records
- [ ] Data integrity verified
- [ ] Rollback plan documented and tested

### SEO & Metadata
- [ ] Title tags unique and descriptive
- [ ] Meta descriptions compelling (< 160 chars)
- [ ] Open Graph tags configured
- [ ] Sitemap.xml generated
- [ ] robots.txt configured
- [ ] Canonical URLs set
- [ ] 404 page customized
- [ ] SSL certificate active (HTTPS)

## Deployment Steps

### 1. Final Code Review
```bash
# Run linter
npm run lint

# Run type checking
npm run type-check

# Build for production
npm run build

# Test production build locally
npm run preview
```

### 2. Environment Variables
Verify all production environment variables are set:
- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_ANON_KEY`
- [ ] `STRIPE_PUBLISHABLE_KEY` (if using Stripe)
- [ ] Any other API keys

### 3. Database Final Checks
```sql
-- Verify no test data in production
SELECT COUNT(*) FROM unified_properties WHERE title LIKE '%test%';

-- Check for incomplete records
SELECT COUNT(*) FROM unified_properties 
WHERE 
  (usage_mode = 'student_rental' AND student_price_monthly IS NULL)
  OR (usage_mode = 'tourist_short' AND tourist_price_nightly IS NULL);

-- Verify indexes exist
SELECT schemaname, tablename, indexname 
FROM pg_indexes 
WHERE tablename IN ('unified_properties', 'unified_bookings', 'investments')
ORDER BY tablename;
```

### 4. Edge Functions Deployment
```bash
# Deploy all Edge Functions
supabase functions deploy calculate-property-returns
supabase functions deploy create-checkout
supabase functions deploy send-booking-confirmation
supabase functions deploy send-investment-confirmation

# Test each function
curl -X POST <FUNCTION_URL> -H "Authorization: Bearer <ANON_KEY>"
```

### 5. Deploy Application
- [ ] Push code to main branch
- [ ] Trigger deployment pipeline
- [ ] Monitor build logs for errors
- [ ] Verify deployment completes successfully

## Post-Deployment Verification

### Smoke Tests (Critical Paths)

#### Test 1: User Registration & Login
- [ ] Navigate to `/auth`
- [ ] Create new account
- [ ] Verify email confirmation (if enabled)
- [ ] Log in with new account
- [ ] Check profile creation
- [ ] Log out and log back in

#### Test 2: Property Search & View
- [ ] Navigate to `/rent`
- [ ] Search for properties
- [ ] Filter by city and price
- [ ] View property details
- [ ] Check all images load
- [ ] Verify pricing displays correctly

#### Test 3: Booking Flow
- [ ] Select a property
- [ ] Choose dates
- [ ] Fill booking form
- [ ] Submit booking
- [ ] Verify confirmation message
- [ ] Check booking in database

#### Test 4: Investment Flow
- [ ] Navigate to `/invest`
- [ ] View investment opportunity
- [ ] Click invest button
- [ ] Verify Stripe checkout opens
- [ ] Use Stripe test card (if test mode)
- [ ] Complete payment
- [ ] Verify investment recorded

#### Test 5: Admin Dashboard
- [ ] Log in as admin
- [ ] Navigate to Admin page
- [ ] Check Property Manager loads
- [ ] Check Revenue Tracker loads
- [ ] Verify data displays correctly
- [ ] Test "Calculate Returns" function

### Performance Verification
```bash
# Lighthouse audit
npm run lighthouse

# Or manually:
# Open Chrome DevTools
# Navigate to Lighthouse tab
# Run audit for:
# - Performance
# - Accessibility
# - Best Practices
# - SEO
```

**Target Scores:**
- Performance: > 85
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### Monitoring Setup

#### Error Tracking
- [ ] Sentry or similar error tracking configured
- [ ] Error alerts configured (email/Slack)
- [ ] Source maps uploaded for better stack traces

#### Analytics
- [ ] Google Analytics or similar installed
- [ ] Key events tracked:
  - Property views
  - Bookings completed
  - Investments completed
  - User registrations
  - Search queries

#### Uptime Monitoring
- [ ] Uptime robot or similar configured
- [ ] Monitor main pages: /, /rent, /stay, /invest
- [ ] Alert configured for downtime

#### Database Monitoring
- [ ] Supabase dashboard alerts enabled
- [ ] Monitor query performance
- [ ] Set up slow query alerts
- [ ] Monitor database size growth

### Performance Metrics to Monitor

**Week 1 Targets:**
- Page Load Time: < 3 seconds
- Time to Interactive: < 5 seconds
- Error Rate: < 1%
- API Response Time: < 500ms
- Database Query Time: < 100ms

**Usage Metrics:**
- Daily Active Users
- Booking Conversion Rate
- Investment Conversion Rate
- Bounce Rate
- Average Session Duration

## Rollback Plan

If critical issues are discovered:

### Immediate Actions
1. **Communication**
   - [ ] Notify team via Slack/Email
   - [ ] Post maintenance notice on site (if needed)
   - [ ] Inform affected users

2. **Assess Impact**
   - [ ] Identify affected features
   - [ ] Count affected users
   - [ ] Determine severity (Critical/High/Medium/Low)

3. **Quick Fix vs Rollback**
   - **Quick Fix** (< 30 min): Patch and redeploy
   - **Rollback** (> 30 min): Revert to previous version

### Rollback Procedure

#### Frontend Rollback
```bash
# Revert to previous deployment
# (depends on your hosting platform)
# Example for Vercel:
vercel rollback <PREVIOUS_DEPLOYMENT_URL>

# Or Git revert:
git revert HEAD
git push origin main
```

#### Database Rollback
```sql
-- Restore from backup
-- ONLY if database changes caused issues

-- 1. Stop all write operations
-- 2. Restore from backup
-- 3. Verify data integrity
-- 4. Re-enable write operations
```

#### Edge Functions Rollback
```bash
# Revert to previous version
supabase functions deploy <FUNCTION_NAME> --version <PREVIOUS_VERSION>
```

## Post-Deployment Checklist (24 Hours)

### Day 1 Monitoring
- [ ] Check error logs every 2 hours
- [ ] Monitor user feedback channels
- [ ] Review analytics for anomalies
- [ ] Check database performance
- [ ] Verify all cron jobs/scheduled tasks running

### Day 1 Metrics
- [ ] Record baseline metrics:
  - Total users
  - Total bookings
  - Total investments
  - Average page load time
  - Error rate
  - Conversion rates

### Week 1 Review
- [ ] Analyze user behavior changes
- [ ] Identify any performance degradation
- [ ] Review and triage bug reports
- [ ] Plan optimizations based on data
- [ ] Collect user feedback
- [ ] Update documentation based on issues found

## Success Criteria

Deployment is considered successful when:
✅ All smoke tests pass
✅ Error rate < 1%
✅ Performance scores meet targets
✅ No critical bugs reported in first 24 hours
✅ Key user flows work correctly
✅ Monitoring and alerts are active
✅ Team has confidence in system stability

## Support & Escalation

### On-Call Rotation
- Primary: [Name/Contact]
- Secondary: [Name/Contact]
- Escalation: [Name/Contact]

### Critical Issue Response
- **P0 (Critical)**: Site down, data loss
  - Response: Immediate
  - Resolution Target: 1 hour
  
- **P1 (High)**: Key feature broken, security issue
  - Response: Within 1 hour
  - Resolution Target: 4 hours
  
- **P2 (Medium)**: Non-critical feature broken
  - Response: Within 4 hours
  - Resolution Target: 24 hours
  
- **P3 (Low)**: Minor issues, cosmetic bugs
  - Response: Within 24 hours
  - Resolution Target: Next sprint

### Communication Channels
- **User Support**: support@junglerent.com
- **Internal Team**: Slack #engineering
- **Status Page**: status.junglerent.com (if available)

---

**Congratulations on your production deployment!** 🚀

Remember: Monitor closely for the first 48 hours and be ready to respond quickly to any issues.
