# Troubleshooting: Google Tag Not Detected

## Issue
Google Analytics is showing: "Your Google tag wasn't detected on www.theorangecode.com"

## Possible Causes & Solutions

### 1. Environment Variable Not Set in Vercel (MOST LIKELY)

**Problem:** The `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable might not be set in Vercel production.

**Solution:**
1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Check if `NEXT_PUBLIC_GA_MEASUREMENT_ID` exists
5. If not, add it:
   - **Name:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value:** `G-BE1VBMP27H`
   - **Environments:** Check all (Production, Preview, Development)
6. **Redeploy** your site after adding the variable

### 2. Component Not Rendering

**Check if the component is actually rendering:**

1. Visit your live site: https://www.theorangecode.com
2. Open browser DevTools (F12)
3. Go to **Console** tab
4. Type: `window.dataLayer`
5. If you see `undefined` or an error, the tag isn't loading

**Or check the page source:**
1. Right-click on your site → View Page Source
2. Search for: `G-BE1VBMP27H`
3. If not found, the environment variable isn't set

### 3. Component Placement Issue

The component should be in the `<body>` tag. Let's verify it's correctly placed.

### 4. Build/Deployment Issue

**Solution:**
1. Make sure you redeployed after adding the environment variable
2. Check Vercel deployment logs for any errors
3. Wait a few minutes after deployment for changes to propagate

## Quick Diagnostic Steps

### Step 1: Verify Environment Variable in Vercel
- [ ] Go to Vercel → Settings → Environment Variables
- [ ] Confirm `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-BE1VBMP27H` exists
- [ ] If missing, add it and redeploy

### Step 2: Test on Live Site
- [ ] Visit: https://www.theorangecode.com
- [ ] Open DevTools (F12) → Console
- [ ] Type: `window.dataLayer` (should show an array)
- [ ] Type: `window.gtag` (should show a function)
- [ ] If both work, the tag is loaded

### Step 3: Check Page Source
- [ ] View page source (Ctrl+U / Cmd+U)
- [ ] Search for: `G-BE1VBMP27H`
- [ ] Should find it in the HTML

### Step 4: Wait and Retry
- [ ] Google Analytics detection can take 24-48 hours
- [ ] Try the "Try again" button in Google Analytics
- [ ] Or wait and check again later

## Most Common Fix

**99% of the time, this is because the environment variable isn't set in Vercel.**

1. Add `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-BE1VBMP27H` to Vercel
2. Redeploy
3. Wait 5-10 minutes
4. Try the detection again in Google Analytics

## Alternative: Manual Verification

If Google Analytics still can't detect it, but you can verify it's working:

1. Visit your site
2. Check Google Analytics → Realtime reports
3. If you see your visit, the tag IS working (just Google's detection tool might be delayed)

---

**Next Step:** Check Vercel environment variables first - that's almost always the issue!

