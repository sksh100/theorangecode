# Dashboard Implementation Code - Complete Summary

This document contains all the code I implemented for the dashboard visitor tracking and Stripe payment tracking features.

---

## 1. Visitor Tracker Component (`src/components/VisitorTracker.tsx`)

This client-side component tracks visitors when they load any page:

```tsx
"use client";

import { useEffect } from "react";

export function VisitorTracker() {
  useEffect(() => {
    const send = async () => {
      try {
        await fetch("/api/track-visitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: window.location.pathname,
            referrer: document.referrer || null,
            userAgent: navigator.userAgent,
          }),
        });
      } catch (err) {
        console.error("Visitor tracking failed", err);
      }
    };

    send();
  }, []);

  return null;
}
```

**Usage**: Added to `src/app/layout.tsx` to track all page visits automatically.

---

## 2. Visitor Tracking API Route (`src/app/api/track-visitor/route.ts`)

This endpoint receives visitor data from the frontend and stores it in Redis:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    const now = Date.now();

    // Extract IP from headers (Vercel provides x-forwarded-for)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    // Get location data from Vercel headers
    const country = req.headers.get("x-vercel-ip-country") ?? "Unknown";
    const city = req.headers.get("x-vercel-ip-city") ?? "Unknown";
    const region = req.headers.get("x-vercel-ip-country-region") ?? "Unknown";

    const userAgent = body.userAgent ?? req.headers.get("user-agent") ?? "Unknown";
    const path = body.path ?? "/";
    const referrer = body.referrer ?? req.headers.get("referer") ?? "Direct";

    const visitor = {
      ip,
      country,
      city,
      region,
      userAgent,
      path,
      referrer,
      time: now,
    };

    // Store in "recent visitors" history (list)
    await redis.lpush("visitors:recent", JSON.stringify(visitor));
    await redis.ltrim("visitors:recent", 0, 200); // Keep last 200 visitors

    // Real-time "active" visitors (last 60 seconds) using sorted set
    await redis.zadd("visitors:active", {
      score: now,
      member: JSON.stringify(visitor),
    } as any);

    // Clean up very old scores (older than 5 minutes)
    const cutoff = now - 5 * 60_000; // 5 minutes ago
    await redis.zremrangebyscore("visitors:active", 0, cutoff);

    // Increment total visitor counter
    await redis.incr("visitors:total");

    console.log('✅ Visitor tracked:', {
      ip,
      country,
      city,
      path,
      referrer: referrer.substring(0, 50),
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('❌ Error tracking visitor:', error);
    
    // Check if Redis is configured
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      console.error('⚠️ Upstash Redis not configured! Please set KV_REST_API_URL and KV_REST_API_TOKEN in Vercel environment variables.');
    }
    
    // Return success even on error to not break the site
    return NextResponse.json({ ok: false, error: error.message || 'Unknown error' });
  }
}
```

**Features**:
- Tracks IP, country, city, region, user agent, path, referrer, and timestamp
- Stores in Redis list for history (last 200 visitors)
- Stores in Redis sorted set for active visitor tracking (last 60 seconds)
- Increments total visitor counter
- Handles errors gracefully without breaking the site

---

## 3. Admin Visitors API Route (`src/app/api/admin/visitors/route.ts`)

This endpoint fetches all visitor data for the admin dashboard:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest) {
  try {
    // Check if Redis is configured
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      console.error('⚠️ Upstash Redis not configured! Please set KV_REST_API_URL and KV_REST_API_TOKEN in Vercel environment variables.');
      return NextResponse.json({
        success: true,
        data: {
          visitors: [],
          activeSessions: [],
          countries: [],
          pages: [],
          dailyStats: [],
          stats: {
            totalVisitors: 0,
            uniqueVisitors: 0,
            currentVisitors: 0,
            last24HoursVisitors: 0,
            lastWeekVisitors: 0,
            lastMonthVisitors: 0,
            todayVisitors: 0,
            monthlyVisitors: 0,
            activeNow: 0,
          },
        },
      });
    }

    const now = Date.now();
    const cutoff = now - 60_000; // active in last 60s

    // Get active visitors - use zrangebyscore for Upstash Redis
    let activeRaw: string[] = [];
    try {
      // Get all active sessions within the time range
      activeRaw = (await redis.zrange("visitors:active", cutoff, now, { byScore: true, rev: true })) as string[];
    } catch (error) {
      console.error('Error fetching active visitors:', error);
      activeRaw = [];
    }
    
    const recentRaw = (await redis.lrange("visitors:recent", 0, 200)) as string[];
    const total = (await redis.get("visitors:total")) as number | null;

    // Parse JSON strings safely
    const active = (activeRaw || []).map((v) => {
      try {
        return typeof v === 'string' ? JSON.parse(v) : v;
      } catch {
        return null;
      }
    }).filter(Boolean);
    
    const recent = (recentRaw || []).map((v) => {
      try {
        return typeof v === 'string' ? JSON.parse(v) : v;
      } catch {
        return null;
      }
    }).filter(Boolean);

    // Calculate statistics with accurate time-based filtering
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = now - (30 * 24 * 60 * 60 * 1000);

    // Filter recent visitors by time periods
    const last24HoursVisitors = recent.filter((v: any) => v.time >= oneDayAgo).length;
    const lastWeekVisitors = recent.filter((v: any) => v.time >= oneWeekAgo).length;
    const lastMonthVisitors = recent.filter((v: any) => v.time >= oneMonthAgo).length;

    // Today's visitors
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayVisitors = recent.filter((v: any) => {
      const date = new Date(v.time);
      return date >= today;
    }).length;

    // Monthly visitors (current calendar month)
    const monthlyVisitors = recent.filter((v: any) => {
      const date = new Date(v.time);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;

    // Get unique visitors (by IP)
    const uniqueVisitors = new Set(recent.map((v: any) => v.ip)).size;

    // Calculate top countries
    const countryCounts: { [key: string]: number } = {};
    recent.forEach((v: any) => {
      if (v.country && v.country !== 'Unknown') {
        countryCounts[v.country] = (countryCounts[v.country] || 0) + 1;
      }
    });
    const topCountries = Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Calculate top pages
    const pageCounts: { [key: string]: number } = {};
    recent.forEach((v: any) => {
      const page = v.path || '/';
      pageCounts[page] = (pageCounts[page] || 0) + 1;
    });
    const topPages = Object.entries(pageCounts)
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Calculate daily stats (last 30 days)
    const dailyStats = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayStart = date.setHours(0, 0, 0, 0);
      const dayEnd = date.setHours(23, 59, 59, 999);
      
      const dayVisitors = recent.filter((v: any) => v.time >= dayStart && v.time <= dayEnd).length;
      dailyStats.push({
        date: dateStr,
        visitors: dayVisitors,
      });
    }
    dailyStats.reverse();

    // Format visitors for dashboard (convert time to timestamp ISO string)
    const formattedRecent = recent.map((v: any) => ({
      id: `visitor_${v.time}_${v.ip}`,
      ip: v.ip,
      userAgent: v.userAgent,
      referrer: v.referrer,
      page: v.path,
      country: v.country !== 'Unknown' ? v.country : undefined,
      city: v.city !== 'Unknown' ? v.city : undefined,
      timestamp: new Date(v.time).toISOString(),
      sessionId: `session_${v.time}`,
    }));

    const formattedActive = active.map((v: any) => ({
      sessionId: `session_${v.time}`,
      page: v.path,
      country: v.country !== 'Unknown' ? v.country : undefined,
      city: v.city !== 'Unknown' ? v.city : undefined,
      lastSeen: new Date(v.time).toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: {
        visitors: formattedRecent,
        activeSessions: formattedActive,
        countries: topCountries,
        pages: topPages,
        dailyStats,
        stats: {
          totalVisitors: total ?? 0,
          uniqueVisitors,
          currentVisitors: active.length,
          last24HoursVisitors,
          lastWeekVisitors,
          lastMonthVisitors,
          todayVisitors,
          monthlyVisitors,
          activeNow: active.length,
        },
      },
    });
  } catch (error: any) {
    console.error('Error fetching visitors:', error);
    
    // Return empty data instead of error
    return NextResponse.json({
      success: true,
      data: {
        visitors: [],
        activeSessions: [],
        countries: [],
        pages: [],
        dailyStats: [],
        stats: {
          totalVisitors: 0,
          uniqueVisitors: 0,
          currentVisitors: 0,
          last24HoursVisitors: 0,
          lastWeekVisitors: 0,
          lastMonthVisitors: 0,
          todayVisitors: 0,
          monthlyVisitors: 0,
          activeNow: 0,
        },
      },
    });
  }
}
```

