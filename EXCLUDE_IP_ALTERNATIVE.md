# Alternative Method: Exclude Your IP Address

## Your IP Address
**`94.59.182.192`** - Copy this!

## Method 1: Use Data Filters with IP Address Parameter

Since "Internal traffic" option isn't showing, use a custom filter:

1. **Go to Data Filters**
   - Admin (⚙️) → Data Settings → **Data Filters**
   - Click **"Create filter"**

2. **Select Filter Type**
   - Choose **"Developer traffic"** (if Internal traffic isn't available)
   - OR look for **"Custom"** or **"IP address"** option

3. **Configure Filter**
   - **Filter name:** `Exclude My IP`
   - **Filter operation:** Exclude
   - **Parameter name:** `ip_address` (or try `client_ip` or `user_ip`)
   - **Parameter value:** `94.59.182.192`
   - **Match type:** "exactly matches" or "equals"
   - **Filter state:** Testing
   - Click **"Create"**

## Method 2: Use Audience-Based Exclusion

1. **Create an Audience**
   - Admin → Data Display → **Audiences**
   - Click **"New audience"**
   - **Audience name:** `My IP Address`
   - **Condition:** IP address equals `94.59.182.192`
   - Save

2. **Exclude in Reports**
   - When viewing reports, add a filter to exclude this audience

## Method 3: Browser Extension Method (Easiest!)

**Use Google Analytics Opt-Out Extension:**
1. Install "Google Analytics Opt-out Browser Add-on"
2. This will exclude your browser from all Google Analytics tracking
3. Search for: "Google Analytics Opt-out Browser Add-on" in Chrome Web Store

## Method 4: Check Different Location

The Internal traffic option might be in a different place:

1. **Admin** → **Data Settings** → Look for:
   - "Internal traffic" (might be collapsed)
   - "Traffic filtering"
   - "IP exclusion"
   - "Data filters" → Then look for IP address option

2. **Or try:**
   - Admin → **Data Collection** → Scroll down
   - Look for "Define internal traffic" or similar

## Quick Test: Is It Working?

Even without the filter, you can test if your IP is being tracked:

1. Visit your site
2. Check GA → Realtime reports
3. If you see your visit, the filter isn't working yet
4. If you don't see it, it might already be excluded or consent mode is blocking it

## Recommended: Browser Extension

**The easiest solution:**
- Install "Google Analytics Opt-out Browser Add-on"
- It automatically excludes your browser from all GA tracking
- No configuration needed!

---

**Your IP:** `94.59.182.192`

**Try Method 1 first** (Data Filters with IP parameter), or use the browser extension for the easiest solution!

