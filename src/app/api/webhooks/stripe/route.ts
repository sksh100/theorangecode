import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { redis } from "@/lib/redis";
import { sendPushToAll } from "@/lib/webPush";
import { notifyPayment, notifyError, notifyEbookPurchase } from "@/lib/slack";
import { createDownloadToken } from "@/lib/downloadToken";

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

    // Try to verify with ebook webhook secret first, then fall back to masterclass secret
    const ebookWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET_UK_TO_UAE_EBOOK;
    const masterclassWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!ebookWebhookSecret && !masterclassWebhookSecret) {
      console.error("Stripe webhook secret not configured - neither ebook nor masterclass secret found");
      return new NextResponse("Webhook secret not configured", { status: 500 });
    }

    let event: Stripe.Event;
    let usedEbookSecret = false;

    // Try ebook webhook secret first
    if (ebookWebhookSecret) {
      try {
        event = stripe.webhooks.constructEvent(
          body,
          sig,
          ebookWebhookSecret
        );
        usedEbookSecret = true;
        console.log('✅ Webhook verified with ebook secret');
      } catch (err: any) {
        // If ebook secret fails, try masterclass secret
        if (masterclassWebhookSecret) {
          try {
            event = stripe.webhooks.constructEvent(
              body,
              sig,
              masterclassWebhookSecret
            );
            usedEbookSecret = false;
            console.log('✅ Webhook verified with masterclass secret');
          } catch (masterclassErr: any) {
            console.error("Stripe webhook error - both secrets failed:", {
              ebookError: err.message,
              masterclassError: masterclassErr.message
            });
            return new NextResponse("Webhook signature verification failed", { status: 400 });
          }
        } else {
          console.error("Stripe webhook error with ebook secret:", err.message);
          return new NextResponse("Webhook Error", { status: 400 });
        }
      }
    } else {
      // Only masterclass secret available
      if (!masterclassWebhookSecret) {
        return new NextResponse("Webhook secret not configured", { status: 500 });
      }
      try {
        event = stripe.webhooks.constructEvent(
          body,
          sig,
          masterclassWebhookSecret
        );
        usedEbookSecret = false;
        console.log('✅ Webhook verified with masterclass secret');
      } catch (err: any) {
        console.error("Stripe webhook error:", err.message);
        return new NextResponse("Webhook Error", { status: 400 });
      }
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

      // Store payment in Redis list
      await redis.lpush("payments:list", JSON.stringify(payment));
      await redis.ltrim("payments:list", 0, 100);

      // Update revenue and count - ensure they're numbers
      const currentRevenueRaw = await redis.get("payments:total_revenue");
      const currentRevenue = typeof currentRevenueRaw === 'string' 
        ? parseFloat(currentRevenueRaw) || 0 
        : (currentRevenueRaw as number) || 0;
      const revenue = currentRevenue + amount;
      await redis.set("payments:total_revenue", revenue.toString());
      
      const currentCountRaw = await redis.get("payments:count");
      const currentCount = typeof currentCountRaw === 'string' 
        ? parseInt(currentCountRaw, 10) || 0 
        : (currentCountRaw as number) || 0;
      const newCount = currentCount + 1;
      await redis.set("payments:count", newCount.toString());
      
      console.log('💰 Payment stats updated:', {
        previousRevenue: currentRevenue,
        newRevenue: revenue,
        previousCount: currentCount,
        newCount,
        amount,
        currency
      });

      // You can also push to "events" for notification
      await redis.lpush("events", JSON.stringify({ type: "payment", ...payment }));
      await redis.ltrim("events", 0, 100);

      // Send push notification
      await sendPushToAll({
        title: "New payment received",
        body: `${amount} ${currency} from ${email || "Customer"}`,
        url: "/admin/mobile"
      }).catch(err => {
        console.error('Push notification error:', err);
        // Don't fail the webhook if push fails
      });

      // Send Slack notification
      notifyPayment({
        customerEmail: email,
        amount: session.amount_total ?? 0,
        currency: session.currency ?? "aed",
        productName: session.metadata?.productName || "Course/Product",
        stripeChargeId: session.payment_intent as string || session.id
      }).catch(err => {
        console.error('Slack notification error:', err);
        // Don't fail the webhook if Slack fails
      });

      // Check if this is an ebook purchase and send the ebook
      // Detection logic: Check metadata, product name, amount, and webhook secret
      const productName = session.metadata?.productName || session.metadata?.product || ""
      const amountTotal = session.amount_total ?? 0
      const amountInAED = amountTotal / 100 // Convert from cents to AED
      
      // PRIORITY 1: Check amount first (most reliable)
      // Beyond Formalities = 149 AED, UK to UAE = different price
      const is149AED = amountInAED >= 140 && amountInAED <= 160 // 149 AED range
      
      // PRIORITY 2: Check metadata and product name
      const hasBeyondFormalitiesMetadata = (
        productName.toLowerCase().includes('beyond formalities') ||
        productName.toLowerCase().includes('beyond-formalities') ||
        session.metadata?.ebookType === 'beyond-formalities' ||
        session.metadata?.type === 'beyond-formalities'
      )
      
      const hasUkToUaeMetadata = (
        productName.toLowerCase().includes('uk to uae') ||
        productName.toLowerCase().includes('uk-to-uae') ||
        session.metadata?.ebookType === 'uk-to-uae' ||
        session.metadata?.type === 'uk-to-uae'
      )
      
      // PRIORITY 3: Check webhook secret (ebook secret = likely Beyond Formalities)
      // But amount takes precedence!
      
      // Determine ebook type: Amount is most reliable indicator
      let ebookType: 'beyond-formalities' | 'uk-to-uae' = 'uk-to-uae' // Default fallback
      
      if (is149AED) {
        // 149 AED = Beyond Formalities (most reliable)
        ebookType = 'beyond-formalities'
      } else if (hasBeyondFormalitiesMetadata) {
        ebookType = 'beyond-formalities'
      } else if (hasUkToUaeMetadata) {
        ebookType = 'uk-to-uae'
      } else if (usedEbookSecret) {
        // If ebook secret was used and no other indicators, default to Beyond Formalities
        ebookType = 'beyond-formalities'
      }
      // Otherwise defaults to 'uk-to-uae'
      
      const isEbookPurchase = is149AED || hasBeyondFormalitiesMetadata || hasUkToUaeMetadata || 
                              productName.toLowerCase().includes('ebook') ||
                              session.metadata?.type === 'ebook' ||
                              usedEbookSecret

      if (isEbookPurchase && email && email !== 'unknown') {
        // Send dedicated ebook purchase notification to Slack
        notifyEbookPurchase({
          customerEmail: email,
          customerName: session.customer_details?.name || email.split('@')[0],
          amount: session.amount_total ?? 0,
          currency: session.currency ?? "aed",
          orderId: session.id,
          stripeChargeId: session.payment_intent as string || session.id,
          ebookType: ebookType // Pass ebook type to Slack notification
        }).catch(err => {
          console.error('Slack ebook purchase notification error:', err);
          // Don't fail the webhook if Slack fails
        });
        try {
          // Generate download token for this purchase
          const downloadToken = await createDownloadToken(email)
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_DOMAIN || 'https://www.theorangecode.com'
          
          // Send ebook via email with download token
          const ebookResponse = await fetch(`${baseUrl}/api/send-ebook`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              customerName: session.customer_details?.name || email.split('@')[0],
              orderId: session.id,
              downloadToken: downloadToken,
              ebookType: ebookType,
            }),
          })
          
          // Log for debugging
          console.log('📚 Ebook delivery initiated:', {
            email,
            ebookType,
            amount: amountInAED,
            hasMetadata: !!session.metadata,
            productName,
            usedEbookSecret
          })

          if (ebookResponse.ok) {
            console.log('✅ Ebook sent successfully to:', email)
          } else {
            console.error('⚠️ Failed to send ebook:', await ebookResponse.text())
          }
        } catch (ebookError) {
          console.error('❌ Error sending ebook:', ebookError)
          // Don't fail the webhook if ebook delivery fails
        }
      }

      console.log('✅ Payment stored in Redis:', payment);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('❌ Error processing Stripe webhook:', error);
    
    // Notify about critical payment processing error
    notifyError({
      message: `Stripe webhook error: ${error.message || 'Unknown error'}`,
      stack: error.stack,
      url: '/api/webhooks/stripe',
    }).catch(slackErr => console.error("Failed to notify error:", slackErr));
    
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
