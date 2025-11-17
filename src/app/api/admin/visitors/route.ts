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

    // Get active visitors - use zrange with byScore option
    const activeRaw = await redis.zrange("visitors:active", cutoff, now, { byScore: true, rev: true }) as unknown as string[];
    const recentRaw = await redis.lrange("visitors:recent", 0, 200) as unknown as string[];
    const total = await redis.get("visitors:total") as unknown as number | null;

    // Parse JSON strings
    const active = (activeRaw || []).map((v) => JSON.parse(v));
    const recent = (recentRaw || []).map((v) => JSON.parse(v));

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
