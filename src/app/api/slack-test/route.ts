import { NextResponse } from "next/server";
import { testSlackConnection } from "@/lib/slack";

/**
 * Test endpoint to verify Slack integration is working
 * Visit: /api/slack-test to test your Slack notifications
 */
export async function GET() {
  try {
    const success = await testSlackConnection();

    if (success) {
      return NextResponse.json({
        success: true,
        message: "✅ Slack notification sent! Check your Slack channel.",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message:
            "⚠️ Slack webhook not configured. Add SLACK_WEBHOOK_URL to your environment variables.",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("❌ Slack test error:", error);
    return NextResponse.json(
      {
        success: false,
        message: `❌ Error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

