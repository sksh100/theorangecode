import { NextRequest, NextResponse } from "next/server";
import { notifyError } from "@/lib/slack";

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { message, stack, digest, url, userAgent } = body;

    // Send Slack notification
    await notifyError({
      message: message || 'Unknown error',
      stack: stack || undefined,
      url: url || request.url,
      userId: undefined, // Could extract from session if needed
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error reporting error to Slack:', error);
    // Don't fail if error reporting fails
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

