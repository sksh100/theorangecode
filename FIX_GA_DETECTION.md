# Fix: Google Tag Not Detected

## The Problem
Google Analytics shows: "Your Google tag wasn't detected on www.theorangecode.com"

## Most Likely Cause (99% of cases)
**The environment variable `NEXT_PUBLIC_GA_MEASUREMENT_ID` is not set in Vercel production.**

## Solution Steps

### Step 1: Add Environment Variable in Vercel

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Log in to your account

2. **Select Your Project**
   - Click on your project (theorangecode)

3. **Go to Settings**
   - Click **Settings** tab (top navigation)

4. **Environment Variables**
   - Click **Environment Variables** in left sidebar

5. **Add New Variable**
   - Click **Add New** button
   - **Name:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value:** `G-BE1VBMP27H`
   - **Environments:** Check ALL THREE:
     - ✅ Production
     - ✅ Preview  
     - ✅ Development
   - Click **Save**

### Step 2: Redeploy Your Site

**IMPORTANT:** You MUST redeploy after adding the environment variable!

1. Go to **Deployments** tab
2. Find your latest deployment
3. Click the **three dots (⋯)** menu
4. Click **Redeploy**
5. Wait 2-3 minutes for deployment to complete

### Step 3: Verify It's Working

1. **Visit Your Live Site**
   - Go to: https://www.theorangecode.com
   - Open browser DevTools (F12)
   - Go to **Console** tab
   - Type: `window.dataLayer`
   - Should show an array (means GA is loaded)

2. **Check Page Source**
   - Right-click → View Page Source (or Ctrl+U / Cmd+U)
   - Search for: `G-BE1VBMP27H`
   - Should find it in the HTML

3. **Check Google Analytics**
   - Wait 5-10 minutes after redeploy
   - Go back to Google Analytics
   - Click "Try again" button
   - Should now detect the tag

## Why This Happens

The code is correct, but:
- Environment variables in Next.js need to be set in the deployment platform (Vercel)
- The variable must start with `NEXT_PUBLIC_` to be available in the browser
- After adding the variable, you MUST redeploy for it to take effect

## What I Just Fixed

1. ✅ Moved GoogleAnalytics component to load earlier (top of body)
2. ✅ Added development warning if variable is missing
3. ✅ Component is correctly configured

## Timeline

- **Immediate:** After redeploy, check browser console (should see dataLayer)
- **5-10 minutes:** Google Analytics detection should work
- **24-48 hours:** Full data will appear in reports

## Quick Test

After redeploying, run this in your browser console on your live site:

```javascript
// Should show an array
console.log(window.dataLayer);

// Should show a function
console.log(typeof window.gtag);
```

If both work, the tag is loaded correctly!

---

**Action Required:** Add the environment variable in Vercel and redeploy. That's the fix!

