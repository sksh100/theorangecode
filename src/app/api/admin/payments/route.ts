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
        payments: [],
        stats: {
          totalRevenue: 0,
          count: 0,
        },
      });
    }

    const [listRaw, totalRevenue, count] = await Promise.all([
      redis.lrange<string>("payments:list", 0, 50),
      redis.get<number>("payments:total_revenue"),
      redis.get<number>("payments:count"),
    ]);

    const payments = listRaw.map((p) => JSON.parse(p));

    // Format payments for dashboard (convert time to ISO string, add customerName field)
    const formattedPayments = payments.map((p: any) => ({
      id: p.id,
      amount: p.amount,
      currency: p.currency,
      status: p.status || 'succeeded',
      customerEmail: p.email || 'unknown',
      customerName: p.email ? p.email.split('@')[0] : 'Customer',
      createdAt: new Date(p.time).toISOString(),
      description: `Payment - ${p.currency} ${p.amount}`,
    }));

    return NextResponse.json({
      success: true,
      payments: formattedPayments,
      stats: {
        totalRevenue: totalRevenue ?? 0,
        count: count ?? 0,
      },
    });
  } catch (error: any) {
    console.error('Error fetching payments:', error);
    
    return NextResponse.json({
      success: true,
      payments: [],
      stats: {
        totalRevenue: 0,
        count: 0,
      },
    });
  }
}
