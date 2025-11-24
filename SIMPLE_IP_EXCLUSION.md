# Simple Guide: Exclude Your IP Address

## Your IP Address
**`94.59.182.192`** - Copy this!

## Two-Step Process

### Step 1: Create Internal Traffic Rule (IMPORTANT!)

1. **Go to Google Analytics**
   - https://analytics.google.com
   - Select your property

2. **Navigate to Internal Traffic Rules**
   - Click **Admin** (⚙️ bottom left)
   - Under **Property** column → **Data Settings**
   - Click **"Data Collection"**
   - Click **"Internal traffic"**

3. **Create New Rule**
   - Click **"Create"** or **"Add rule"**
   - **Rule name:** `My IP`
   - **IP address:** `94.59.182.192` (paste your IP)
   - **Match type:** `IP address equals`
   - Click **"Create"**

### Step 2: Create Data Filter

1. **Go to Data Filters**
   - **Admin** → **Data Settings** → **Data Filters**

2. **Create Filter**
   - Click **"Create filter"**
   - Select **"Internal traffic"**
   - **Filter name:** `Exclude My IP`
   - **Filter operation:** Exclude (should be selected)
   - **Parameter:** Should auto-fill with `traffic_type` = `internal`
   - **Filter state:** Testing (selected)
   - Click **"Create"**

## Why Two Steps?

Google Analytics requires you to:
1. **First** define what counts as "internal traffic" (the rule)
2. **Then** create a filter to exclude that traffic

## Test It

1. Visit your site: https://www.theorangecode.com
2. Go to GA → **Reports** → **Realtime**
3. Your visit should NOT appear
4. If it works, activate the filter!

---

**Your IP:** `94.59.182.192`

**Remember:** Create the Internal Traffic Rule FIRST, then create the filter!

