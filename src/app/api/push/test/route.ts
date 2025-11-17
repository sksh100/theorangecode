import { NextRequest, NextResponse } from "next/server";
import { sendPushToAll } from "@/lib/webPush";

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest) {
  try {
    await sendPushToAll({
      title: "Test notification",
      body: "If you see this on your phone, push works",
      url: "/admin/mobile"
    });

    return NextResponse.json({ 
      success: true, 
      message: "Test push notification sent to all subscribers" 
    });
  } catch (error: any) {
    console.error('❌ Error sending test push:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Unknown error' 
    }, { status: 500 });
  }
}

