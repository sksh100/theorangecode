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

    const [listRaw, totalRevenueRaw, countRaw] = await Promise.all([
      redis.lrange("payments:list", 0, 50),
      redis.get("payments:total_revenue"),
      redis.get("payments:count"),
    ]);

    // Parse payments safely
    const payments = (listRaw || []).map((p: string) => {
      try {
        return typeof p === 'string' ? JSON.parse(p) : p;
      } catch {
        return null;
      }
    }).filter(Boolean);

    // Parse revenue and count - handle both string and number types
    const totalRevenue = typeof totalRevenueRaw === 'string' 
      ? parseFloat(totalRevenueRaw) || 0 
      : (totalRevenueRaw as number) || 0;
    
    const count = typeof countRaw === 'string' 
      ? parseInt(countRaw, 10) || 0 
      : (countRaw as number) || 0;

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

    console.log('📊 Payments API response:', {
      paymentsCount: formattedPayments.length,
      totalRevenue,
      count,
      samplePayment: formattedPayments[0]
    });

    return NextResponse.json({
      success: true,
      payments: formattedPayments,
      stats: {
        totalRevenue,
        count,
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
