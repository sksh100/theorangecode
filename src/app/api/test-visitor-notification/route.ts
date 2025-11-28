import { NextRequest, NextResponse } from "next/server";
import { notifyNewVisitor } from "@/lib/slack";

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
    
    await notifyNewVisitor({
      country: country !== "Unknown" ? country : undefined,
      city: city !== "Unknown" ? city : undefined,
      device: "Desktop",
      browser: "Chrome",
      page: "/test",
      ip: ip
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

