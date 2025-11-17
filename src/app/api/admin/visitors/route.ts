// src/app/api/admin/visitors/route.ts

import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

type VisitorPayload = {
  id: string;
  ip?: string | null;
  userAgent?: string | null;
  path?: string | null;
  ts: number;
  country?: string;
  city?: string;
  referrer?: string;
};

export async function GET() {
  try {
    const now = Date.now();
    const cutoff = now - 60_000; // active in last 60s

    // Get active visitors from active:* keys
    const keys = await redis.keys("active:*");
    const activeVisitors: VisitorPayload[] = [];

    for (const key of keys) {
      const data = await redis.get<string>(key);
      if (data) {
        try {
          const visitor = JSON.parse(data) as VisitorPayload;
          // Only include if within last 60 seconds
          if (visitor.ts >= cutoff) {
            activeVisitors.push(visitor);
          }
        } catch {
          // ignore parse errors
        }
      }
    }

    // Get recent visitors from list
    const recentRaw = (await redis.lrange("visitors", 0, 200)) as string[];
    const recentVisitors: VisitorPayload[] = [];

    for (const item of recentRaw ?? []) {
      try {
        recentVisitors.push(JSON.parse(item) as VisitorPayload);
      } catch {
        // ignore
      }
    }

    // Calculate statistics with accurate time-based filtering
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = now - (30 * 24 * 60 * 60 * 1000);

    // Filter recent visitors by time periods
    const last24HoursVisitors = recentVisitors.filter((v) => v.ts >= oneDayAgo).length;
    const lastWeekVisitors = recentVisitors.filter((v) => v.ts >= oneWeekAgo).length;
    const lastMonthVisitors = recentVisitors.filter((v) => v.ts >= oneMonthAgo).length;

    // Today's visitors
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayVisitors = recentVisitors.filter((v) => {
      const date = new Date(v.ts);
      return date >= today;
    }).length;

    // Monthly visitors (current calendar month)
    const monthlyVisitors = recentVisitors.filter((v) => {
      const date = new Date(v.ts);
      const nowDate = new Date();
      return date.getMonth() === nowDate.getMonth() && date.getFullYear() === nowDate.getFullYear();
    }).length;

    // Get unique visitors (by IP or id)
    const uniqueVisitors = new Set(recentVisitors.map((v) => v.ip || v.id)).size;

    // Calculate top countries
    const countryCounts: { [key: string]: number } = {};
    recentVisitors.forEach((v) => {
      if (v.country && v.country !== 'Unknown') {
        countryCounts[v.country] = (countryCounts[v.country] || 0) + 1;
      }
    });
    const topCountries = Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Create countriesRecord for world map (ISO country codes)
    const countriesRecord: Record<string, number> = {};
    recentVisitors.forEach((v) => {
      if (v.country && v.country !== 'Unknown') {
        // Try to convert country name to ISO code (simplified - you might want to use a library)
        const countryCode = v.country.length === 2 ? v.country.toUpperCase() : v.country;
        countriesRecord[countryCode] = (countriesRecord[countryCode] || 0) + 1;
      }
    });

    // Calculate top pages
    const pageCounts: { [key: string]: number } = {};
    recentVisitors.forEach((v) => {
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
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);
      
      const dayVisitors = recentVisitors.filter((v) => {
        const visitDate = new Date(v.ts);
        return visitDate >= dayStart && visitDate <= dayEnd;
      }).length;
      
      dailyStats.push({
        date: dateStr,
        visitors: dayVisitors,
      });
    }
    dailyStats.reverse();

    // Format visitors for dashboard (convert ts to timestamp ISO string)
    const formattedRecent = recentVisitors.map((v) => ({
      id: v.id || `visitor_${v.ts}_${v.ip}`,
      ip: v.ip || undefined,
      userAgent: v.userAgent || undefined,
      referrer: v.referrer || undefined,
      page: v.path || '/',
      country: v.country && v.country !== 'Unknown' ? v.country : undefined,
      city: v.city && v.city !== 'Unknown' ? v.city : undefined,
      timestamp: new Date(v.ts).toISOString(),
      sessionId: `session_${v.ts}`,
    }));

    const formattedActive = activeVisitors.map((v) => ({
      sessionId: `session_${v.ts}`,
      page: v.path || '/',
      country: v.country && v.country !== 'Unknown' ? v.country : undefined,
      city: v.city && v.city !== 'Unknown' ? v.city : undefined,
      lastSeen: new Date(v.ts).toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: {
        visitors: formattedRecent,
        activeSessions: formattedActive,
        countries: topCountries,
        countriesRecord,
        pages: topPages,
        dailyStats,
        stats: {
          totalVisitors: recentVisitors.length,
          uniqueVisitors,
          currentVisitors: activeVisitors.length,
          last24HoursVisitors,
          lastWeekVisitors,
          lastMonthVisitors,
          todayVisitors,
          monthlyVisitors,
          activeNow: activeVisitors.length,
        },
        // Additional fields for compatibility
        comingSoonVisitors: [],
        comingSoonStats: { total: 0, today: 0, thisWeek: 0, thisMonth: 0 },
        sources: [],
        sourceTypes: [],
        campaigns: [],
      },
    });
  } catch (error: any) {
    console.error("admin/visitors error", error);
    // Return empty data instead of error
    return NextResponse.json({
      success: true,
      data: {
        visitors: [],
        activeSessions: [],
        countries: [],
        countriesRecord: {},
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
        comingSoonVisitors: [],
        comingSoonStats: { total: 0, today: 0, thisWeek: 0, thisMonth: 0 },
        sources: [],
        sourceTypes: [],
        campaigns: [],
      },
    });
  }
}
