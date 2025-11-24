# Google Analytics Setup Checklist

## ✅ Code Setup (Already Done)
- [x] GoogleAnalytics component created
- [x] Component integrated in root layout
- [x] All tracking events configured
- [x] Measurement ID variable set up in code

## 🔧 Vercel Setup (You Need to Do This)

### Environment Variable
- [ ] Go to Vercel Dashboard
- [ ] Select your project
- [ ] Go to Settings → Environment Variables
- [ ] Add: `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-BE1VBMP27H`
- [ ] Check all environments (Production, Preview, Development)
- [ ] Save

### Deployment
- [ ] Go to Deployments tab
- [ ] Redeploy latest deployment
- [ ] Wait for deployment to complete (2-3 minutes)

## 📊 Google Analytics Configuration

### Basic Settings
- [x] Reporting Identity: Blended (already set)
- [ ] Turn on Google Signals (if not already on)
- [ ] Enhanced Measurement: Enable all events
- [ ] Data Retention: Set to 14 months

### Conversions (Key Events)
- [ ] Mark `begin_checkout` as conversion
- [ ] Mark `form_complete` as conversion
- [ ] Mark `masterclass_select` as conversion

### IP Exclusion
- [ ] Find your IP address
- [ ] Create data filter to exclude your IP
- [ ] Test the filter
- [ ] Activate the filter

## ✅ Verification

### After Deployment
- [ ] Visit your live site
- [ ] Check Google Analytics Realtime reports
- [ ] Verify page views are appearing
- [ ] Test clicking buttons/links
- [ ] Verify events are being tracked

## 📝 Notes

**Measurement ID:** `G-BE1VBMP27H`

**Expected Events:**
- `page_view` - Every page visit
- `click` - All clicks
- `scroll` - Scroll depth
- `time_on_page` - Time spent
- `masterclass_select` - Masterclass selections
- `time_slot_select` - Time slot selections
- `begin_checkout` - Checkout starts
- `form_start` / `form_complete` - Form interactions
- `dropdown_open` / `dropdown_item_click` - Dropdown interactions
- `button_click` - Button clicks

**Timeline:**
- Data should appear within 1-2 minutes in Realtime
- Full reports may take 24-48 hours to populate

---

**Status:** Code is ready! Just need to add environment variable in Vercel and redeploy.