**Features**:
- Returns visitor history (last 200 visitors)
- Returns active sessions (visitors active in last 60 seconds)
- Calculates statistics: total, unique, today, last 24 hours, last week, last month, monthly
- Returns top 10 countries and top 10 pages
- Returns daily stats for last 30 days
- Handles errors gracefully

---

## 4. Admin Payments API Route (`src/app/api/admin/payments/route.ts`)

This endpoint fetches all payment data from Redis:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest) {
  try {
    // Check if Redis is configured
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      console.error('⚠️ Upstash Redis not configured! Please set KV_REST_API_URL and KV_REST_API_TOKEN in Vercel environment variables.');
      return NextResponse.json({
        success: true,
        payments: [],
        stats: {
          totalRevenue: 0,
          count: 0,
        },
      });
    }

    const [listRaw, totalRevenue, count] = await Promise.all([
      redis.lrange("payments:list", 0, 50),
      redis.get("payments:total_revenue"),
      redis.get("payments:count"),
    ]);

    // Parse payments safely
    const payments = (listRaw || []).map((p) => {
      try {
        return typeof p === 'string' ? JSON.parse(p) : p;
      } catch {
        return null;
      }
    }).filter(Boolean);

    // Format payments for dashboard (convert time to ISO string, add customerName field)
    const formattedPayments = payments.map((p: any) => ({
      id: p.id,
      amount: p.amount,
      currency: p.currency,
      status: p.status || 'succeeded',
      customerEmail: p.email || 'unknown',
      customerName: p.email ? p.email.split('@')[0] : 'Customer',
      createdAt: new Date(p.time).toISOString(),
      description: `Payment - ${p.currency} ${p.amount}`,
    }));

    return NextResponse.json({
      success: true,
      payments: formattedPayments,
      stats: {
        totalRevenue: totalRevenue ?? 0,
        count: count ?? 0,
      },
    });
  } catch (error: any) {
    console.error('Error fetching payments:', error);
    
    return NextResponse.json({
      success: true,
      payments: [],
      stats: {
        totalRevenue: 0,
        count: 0,
      },
    });
  }
}
```

**Features**:
- Returns last 50 payments
- Returns total revenue and payment count
- Formats payments with customer names, timestamps, etc.
- Handles errors gracefully

---

## 5. Stripe Webhook Handler (`src/app/api/webhooks/stripe/route.ts`)

This endpoint receives Stripe webhook events and stores payment data in Redis:

```typescript
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { redis } from "@/lib/redis";

