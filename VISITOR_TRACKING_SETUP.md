# 🎯 Visitor Tracking Activation Guide

## ✅ What's Already Set Up

Your visitor tracking system is **already built and integrated**! The `VisitorTracker` component is automatically loaded on every page. You just need to configure the database.

## 🚀 Step-by-Step Activation

### ⚠️ Important: Choose Your Database

Your codebase currently uses **Vercel KV** (which is built on Upstash Redis). You have two options:

**Option A: Use Vercel KV** (Recommended - Easier)
- Already integrated in your code
- Managed by Vercel
- No code changes needed
- Follow steps below

**Option B: Use Upstash Redis Directly**
- More control and features
- Requires code migration
- See "Alternative: Upstash Redis Setup" section below

---

## Option A: Vercel KV Setup (Recommended)

### Step 1: Create Vercel KV Database

1. **Go to your Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project

2. **Create a KV Database**
   - Click on the **"Storage"** tab
   - Click **"Create Database"**
   - Select **"KV"** (Key-Value database)
   - Choose a name (e.g., "visitor-tracking")
   - Select a region (choose closest to your users)
   - Click **"Create"**

### Step 2: Get Your KV Credentials

After creating the KV database:

1. **Click on your KV database** in the Storage tab
2. **Go to the "Settings" tab**
3. You'll see:
   - `KV_REST_API_URL` - Your KV REST API URL
   - `KV_REST_API_TOKEN` - Your KV REST API token

### Step 3: Add Environment Variables to Vercel

1. **In your Vercel project**, go to **Settings** → **Environment Variables**
2. **Add these two variables:**

   ```
   KV_REST_API_URL = [paste your KV REST API URL here]
   KV_REST_API_TOKEN = [paste your KV REST API token here]
   ```

3. **Important:** Make sure to add them for:
   - ✅ Production
   - ✅ Preview
   - ✅ Development (optional, for local testing)

4. **Click "Save"**

### Step 4: Redeploy Your Project

After adding the environment variables:

1. **Go to the "Deployments" tab** in Vercel
2. **Click the "..." menu** on your latest deployment
3. **Click "Redeploy"**
   - OR push a new commit to trigger a new deployment

### Step 5: Test It!

1. **Open your website** in a browser
2. **Open the browser console** (F12 → Console tab)
3. **Look for these messages:**
   ```
   📍 Tracking page view: { page: '/', sessionId: '...' }
   ✅ Visitor tracking response: { success: true, ... }
   ```

4. **Visit your admin dashboard:**
   - Go to `/admin`
   - Enter your admin password
   - Click on the **"Visitors"** tab
   - You should see yourself as an active visitor!

## 🔍 Troubleshooting

### If you see "No active visitors":

1. **Check Environment Variables:**
   - Go to Vercel → Settings → Environment Variables
   - Verify `KV_REST_API_URL` and `KV_REST_API_TOKEN` are set
   - Make sure they're added for **Production** environment

2. **Check Browser Console:**
   - Open your website
   - Press F12 → Console tab
   - Look for error messages
   - You should see: `📍 Tracking page view` and `✅ Visitor tracking response`

3. **Check Network Tab:**
   - Press F12 → Network tab
   - Filter by "track-visitor"
   - You should see a POST request to `/api/track-visitor`
   - Check if it returns `200 OK` with `{ success: true }`

4. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard → Your Project → Functions
   - Click on `api/track-visitor`
   - Check the logs for any errors

### Common Issues:

**Issue:** "KV_REST_API_URL not configured"
- **Solution:** Make sure you added the environment variables in Vercel and redeployed

**Issue:** "No visitors showing up"
- **Solution:** 
  - Wait 30 seconds (auto-refresh interval)
  - Click the refresh button in the admin dashboard
  - Check browser console for tracking logs

**Issue:** "Tracking works but stats are 0"
- **Solution:** This is normal if you just set it up. Visit your site a few times to generate data.

## 📊 What Gets Tracked

Once activated, your system will track:

- ✅ **Current Visitors** - Active in last 5 minutes
- ✅ **Last 24 Hours** - Visitors from past 24 hours
- ✅ **Last Week** - Visitors from past 7 days  
- ✅ **Last Month** - Visitors from past 30 days
- ✅ **Total & Unique Visitors**
- ✅ **Visitor locations** (country, city)
- ✅ **Referrer sources** (Google, Facebook, Instagram, etc.)
- ✅ **UTM parameters** (campaigns, sources, mediums)
- ✅ **Pages visited**
- ✅ **Active sessions** with real-time updates

## 💰 Cost

**Vercel KV Pricing:**
- **Free Tier:** 256 MB storage, 30M reads/month, 30M writes/month
- **Pro Plan:** $0.20/GB storage, $0.001 per 1K reads, $0.001 per 1K writes

For most websites, the **free tier is more than enough** for visitor tracking!

---

## Option B: Upstash Redis Setup (Alternative)

If you prefer to use Upstash Redis directly instead of Vercel KV:

### Step 1: Install Upstash Redis SDK

```bash
npm install @upstash/redis
```

### Step 2: Create Upstash Redis Database

1. Go to [upstash.com](https://upstash.com) and sign up/login
2. Create a new Redis database
3. Choose a region closest to your users
4. Copy your credentials:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### Step 3: Add Environment Variables

In Vercel → Settings → Environment Variables, add:

```
UPSTASH_REDIS_REST_URL = [your Upstash URL]
UPSTASH_REDIS_REST_TOKEN = [your Upstash token]
```

### Step 4: Update Code (Migration Required)

You'll need to update all API routes that use `@vercel/kv` to use `@upstash/redis` instead. The code structure is similar but requires changes.

**Example migration:**

**Before (Vercel KV):**
```typescript
import { kv } from '@vercel/kv'
await kv.set('key', 'value')
```

**After (Upstash Redis):**
```typescript
import { Redis } from '@upstash/redis'
const redis = Redis.fromEnv()
await redis.set('key', 'value')
```

**Note:** If you want to switch to Upstash Redis, I can help migrate all the API routes. Just let me know!

---

## 🎉 You're Done!

Once you've completed these steps, your visitor tracking will be **fully active** and you'll see real-time statistics in your admin dashboard at `/admin` → Visitors tab.

The dashboard auto-refreshes every 30 seconds, so you'll see updates in real-time!

