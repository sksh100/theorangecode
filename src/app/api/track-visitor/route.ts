// src/app/api/track-visitor/route.ts

import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { notifyNewVisitor } from "@/lib/slack";

export const dynamic = 'force-dynamic'

type VisitorPayload = {
  id: string;        // some unique id from client
  ip?: string | null;
  userAgent?: string | null;
  path?: string | null;
  referrer?: string | null;
  country?: string | null;
  city?: string | null;
  area?: string | null;  // Area/neighborhood (e.g., Al Bateen, Al Khalidiyah)
  postalCode?: string | null;  // Postal code if available
  lat?: number | null;
  lng?: number | null;
  ts: number;
  source?: string | null;  // Traffic source (Google, Direct, Social, etc.)
  navigationFlow?: string[];  // Array of pages visited in this session
  sessionDuration?: number;  // Session duration in seconds
  visitCount?: number;  // Number of times this visitor has visited
};

// Helper function to detect device type from user agent
function detectDevice(userAgent: string | null): string {
  if (!userAgent) return "Unknown";
  
  const ua = userAgent.toLowerCase();
  if (ua.includes("mobile") || ua.includes("android") || ua.includes("iphone")) {
    return "Mobile";
  }
  if (ua.includes("tablet") || ua.includes("ipad")) {
    return "Tablet";
  }
  return "Desktop";
}

// Helper function to detect browser from user agent
function detectBrowser(userAgent: string | null): string {
  if (!userAgent) return "Unknown";
  
  const ua = userAgent.toLowerCase();
  if (ua.includes("chrome") && !ua.includes("edg")) return "Chrome";
  if (ua.includes("safari") && !ua.includes("chrome")) return "Safari";
  if (ua.includes("firefox")) return "Firefox";
  if (ua.includes("edg")) return "Edge";
  if (ua.includes("opera")) return "Opera";
  return "Other";
}

// Helper function to detect traffic source from referrer
function detectTrafficSource(referrer: string | null, url: string): string {
  if (!referrer || referrer === "Direct" || referrer === "") {
    return "Direct";
  }

  try {
    const referrerUrl = new URL(referrer);
    const hostname = referrerUrl.hostname.toLowerCase();
    
    // Check for UTM parameters in current URL
    const currentUrl = new URL(url, 'https://www.theorangecode.com');
    const utmSource = currentUrl.searchParams.get('utm_source');
    if (utmSource) {
      return utmSource.charAt(0).toUpperCase() + utmSource.slice(1);
    }
    
    // Google search
    if (hostname.includes('google.com') || hostname.includes('google.ae')) {
      const query = referrerUrl.searchParams.get('q');
      return query ? `Google Search: "${query.substring(0, 50)}"` : "Google";
    }
    
    // Bing search
    if (hostname.includes('bing.com')) {
      const query = referrerUrl.searchParams.get('q');
      return query ? `Bing Search: "${query.substring(0, 50)}"` : "Bing";
    }
    
    // Yahoo search
    if (hostname.includes('yahoo.com')) {
      return "Yahoo";
    }
    
    // Social media
    if (hostname.includes('facebook.com') || hostname.includes('fb.com')) return "Facebook";
    if (hostname.includes('instagram.com')) return "Instagram";
    if (hostname.includes('twitter.com') || hostname.includes('x.com')) return "Twitter/X";
    if (hostname.includes('linkedin.com')) return "LinkedIn";
    if (hostname.includes('youtube.com')) return "YouTube";
    if (hostname.includes('whatsapp.com') || hostname.includes('wa.me')) return "WhatsApp";
    if (hostname.includes('tiktok.com')) return "TikTok";
    if (hostname.includes('pinterest.com')) return "Pinterest";
    
    // Other common referrers
    if (hostname.includes('reddit.com')) return "Reddit";
    if (hostname.includes('quora.com')) return "Quora";
    
    // Same domain (internal navigation)
    if (hostname.includes('theorangecode.com')) {
      return "Internal";
    }
    
    // External website
    return `External: ${hostname}`;
  } catch (error) {
    // If URL parsing fails, try simple string matching
    const ref = referrer.toLowerCase();
    if (ref.includes('google')) return "Google";
    if (ref.includes('facebook') || ref.includes('fb.com')) return "Facebook";
    if (ref.includes('instagram')) return "Instagram";
    if (ref.includes('twitter') || ref.includes('x.com')) return "Twitter/X";
    if (ref.includes('linkedin')) return "LinkedIn";
    return "External";
  }
}

