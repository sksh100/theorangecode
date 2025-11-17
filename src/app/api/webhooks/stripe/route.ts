import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { redis } from "@/lib/redis";

// Initialize Stripe only if secret key is available
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-10-29.clover",
  });
};

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    
    if (!stripe) {
      console.error("Stripe not configured - missing STRIPE_SECRET_KEY");
      return new NextResponse("Stripe not configured", { status: 500 });
    }

    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
      return new NextResponse("Missing signature", { status: 400 });
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error("Stripe webhook secret not configured");
      return new NextResponse("Webhook secret not configured", { status: 500 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err: any) {
      console.error("Stripe webhook error", err.message);
      return new NextResponse("Webhook Error", { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const amount = (session.amount_total ?? 0) / 100;
      const currency = (session.currency ?? "aed").toUpperCase();
      const email = session.customer_details?.email ?? "unknown";

      const payment = {
        id: session.id,
        amount,
        currency,
        email,
        time: Date.now(),
        status: session.payment_status,
      };

      await redis.lpush("payments:list", JSON.stringify(payment));
      await redis.ltrim("payments:list", 0, 100);

      await redis.incrbyfloat("payments:total_revenue", amount);
      await redis.incr("payments:count");

      // You can also push to "events" for notification
      await redis.lpush("events", JSON.stringify({ type: "payment", ...payment }));
      await redis.ltrim("events", 0, 100);

      console.log('✅ Payment stored in Redis:', payment);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('❌ Error processing Stripe webhook:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
