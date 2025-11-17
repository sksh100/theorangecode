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

    // Active now: count all visitors:active:* keys using SCAN
    let cursor = 0;
    let activeCount = 0;
    do {
      try {
        const [nextCursor, keys] = await redis.scan(cursor, {
          match: "visitors:active:*",
          count: 100,
        } as any);
        cursor = Number(nextCursor);
        activeCount += Array.isArray(keys) ? keys.length : 0;
      } catch (error) {
        console.error('Error scanning active visitors:', error);
        break;
      }
    } while (cursor !== 0);

    // Total visitors
    const total = Number((await redis.get("visitors:total")) || 0);

    // Unique visitors (HyperLogLog)
    const unique = Number((await redis.pfcount("visitors:unique")) || 0);

    // Today visitors (by day key)
    const todayKey = `visitors:by-day:${new Date().toISOString().slice(0, 10)}`;
    const today = Number((await redis.get(todayKey)) || 0);

    // Get recent visitors from log (last 500 is enough for dashboard)
    // Note: track-visitor uses "visitors:log" key
    const recentRaw = (await redis.lrange("visitors:log", 0, 500)) as string[];

    // Parse JSON strings safely
    const recent = (recentRaw || []).map((v: string) => {
      try {
        return typeof v === 'string' ? JSON.parse(v) : v;
      } catch {
        return null;
      }
    }).filter(Boolean);

    // Get active sessions from visitors:active:* keys
    // We'll fetch a sample of active visitor data
    let activeSessionsData: any[] = [];
    try {
      // Get a few active keys to populate active sessions
      const [_, sampleKeys] = await redis.scan(0, {
        match: "visitors:active:*",
        count: 50,
      } as any);
      
      if (Array.isArray(sampleKeys) && sampleKeys.length > 0) {
        // Fetch hash data for sample keys
        const activePromises = sampleKeys.slice(0, 20).map(async (key: string) => {
          try {
            const data = await redis.hgetall(key);
            if (data && typeof data === 'object') {
              return {
                sessionId: key.replace('visitors:active:', ''),
                page: (data as any).path || '/',
                country: undefined, // Not stored in new format
                city: undefined, // Not stored in new format
                lastSeen: new Date(Number((data as any).lastSeen) * 1000).toISOString(),
              };
            }
          } catch (e) {
            // Ignore errors for individual keys
          }
          return null;
        });
        activeSessionsData = (await Promise.all(activePromises)).filter(Boolean);
      }
    } catch (error) {
      console.error('Error fetching active sessions:', error);
    }

    // For backward compatibility, create active array from recent (filtered by timestamp)
    const activeCutoff = now - 60_000; // active in last 60 seconds
    const active = recent.filter((v: any) => {
      if (!v || typeof v.timestamp !== 'number') return false;
      return v.timestamp >= Math.floor(activeCutoff / 1000);
    });

    console.log('👥 Visitors API:', {
      recentCount: recent.length,
      activeCount: activeCount,
      total,
      unique,
      today,
      now,
    });

    // Calculate statistics with accurate time-based filtering
    const oneDayAgo = Math.floor((now - (24 * 60 * 60 * 1000)) / 1000);
    const oneWeekAgo = Math.floor((now - (7 * 24 * 60 * 60 * 1000)) / 1000);
    const oneMonthAgo = Math.floor((now - (30 * 24 * 60 * 60 * 1000)) / 1000);

    // Filter recent visitors by time periods (using timestamp in seconds)
    const last24HoursVisitors = recent.filter((v: any) => v.timestamp >= oneDayAgo).length;
    const lastWeekVisitors = recent.filter((v: any) => v.timestamp >= oneWeekAgo).length;
    const lastMonthVisitors = recent.filter((v: any) => v.timestamp >= oneMonthAgo).length;

    // Today's visitors - use the today count from Redis key
    const todayVisitors = today;

    // This month's visitors - sum up all days in current month
    const firstOfMonth = new Date();
    firstOfMonth.setDate(1);
    firstOfMonth.setHours(0, 0, 0, 0);
    const monthStart = firstOfMonth.toISOString().slice(0, 10);
    const todayDate = new Date().toISOString().slice(0, 10);
    
    let monthlyVisitors = 0;
    try {
      // Get all day keys for current month
      const currentDate = new Date(firstOfMonth);
      const monthKeys: string[] = [];
      while (currentDate.toISOString().slice(0, 10) <= todayDate) {
        monthKeys.push(`visitors:by-day:${currentDate.toISOString().slice(0, 10)}`);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      // Fetch all month day counts
      const monthCounts = await Promise.all(
        monthKeys.map(key => redis.get(key).then(v => Number(v || 0)))
      );
      monthlyVisitors = monthCounts.reduce((sum, count) => sum + count, 0);
    } catch (error) {
      console.error('Error calculating monthly visitors:', error);
      // Fallback to counting from recent list
      const monthCutoff = Math.floor(firstOfMonth.getTime() / 1000);
      monthlyVisitors = recent.filter((v: any) => v.timestamp >= monthCutoff).length;
    }

    // Use unique from HyperLogLog
    const uniqueVisitors = unique;

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

    // Calculate daily stats (last 30 days) from Redis keys
    const dailyStats = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayKey = `visitors:by-day:${dateStr}`;
      
      try {
        const dayVisitors = Number((await redis.get(dayKey)) || 0);
        dailyStats.push({
          date: dateStr,
          visitors: dayVisitors,
        });
      } catch (error) {
        // Fallback to 0 if key doesn't exist
        dailyStats.push({
          date: dateStr,
          visitors: 0,
        });
      }
    }
    dailyStats.reverse();

    // Format visitors for dashboard (convert timestamp to ISO string)
    const formattedRecent = recent.map((v: any) => ({
      id: `visitor_${v.timestamp}_${v.ip}`,
      ip: v.ip,
      userAgent: v.userAgent || '',
      referrer: v.referrer || '',
      page: v.path || '/',
      country: undefined, // Not stored in new format
      city: undefined, // Not stored in new format
      timestamp: new Date(v.timestamp * 1000).toISOString(),
      sessionId: `session_${v.timestamp}`,
    }));

    // Use activeSessionsData if available, otherwise fall back to active array
    const formattedActive = activeSessionsData.length > 0 
      ? activeSessionsData 
      : active.map((v: any) => ({
          sessionId: `session_${v.timestamp}`,
          page: v.path || '/',
          country: undefined,
          city: undefined,
          lastSeen: new Date(v.timestamp * 1000).toISOString(),
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
          totalVisitors: total,
          uniqueVisitors,
          currentVisitors: activeCount,
          last24HoursVisitors,
          lastWeekVisitors,
          lastMonthVisitors,
          todayVisitors: today,
          monthlyVisitors,
          activeNow: activeCount, // Count from visitors:active:* keys
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