// Helper function to get area/neighborhood from coordinates using reverse geocoding
async function getAreaFromCoordinates(lat: number, lng: number, city: string): Promise<string | null> {
  // Only try reverse geocoding for UAE cities (Abu Dhabi, Dubai, etc.)
  if (city && (city.toLowerCase().includes('abu dhabi') || city.toLowerCase().includes('dubai'))) {
    try {
      // Use OpenStreetMap Nominatim API (free, no API key required)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'TheOrangeCode/1.0 (contact@theorangecode.com)', // Required by Nominatim
            'Accept': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const address = data.address || {};
        
        // Try to get neighborhood/area from various address fields
        const area = address.suburb || 
                    address.neighbourhood || 
                    address.quarter || 
                    address.district ||
                    address.area ||
                    address.locality;
        
        if (area) {
          console.log('✅ Got area from reverse geocoding:', area);
          return area;
        }
      }
    } catch (error) {
      console.log('ℹ️ Reverse geocoding failed (non-critical):', error);
    }
  }
  return null;
}

// Helper function to get location data (city, coordinates, area) from IP address
// Uses multiple services for better accuracy, specifically to distinguish Dubai vs Abu Dhabi
async function getLocationFromIP(ip: string): Promise<{ lat: number; lng: number; city?: string; region?: string; postalCode?: string; area?: string } | null> {
  // Skip for localhost or private IPs
  if (ip === "unknown" || ip.startsWith("127.") || ip.startsWith("192.168.") || ip.startsWith("10.") || ip.startsWith("172.")) {
    return null;
  }

  // Try ipinfo.io first (often more accurate for city detection, free tier: 50k/month)
  // ipinfo.io provides: city, region, country, postal code, coordinates, timezone, org
  try {
    const ipinfoResponse = await fetch(`https://ipinfo.io/${ip}/json`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (ipinfoResponse.ok) {
      const ipinfoData = await ipinfoResponse.json();
      
      // ipinfo.io returns coordinates as "lat,lng" string
      if (ipinfoData.loc) {
        const [lat, lng] = ipinfoData.loc.split(',').map(Number);
        if (!isNaN(lat) && !isNaN(lng)) {
          const city = ipinfoData.city;
          const postalCode = ipinfoData.postal || null;
          
          // Try to get area/neighborhood from coordinates
          let area: string | null = null;
          if (city) {
            area = await getAreaFromCoordinates(lat, lng, city);
          }
          
          console.log('✅ Got location from ipinfo.io:', {
            city: ipinfoData.city,
            region: ipinfoData.region,
            postalCode: postalCode,
            area: area,
            coordinates: `${lat}, ${lng}`
          });
          
          return { 
            lat, 
            lng,
            city: ipinfoData.city,
            region: ipinfoData.region,
            postalCode: postalCode,
            area: area
          };
        }
      }
    }
  } catch (error) {
    console.log('ℹ️ ipinfo.io failed, trying fallback:', error);
  }

  // Fallback to ip-api.com (free, 45 requests/minute, includes city data)
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,lat,lon,city,regionName`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn(`⚠️ IP geolocation API failed: ${response.status}`);
      return null;
    }

    const data = await response.json();
    
    if (data.status === 'success' && data.lat && data.lon) {
      console.log('✅ Got location from ip-api.com (fallback):', {
        city: data.city,
        region: data.regionName,
        coordinates: `${data.lat}, ${data.lon}`
      });
      return {
        lat: data.lat,
        lng: data.lon,
        city: data.city,
        region: data.regionName
      };
    }

    return null;
  } catch (error) {
    console.warn('⚠️ Error fetching location:', error);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check if Redis is configured - if not, just return success (graceful degradation)
    if (!process.env.UPSTASH_REDIS_REST_URL && !process.env.KV_REST_API_URL) {
      console.warn("Redis not configured - visitor tracking disabled");
      return NextResponse.json({ ok: true, message: "Tracking disabled - Redis not configured" });
    }

    const body = (await req.json()) as Partial<VisitorPayload>;

    const now = Date.now();
    const id = body.id ?? `anon:${now}`;

    // Get IP from headers (Vercel provides x-forwarded-for)
    const ip = body.ip ?? 
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? 
      req.headers.get("x-real-ip") ?? 
      "unknown";

    // Get location from Vercel headers (fallback)
    let country = body.country ?? req.headers.get("x-vercel-ip-country") ?? "Unknown";
    let city = body.city ?? req.headers.get("x-vercel-ip-city") ?? "Unknown";
    const region = req.headers.get("x-vercel-ip-country-region") ?? null;

    const userAgent = body.userAgent ?? req.headers.get("user-agent") ?? "Unknown";
    const path = body.path ?? req.url.split("?")[0] ?? "/";
    const referrer = body.referrer ?? req.headers.get("referer") ?? "Direct";
    
    // Detect traffic source
    const trafficSource = detectTrafficSource(referrer, req.url);
    
    // Track navigation flow (pages visited in this session)
    let navigationFlow: string[] = [];
    const sessionId = body.id ?? `anon:${now}`;
    const navigationKey = `navigation:${sessionId}`;
    const sessionKey = `session:${sessionId}`;
    
    // Track session start time and visit count
    let sessionStartTime: number = now;
    let visitCount: number = 1;
    let sessionDuration: number = 0;
    
    try {
      // Get existing session data
      const existingSession = await redis.get(sessionKey);
      if (existingSession) {
        try {
          const sessionData = JSON.parse(existingSession as string);
          sessionStartTime = sessionData.startTime || now;
          // Calculate session duration in seconds
          sessionDuration = Math.floor((now - sessionStartTime) / 1000);
        } catch (parseError) {
          // If parsing fails, start new session
          sessionStartTime = now;
        }
      } else {
        // New session - store start time
        await redis.set(sessionKey, JSON.stringify({ startTime: now }), { ex: 7200 }); // 2 hours
      }
      
      // Track visit count by IP address
      const visitCountKey = `visits:${ip}`;
      try {
        const existingVisitCount = await redis.get(visitCountKey);
        if (existingVisitCount) {
          visitCount = parseInt(existingVisitCount as string, 10) + 1;
        }
        // Store visit count for 90 days (to track returning visitors)
        await redis.set(visitCountKey, visitCount.toString(), { ex: 7776000 }); // 90 days
      } catch (visitError) {
        console.warn('⚠️ Failed to track visit count:', visitError);
      }
      
      // Get existing navigation history for this session
      const existingNavigation = await redis.get(navigationKey);
      if (existingNavigation) {
        try {
          navigationFlow = JSON.parse(existingNavigation as string);
        } catch (parseError) {
          navigationFlow = [];
        }
      }
      
      // Add current page to navigation flow (if not already the last page)
      if (navigationFlow.length === 0 || navigationFlow[navigationFlow.length - 1] !== path) {
        navigationFlow.push(path);
        // Keep only last 10 pages to avoid too much data
        if (navigationFlow.length > 10) {
          navigationFlow = navigationFlow.slice(-10);
        }
        // Store navigation flow for 1 hour (session duration)
        await redis.set(navigationKey, JSON.stringify(navigationFlow), { ex: 3600 });
      }
      
      // Update session with latest activity
      await redis.set(sessionKey, JSON.stringify({ 
        startTime: sessionStartTime,
        lastActivity: now,
        duration: sessionDuration
      }), { ex: 7200 }); // 2 hours
    } catch (navError) {
      console.warn('⚠️ Failed to track navigation flow:', navError);
    }

    // Detect device and browser
    const device = detectDevice(userAgent);
    const browser = detectBrowser(userAgent);

    // Get location data (coordinates + city + area) from IP (with caching - stored per IP for 30 days)
    let coordinates: { lat: number; lng: number } | null = null;
    let ipCity: string | null = null;
    let ipRegion: string | null = null;
    let ipArea: string | null = null;
    let ipPostalCode: string | null = null;
    
    if (ip && ip !== "unknown") {
      const locationCacheKey = `location:${ip}`;
      
      try {
        // First, check if we have cached location data for this IP
        const cachedLocation = await redis.get(locationCacheKey);
        
        if (cachedLocation) {
          try {
            const parsed = JSON.parse(cachedLocation as string);
            if (parsed.lat && parsed.lng) {
              coordinates = { lat: parsed.lat, lng: parsed.lng };
              ipCity = parsed.city || null;
              ipRegion = parsed.region || null;
              ipArea = parsed.area || null;
              ipPostalCode = parsed.postalCode || null;
              console.log('✅ Using cached location for IP:', ip, {
                city: ipCity,
                region: ipRegion,
                area: ipArea,
                postalCode: ipPostalCode,
                coordinates: `${coordinates.lat}, ${coordinates.lng}`
              });
            }
          } catch (parseError) {
            console.warn('⚠️ Failed to parse cached location:', parseError);
          }
        }
        
        // If no cached location, fetch new one
        if (!coordinates) {
          console.log('📍 Fetching new location for IP:', ip);
          const locationData = await getLocationFromIP(ip);
          
          if (locationData) {
            coordinates = { lat: locationData.lat, lng: locationData.lng };
            ipCity = locationData.city || null;
            ipRegion = locationData.region || null;
            ipArea = locationData.area || null;
            ipPostalCode = locationData.postalCode || null;
            
            // Cache the location data for 30 days (2,592,000 seconds)
            await redis.set(
              locationCacheKey,
              JSON.stringify({
                lat: locationData.lat,
                lng: locationData.lng,
                city: locationData.city,
                region: locationData.region,
                area: locationData.area,
                postalCode: locationData.postalCode
              }),
              { ex: 2592000 } // 30 days
            );
            console.log('✅ Cached location for IP:', ip, 'for 30 days', {
              city: ipCity,
              region: ipRegion,
              area: ipArea,
              postalCode: ipPostalCode,
              coordinates: `${locationData.lat}, ${locationData.lng}`,
              note: 'Coordinates are city-level approximations from IP geolocation'
            });
          }
        }
        
        // Use IP geolocation city if available and more specific (especially for UAE)
        // This helps distinguish between all Emirates: Abu Dhabi, Dubai, Sharjah, Ras Al Khaimah, Fujairah, Umm Al Quwain, Ajman, and Al Ain
        if (ipCity && country === "AE") {
          // Normalize city names for better matching
          const normalizedIpCity = ipCity.toLowerCase().trim();
          const normalizedVercelCity = city.toLowerCase().trim();
          
          // List of all UAE Emirates and major cities with their variations
          const uaeEmirates = [
            { keywords: ['abu dhabi', 'abudhabi', 'abu-dhabi', 'abudhabi'], name: 'Abu Dhabi' },
            { keywords: ['dubai', 'dubayy'], name: 'Dubai' },
            { keywords: ['sharjah', 'shajrah', 'sharja'], name: 'Sharjah' },
            { keywords: ['ras al khaimah', 'ras al khaima', 'rak', 'ras-al-khaimah', 'rasalkhaimah'], name: 'Ras Al Khaimah' },
            { keywords: ['fujairah', 'fujayrah', 'fujerah'], name: 'Fujairah' },
            { keywords: ['umm al quwain', 'umm al quwayn', 'uaq', 'umm-al-quwain'], name: 'Umm Al Quwain' },
            { keywords: ['ajman', 'ajman city'], name: 'Ajman' },
            { keywords: ['al ain', 'al-ain', 'alain', 'al ayn'], name: 'Al Ain' }
          ];
          
          // Check if IP geolocation city matches any UAE emirate
          let matchedEmirate: string | null = null;
          for (const emirate of uaeEmirates) {
            if (emirate.keywords.some(keyword => normalizedIpCity.includes(keyword))) {
              matchedEmirate = emirate.name;
              break;
            }
          }
          
          // Also check Vercel city for emirate matching
          let matchedVercelEmirate: string | null = null;
          if (normalizedVercelCity !== 'unknown' && normalizedVercelCity !== '') {
            for (const emirate of uaeEmirates) {
              if (emirate.keywords.some(keyword => normalizedVercelCity.includes(keyword))) {
                matchedVercelEmirate = emirate.name;
                break;
              }
            }
          }
          
          // Prioritize IP geolocation city if it matches an emirate
          if (matchedEmirate) {
            city = matchedEmirate; // Use the standardized emirate name
            console.log('✅ Using IP geolocation emirate (more accurate):', city, 'from IP city:', ipCity);
          } 
          // If IP doesn't match but Vercel does, use Vercel
          else if (matchedVercelEmirate) {
            city = matchedVercelEmirate;
            console.log('✅ Using Vercel emirate:', city);
          }
          // If Vercel city is unknown but IP city exists, use IP city (even if not a recognized emirate)
          else if ((normalizedVercelCity === 'unknown' || normalizedVercelCity === '') && ipCity) {
            city = ipCity;
            console.log('✅ Using IP geolocation city (Vercel unknown):', city);
          }
          // If both have cities but neither matches an emirate, prefer IP geolocation
          else if (ipCity && normalizedIpCity !== normalizedVercelCity) {
            city = ipCity;
            console.log('✅ Using IP geolocation city (different from Vercel):', city);
          }
        }
      } catch (error) {
        console.warn('⚠️ Failed to get/cache location (non-critical):', error);
      }
    }

    const payload: VisitorPayload = {
      id,
      ip,
      userAgent,
      path,
      referrer,
      country,
      city,
      lat: coordinates?.lat ?? null,
      lng: coordinates?.lng ?? null,
      ts: now,
      source: trafficSource,
      navigationFlow: navigationFlow.length > 0 ? navigationFlow : undefined,
      sessionDuration: sessionDuration > 0 ? sessionDuration : undefined,
      visitCount: visitCount > 0 ? visitCount : undefined,
    };

    const key = `active:${id}`;
    const visitorKey = `visitor:seen:${ip}`; // Track by IP to detect new visitors

    // Check if this is a new visitor (not seen in last 5 minutes)
    // Reduced to 2 minutes to catch more visitors, or use FORCE_VISITOR_NOTIFICATIONS=true to always notify
    let isNewVisitor = true;
    let lastSeen: string | null = null;
    let redisAvailable = true;
    const NOTIFICATION_WINDOW_SECONDS = 120; // 2 minutes instead of 5 minutes
    
    try {
      const lastSeenValue = await redis.get(visitorKey);
      // Ensure lastSeen is a string or null (handle Redis return type)
      if (lastSeenValue && typeof lastSeenValue === 'string') {
        lastSeen = lastSeenValue;
        const lastSeenTime = parseInt(lastSeen, 10);
        const timeSinceLastSeen = (now - lastSeenTime) / 1000; // seconds
        
        // Only consider "new" if not seen in the last 2 minutes
        isNewVisitor = timeSinceLastSeen > NOTIFICATION_WINDOW_SECONDS;
        
        console.log("🔍 Visitor check:", {
          ip,
          lastSeen: lastSeen ? `seen ${Math.round(timeSinceLastSeen)}s ago` : "new visitor",
          isNewVisitor,
          timeSinceLastSeen: Math.round(timeSinceLastSeen),
          window: NOTIFICATION_WINDOW_SECONDS,
          visitorKey
        });
      } else {
        lastSeen = null;
        isNewVisitor = true;
        console.log("🔍 Visitor check: NEW VISITOR (no previous record)", { ip, visitorKey });
      }
    } catch (redisError) {
      console.warn("⚠️ Redis check failed, treating as new visitor:", redisError);
      // If Redis fails, treat as new visitor to ensure notifications work
      isNewVisitor = true;
      redisAvailable = false;
    }

    // Try to store visitor data (but don't fail if Redis is down)
    try {
      // store active visitor with TTL 60 seconds
      await redis.set(key, JSON.stringify(payload), { ex: 60 });

      // Mark this IP as seen (2 minute window for notifications, but store longer for analytics)
      await redis.set(visitorKey, now.toString(), { ex: NOTIFICATION_WINDOW_SECONDS });

      // push into recent visitors list, keep only last 200
      await redis.lpush("visitors", JSON.stringify(payload));
      await redis.ltrim("visitors", 0, 199);
    } catch (redisError) {
      console.warn("⚠️ Redis storage failed (but continuing):", redisError);
      // Continue even if Redis fails
    }

    // Force notifications for testing - Set FORCE_VISITOR_NOTIFICATIONS=true in Vercel to always notify
    const forceNotifications = process.env.FORCE_VISITOR_NOTIFICATIONS === 'true';
    const shouldNotify = isNewVisitor || forceNotifications;
    
    // Always log visitor tracking with enhanced details
    const timeSinceLastSeen = lastSeen && typeof lastSeen === 'string' 
      ? Math.round((now - parseInt(lastSeen, 10)) / 1000) 
      : null;
    
    console.log("📊 Visitor tracked:", {
      ip,
      country,
      city,
      coordinates: coordinates ? `${coordinates.lat}, ${coordinates.lng}` : "not available",
      device,
      browser,
      path,
      isNewVisitor,
      redisAvailable,
      lastSeen: lastSeen ? `seen ${timeSinceLastSeen}s ago` : "never",
      willNotify: shouldNotify,
      slackConfigured: !!process.env.SLACK_WEBHOOK_URL
    });
    
    // Enhanced logging for debugging
    console.log("🔔 Notification decision:", {
      ip,
      isNewVisitor,
      forceNotifications,
      shouldNotify,
      SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL ? "✅ Set" : "❌ Missing",
      country,
      city
    });

    // Send Slack notification for new visitors only (to avoid spam)
    if (shouldNotify) {
      console.log("👤 NEW VISITOR - Sending Slack notification...", {
        ip,
        country,
        city,
        coordinates: coordinates ? `${coordinates.lat}, ${coordinates.lng}` : "not available",
        device,
        browser,
        path,
        timestamp: new Date().toISOString()
      });
      
      notifyNewVisitor({
        country: country !== "Unknown" ? country : undefined,
        city: city !== "Unknown" ? city : undefined,
        device: device,
        browser: browser,
        page: path,
        ip: ip !== "unknown" ? ip : undefined,
        lat: coordinates?.lat,
        lng: coordinates?.lng,
        source: trafficSource,
        navigationFlow: navigationFlow.length > 0 ? navigationFlow : undefined,
        sessionDuration: sessionDuration > 0 ? sessionDuration : undefined,
        visitCount: visitCount > 0 ? visitCount : undefined,
      })
        .then(() => {
          console.log("✅✅✅ Visitor Slack notification SENT SUCCESSFULLY");
        })
        .catch(err => {
          console.error("❌❌❌ Slack notification FAILED:", {
            error: err.message,
            stack: err.stack,
            ip,
            country,
            city
          });
          // Don't fail tracking if Slack fails
        });
    } else {
      console.log("⏭️ Visitor already seen recently, skipping notification", {
        ip,
        lastSeen: lastSeen,
        timeSinceLastSeen: lastSeen && typeof lastSeen === 'string' ? `${Math.round((now - parseInt(lastSeen, 10)) / 1000)} seconds` : "unknown"
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("track-visitor error", error);
    // Return success even on error to not break the page
    return NextResponse.json(
      { ok: true, error: String(error?.message ?? error) },
      { status: 200 }
    );
  }
}
