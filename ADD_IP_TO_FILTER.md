# How to Add Your IP Address to the Filter

## Current Situation
You're seeing a filter that uses `traffic_type` parameter. To exclude your IP, you need to configure the **Internal Traffic Rule** first.

## Step-by-Step: Configure Internal Traffic Rule

### Step 1: Go Back to Internal Traffic Rules
1. **Close this filter creation window** (click X or Cancel)
2. In Google Analytics, go to: **Admin** → **Data Settings** → **Data Collection**
3. Click **"Internal traffic"** (not "Data Filters")

### Step 2: Create Internal Traffic Rule
1. Click **"Create"** or **"Add rule"**
2. **Rule name:** `My IP Address` (or any name)
3. **IP address:** Enter `94.59.182.192` (your IP)
4. **Match type:** Select **"IP address equals"**
5. Click **"Create"** or **"Save"**

### Step 3: Now Create the Data Filter
1. Go back to: **Admin** → **Data Settings** → **Data Filters**
2. Click **"Create filter"**
3. Select **"Internal traffic"**
4. The filter should now recognize your IP from the rule you created
5. **Filter name:** `Exclude My IP`
6. **Filter operation:** Exclude (already selected)
7. **Parameter:** `traffic_type` = `internal` (should be auto-filled)
8. **Filter state:** Testing (selected)
9. Click **"Create"**

## Alternative: Direct IP Filter (If Available)

If you see an option for **"IP address"** in the parameter dropdown:
1. **Parameter name:** Select or type `ip_address`
2. **Parameter value:** Enter `94.59.182.192`
3. **Match type:** Select **"exactly matches"** or **"equals"**

## Quick Summary

**The key is:** You need to create an **Internal Traffic Rule** first (in Data Collection settings), then the filter will use that rule.

**Your IP:** `94.59.182.192`

---

**Try going to Data Collection → Internal Traffic first, then come back to create the filter!**

