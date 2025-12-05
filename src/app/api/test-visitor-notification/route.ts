import { NextRequest, NextResponse } from "next/server";
import { notifyNewVisitor } from "@/lib/slack";

export const dynamic = 'force-dynamic';

/**
 * Test endpoint to manually trigger a visitor notification
 * Visit: /api/test-visitor-notification to test
 */
export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? 
               request.headers.get("x-real-ip") ?? 
               "test-ip";
    
    const country = request.headers.get("x-vercel-ip-country") ?? "Test Country";
    const city = request.headers.get("x-vercel-ip-city") ?? "Test City";
    const userAgent = request.headers.get("user-agent") ?? "Test Browser";
    
    console.log("🧪 Testing visitor notification...", { ip, country, city, userAgent });
    
    // Try to get coordinates for test
    let coordinates: { lat: number; lng: number } | null = null;
    if (ip && ip !== "test-ip" && ip !== "unknown") {
      try {
        // Use the same function from track-visitor
        const ipinfoResponse = await fetch(`https://ipinfo.io/${ip}/json`, {
          headers: { 'Accept': 'application/json' },
        });
        if (ipinfoResponse.ok) {
          const ipinfoData = await ipinfoResponse.json();
          if (ipinfoData.loc) {
            const [lat, lng] = ipinfoData.loc.split(',').map(Number);
            if (!isNaN(lat) && !isNaN(lng)) {
              coordinates = { lat, lng };
            }
          }
        }
      } catch (error) {
        console.log('Could not fetch coordinates for test:', error);
      }
    }
    
    await notifyNewVisitor({
      country: country !== "Unknown" ? country : undefined,
      city: city !== "Unknown" ? city : undefined,
      device: "Desktop",
      browser: "Chrome",
      page: "/test",
      ip: ip !== "test-ip" ? ip : undefined,
      lat: coordinates?.lat,
      lng: coordinates?.lng,
      source: "Test Notification",
      navigationFlow: ["/home", "/masterclasses", "/about", "/test"],
      sessionDuration: 185, // 3 minutes 5 seconds
      visitCount: 2, // Simulating a returning visitor
    });

    return NextResponse.json({
      success: true,
      message: "✅ Test visitor notification sent! Check your Slack channel.",
      data: { ip, country, city }
    });
  } catch (error: any) {
    console.error("❌ Test visitor notification error:", error);
    return NextResponse.json({
      success: false,
      message: `❌ Error: ${error.message}`,
    }, { status: 500 });
  }
}

