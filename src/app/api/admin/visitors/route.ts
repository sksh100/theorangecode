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
    const activeCutoff = now - 60_000; // active in last 60 seconds

    // Get recent visitors (last 500 is enough for dashboard)
    // Note: lpush adds to front, so lrange(0, 500) gets the most recent 500
    const recentRaw = (await redis.lrange("visitors:recent", 0, 500)) as string[];
    const total = (await redis.get("visitors:total")) as number | null;

    // Parse JSON strings safely
    const recent = (recentRaw || []).map((v: string) => {
      try {
        return typeof v === 'string' ? JSON.parse(v) : v;
      } catch {
        return null;
      }
    }).filter(Boolean);

    // Calculate active visitors from recent list (visitors in last 60 seconds)
    // Filter and ensure time is a valid number
    const active = recent.filter((v: any) => {
      if (!v || typeof v.time !== 'number') return false;
      return v.time >= activeCutoff;
    });

    console.log('👥 Visitors API:', {
      recentCount: recent.length,
      activeCount: active.length,
      now,
      activeCutoff,
      oldestRecent: recent[recent.length - 1]?.time,
      newestRecent: recent[0]?.time,
      sampleActive: active[0]
    });

    // Calculate statistics with accurate time-based filtering
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = now - (30 * 24 * 60 * 60 * 1000);

    // Filter recent visitors by time periods
    const last24HoursVisitors = recent.filter((v: any) => v.time >= oneDayAgo).length;
    const lastWeekVisitors = recent.filter((v: any) => v.time >= oneWeekAgo).length;
    const lastMonthVisitors = recent.filter((v: any) => v.time >= oneMonthAgo).length;

    // Today's visitors (from midnight)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const todayCutoff = startOfDay.getTime();
    const todayVisitors = recent.filter((v: any) => v.time >= todayCutoff).length;

    // This month's visitors (from first of month)
    const firstOfMonth = new Date();
    firstOfMonth.setDate(1);
    firstOfMonth.setHours(0, 0, 0, 0);
    const monthCutoff = firstOfMonth.getTime();
    const monthlyVisitors = recent.filter((v: any) => v.time >= monthCutoff).length;

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
    
    // Countries as Record for world map component
    const countriesRecord: Record<string, number> = countryCounts;

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
        countriesRecord: countriesRecord, // For world map component
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
          activeNow: active.length, // This is the key fix - active visitors from recent list
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
