# Vercel Google Analytics Setup - Step by Step

## Quick Setup (5 minutes)

### Step 1: Add Environment Variable in Vercel

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Log in to your account

2. **Select Your Project**
   - Click on your project (likely named `theorangecode` or similar)

3. **Go to Settings**
   - Click on **Settings** tab (top navigation)

4. **Navigate to Environment Variables**
   - In the left sidebar, click **Environment Variables**

5. **Add New Variable**
   - Click **Add New** button
   - Fill in:
     - **Name:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`
     - **Value:** `G-BE1VBMP27H`
     - **Environment:** Check ALL three boxes:
       - ✅ Production
       - ✅ Preview
       - ✅ Development
   - Click **Save**

### Step 2: Redeploy Your Site

1. **Go to Deployments**
   - Click **Deployments** tab (top navigation)

2. **Redeploy Latest**
   - Find your latest deployment
   - Click the **three dots (⋯)** menu
   - Click **Redeploy**
   - Wait 2-3 minutes for deployment to complete

### Step 3: Verify It's Working

1. **Visit Your Live Site**
   - Go to: https://www.theorangecode.com
   - Navigate through a few pages
   - Click some buttons/links

2. **Check Google Analytics**
   - Go to: https://analytics.google.com
   - Select your property
   - Go to **Reports** → **Realtime**
   - You should see your visit appear within 1-2 minutes

## Troubleshooting

**If data still doesn't appear:**
- Wait 24-48 hours (Google Analytics can take time to show data)
- Check browser console for errors (F12 → Console)
- Verify the environment variable is set correctly in Vercel
- Make sure you redeployed after adding the variable

## What to Expect

After setup, you'll see:
- ✅ Page views in Realtime reports
- ✅ All clicks tracked automatically
- ✅ Form submissions tracked
- ✅ Masterclass selections tracked
- ✅ Checkout starts tracked

---

**Need Help?** The code is already set up correctly. The only thing needed is adding the environment variable in Vercel and redeploying.

