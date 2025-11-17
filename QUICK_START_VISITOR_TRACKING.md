# 🚀 Quick Start: Get Visitor Tracking Working in 3 Steps

## Step 1: Create Vercel KV Database (2 minutes)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project
3. Click **"Storage"** tab
4. Click **"Create Database"**
5. Select **"KV"**
6. Name it: `visitor-tracking`
7. Click **"Create"**

## Step 2: Add Environment Variables (1 minute)

1. In your KV database, go to **"Settings"** tab
2. Copy these two values:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`

3. Go to your Vercel project → **Settings** → **Environment Variables**
4. Add both variables:
   - Name: `KV_REST_API_URL` → Value: [paste URL]
   - Name: `KV_REST_API_TOKEN` → Value: [paste token]
5. Make sure to select **Production** environment
6. Click **"Save"**

## Step 3: Redeploy (1 minute)

1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**

## ✅ Done! Test It:

1. Visit your website
2. Go to `/admin` → Enter password → Click **"Visitors"** tab
3. You should see yourself as a visitor!

**That's it!** Your visitor statistics will now show:
- Current Visitors (active now)
- Last 24 Hours
- Last Week  
- Last Month

---

## 🔍 Quick Check:

Open browser console (F12) on your website. You should see:
```
📍 Tracking page view: { page: '/', sessionId: '...' }
✅ Visitor tracking response: { success: true }
```

If you see this, it's working! 🎉

