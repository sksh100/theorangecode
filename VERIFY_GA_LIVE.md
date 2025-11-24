# How to Verify Google Analytics is Working

## Quick Test (2 minutes)

### Step 1: Visit Your Site
1. Open: https://www.theorangecode.com
2. Navigate to different pages:
   - Home page
   - Masterclasses page
   - About page
   - Click some buttons/links

### Step 2: Check Realtime Reports
1. Go to: https://analytics.google.com
2. Select your property: `www.theorangecode.com`
3. Click **Reports** → **Realtime** (in left sidebar)
4. You should see:
   - **Active users right now:** At least 1 (you!)
   - **Top pages:** Pages you just visited
   - **Event count by Event name:** Events like `page_view`, `click`

### Step 3: Test Specific Events
1. Go to your **Masterclasses** page
2. Select a masterclass
3. Select a time slot
4. In Google Analytics Realtime, you should see:
   - `masterclass_select` event
   - `time_slot_select` event

## What You Should See

### In Realtime Reports:
- ✅ Active users: 1+ (you)
- ✅ Top pages: Pages you visited
- ✅ Events: `page_view`, `click`, `scroll`, etc.

### After 24-48 Hours:
- ✅ Full historical data
- ✅ User acquisition reports
- ✅ Engagement reports
- ✅ Conversion reports

## Troubleshooting

**If you don't see data:**

1. **Wait 1-2 minutes** - Data can take a moment to appear
2. **Check browser console:**
   - Press F12 → Console tab
   - Type: `window.dataLayer`
   - Should show an array (means GA is loaded)
3. **Verify environment variable:**
   - In Vercel: Settings → Environment Variables
   - Check `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-BE1VBMP27H`
4. **Check if site is using the variable:**
   - View page source (Ctrl+U or Cmd+U)
   - Search for "G-BE1VBMP27H"
   - Should find it in the page

## Expected Events

Once working, you'll see these events:

- `page_view` - Every page visit
- `click` - All clicks
- `scroll` - Scroll depth (25%, 50%, 75%, 100%)
- `time_on_page` - Time spent
- `masterclass_select` - When users select a masterclass
- `time_slot_select` - When users select a time
- `begin_checkout` - When users click "Secure Your Spot"
- `form_start` / `form_complete` - Form interactions
- `dropdown_open` / `dropdown_item_click` - Dropdown interactions
- `button_click` - Button clicks

---

**Your deployment is complete! Analytics should be working now.** 🎉