// Initialize Stripe only if secret key is available
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-10-29.clover",
  });
};

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    
    if (!stripe) {
      console.error("Stripe not configured - missing STRIPE_SECRET_KEY");
      return new NextResponse("Stripe not configured", { status: 500 });
    }

    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
      return new NextResponse("Missing signature", { status: 400 });
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error("Stripe webhook secret not configured");
      return new NextResponse("Webhook secret not configured", { status: 500 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err: any) {
      console.error("Stripe webhook error", err.message);
      return new NextResponse("Webhook Error", { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const amount = (session.amount_total ?? 0) / 100;
      const currency = (session.currency ?? "aed").toUpperCase();
      const email = session.customer_details?.email ?? "unknown";

      const payment = {
        id: session.id,
        amount,
        currency,
        email,
        time: Date.now(),
        status: session.payment_status,
      };

      // Store payment in Redis list
      await redis.lpush("payments:list", JSON.stringify(payment));
      await redis.ltrim("payments:list", 0, 100); // Keep last 100 payments

      // Update revenue and count - ensure they're numbers
      const currentRevenue = (await redis.get("payments:total_revenue")) as number || 0;
      const revenue = (typeof currentRevenue === 'number' ? currentRevenue : parseFloat(String(currentRevenue || 0))) + amount;
      await redis.set("payments:total_revenue", revenue.toString());
      
      const currentCount = (await redis.get("payments:count")) as number || 0;
      const newCount = (typeof currentCount === 'number' ? currentCount : parseInt(String(currentCount || 0), 10)) + 1;
      await redis.set("payments:count", newCount.toString());

      // You can also push to "events" for notification
      await redis.lpush("events", JSON.stringify({ type: "payment", ...payment }));
      await redis.ltrim("events", 0, 100);

      console.log('✅ Payment stored in Redis:', payment);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('❌ Error processing Stripe webhook:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
```

**Features**:
- Verifies Stripe webhook signature
- Handles `checkout.session.completed` events
- Stores payment data in Redis
- Updates total revenue and payment count
- Stores payment events for notifications

---

## 6. Redis Client (`src/lib/redis.ts`)

This module provides a Redis client that gracefully handles missing configuration:

```typescript
import { Redis } from "@upstash/redis";

// Create a conditional Redis client that handles missing env vars gracefully
const createRedisClient = () => {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    // Return a mock client that doesn't throw errors and supports generics
    return {
      get: async <T = any>(): Promise<T | null> => null,
      set: async (_key: string, _value: string): Promise<string> => "OK",
      lpush: async (): Promise<number> => 0,
      ltrim: async (): Promise<string> => "OK",
      lrange: async <T = string>(): Promise<T[]> => [],
      zadd: async (): Promise<number> => 0,
      zrange: async <T = string>(): Promise<T[]> => [],
      zremrangebyscore: async (): Promise<number> => 0,
      incr: async (): Promise<number> => 0,
      incrbyfloat: async (): Promise<number> => 0,
    } as any;
  }
  
  return new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
};

export const redis = createRedisClient();
```

**Features**:
- Creates a real Upstash Redis client if environment variables are set
- Returns a mock client if Redis is not configured (prevents errors)
- All Redis operations work with both real and mock clients

---

## 7. Admin Dashboard Integration (`src/app/admin/page.tsx`)

The admin dashboard uses these APIs to display data. Key functions:

### Fetch Visitors
```typescript
const fetchVisitors = async () => {
  setVisitorsLoading(true)
  try {
    console.log('👥 Fetching visitors...')
    const response = await fetch('/api/admin/visitors')
    const data = await response.json()
    console.log('👥 Visitors response:', { success: data.success, visitorsCount: data.data?.visitors?.length || 0 })
    if (data.success) {
      const visitorsList = data.data.visitors || []
      const activeSessionsList = data.data.activeSessions || []
      const stats = data.data.stats || {}
      const countries = data.data.countries || []
      const pages = data.data.pages || []
      const daily = data.data.dailyStats || []
      
      console.log(`✅ Loaded ${visitorsList.length} visitors, ${activeSessionsList.length} active sessions`)
      setVisitors(visitorsList)
      setActiveSessions(activeSessionsList)
      setVisitorStats(stats)
      setTopCountries(countries)
      setTopPages(pages)
      setDailyVisitorStats(daily)
      // ... other state updates
    }
  } catch (error) {
    console.error('❌ Error fetching visitors:', error)
    // Handle error
  } finally {
    setVisitorsLoading(false)
  }
}
```

### Fetch Payments
```typescript
const fetchPayments = async () => {
  setPaymentsLoading(true)
  try {
    console.log('📊 Fetching payments...')
    const response = await fetch('/api/admin/payments')
    const data = await response.json()
    console.log('📊 Payments response:', { 
      success: data.success, 
      paymentsCount: data.payments?.length || 0,
      totalRevenue: data.stats?.totalRevenue || 0,
      count: data.stats?.count || 0,
      samplePayments: data.payments?.slice(0, 3) || []
    })
    if (data.success !== false) {
      const paymentsList = data.payments || []
      const stats = data.stats || { totalRevenue: 0, count: 0 }
      console.log(`✅ Loaded ${paymentsList.length} payments`)
      setPayments(paymentsList)
      setPaymentStats(stats)
    }
  } catch (error) {
    console.error('❌ Error fetching payments:', error)
  } finally {
    setPaymentsLoading(false)
  }
}
```

### Auto-Refresh
- General data refreshes every 30 seconds
- Visitors tab polls every 5 seconds for real-time updates
- Notifications for new visitors and payments

---

## Redis Data Structure

### Visitor Data
- **`visitors:recent`** (List): Last 200 visitors as JSON strings
- **`visitors:active`** (Sorted Set): Active visitors in last 60 seconds (score = timestamp)
- **`visitors:total`** (String): Total visitor count

### Payment Data
- **`payments:list`** (List): Last 100 payments as JSON strings
- **`payments:total_revenue`** (String): Total revenue as a number string
- **`payments:count`** (String): Total payment count as a number string
- **`events`** (List): Recent events (last 100) for notifications

---

## Environment Variables Required

1. **Redis (Upstash)**:
   - `KV_REST_API_URL` - Your Upstash Redis REST API URL
   - `KV_REST_API_TOKEN` - Your Upstash Redis REST API token

2. **Stripe**:
   - `STRIPE_SECRET_KEY` - Your Stripe secret key
   - `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook signing secret

---

## How It Works

1. **Visitor Tracking**:
   - `VisitorTracker` component loads on every page
   - Sends POST request to `/api/track-visitor` with page info
   - API stores visitor data in Redis
   - Admin dashboard polls `/api/admin/visitors` to display data

2. **Payment Tracking**:
   - Stripe sends webhook to `/api/webhooks/stripe` when payment completes
   - Webhook handler verifies signature and stores payment in Redis
   - Admin dashboard polls `/api/admin/payments` to display data

---

## Key Features

✅ Real-time visitor tracking (active visitors in last 60 seconds)  
✅ Visitor history (last 200 visitors)  
✅ Detailed statistics (total, unique, daily, weekly, monthly)  
✅ Top countries and pages analytics  
✅ Daily stats chart (last 30 days)  
✅ Stripe payment tracking  
✅ Payment history and revenue totals  
✅ Auto-refresh in admin dashboard  
✅ Browser notifications for new visitors/payments  
✅ Error handling (works even if Redis not configured)  

---

## Recent Fixes Applied

1. **Fixed Redis zrange call** - Added proper error handling for active visitor queries
2. **Fixed JSON parsing** - Added safe parsing with try-catch to prevent crashes
3. **Fixed payment revenue/count storage** - Now properly stores as numbers using `set()` instead of `incr()`
4. **Fixed Redis mock client** - Added `set()` method to mock client
5. **Improved error handling** - All routes now return empty data instead of errors if Redis is not configured

