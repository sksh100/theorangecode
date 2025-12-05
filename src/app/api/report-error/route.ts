import { NextRequest, NextResponse } from "next/server";
import { notifyError } from "@/lib/slack";

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { message, stack, digest, url, userAgent } = body;

    // Filter out chunk loading errors - these are usually due to old cached versions
    // and are not critical errors that need Slack notifications
    const isChunkLoadingError = 
      message?.includes('Loading chunk') ||
      message?.includes('ChunkLoadError') ||
      message?.includes('Failed to fetch dynamically imported module') ||
      stack?.includes('chunk') && stack?.includes('failed');

    if (isChunkLoadingError) {
      console.log('ℹ️ Chunk loading error filtered out (non-critical):', message);
      // Still return success, but don't send to Slack
      return NextResponse.json({ success: true, filtered: true });
    }

    // Send Slack notification for other errors
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

