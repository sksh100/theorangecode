import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { notifyPayhipEbookPurchase } from "@/lib/slack";

export const dynamic = 'force-dynamic'

/**
 * Payhip webhook endpoint
 * Receives webhook events from Payhip when customers purchase ebooks
 * 
 * Payhip sends webhooks with HMAC SHA256 signature verification
 * The signature is in the X-Payhip-Signature header
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    
    // Payhip may use different header names for signature
    const signature = req.headers.get("x-payhip-signature") ||
                      req.headers.get("X-PayHip-Signature") ||
                      req.headers.get("X-Signature");

    // Get Payhip API key from environment variables
    const payhipApiKey = process.env.PAYHIP_API_KEY;

    if (!payhipApiKey) {
      console.error("❌ Payhip API key not configured - missing PAYHIP_API_KEY");
      return NextResponse.json(
        { error: "Payhip API key not configured" },
        { status: 500 }
      );
    }

    // Verify webhook signature (Payhip uses HMAC SHA256)

    if (signatureHeader) {
      const expectedSignature = crypto
        .createHmac("sha256", payhipApiKey)
        .update(body)
        .digest("hex");

      // Payhip may send signature as: sha256=<hash> or just the hash
      const receivedHash = signatureHeader.replace(/^sha256=/, "").trim();

      if (receivedHash !== expectedSignature) {
        console.error("❌ Invalid Payhip webhook signature", {
          received: receivedHash.substring(0, 10) + "...",
          expected: expectedSignature.substring(0, 10) + "...",
        });
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 401 }
        );
      }
      console.log("✅ Payhip webhook signature verified");
    } else {
      console.warn("⚠️ Payhip webhook received without signature - proceeding anyway (not recommended for production)");
    }

    // Parse webhook payload
    const event = JSON.parse(body);

    console.log("📦 Payhip webhook received:", {
      event: event.event,
      saleId: event.sale?.id,
      customerEmail: event.sale?.email,
    });

    // Handle "paid" event (when a customer completes a purchase)
    if (event.event === "paid") {
      const sale = event.sale;

      if (!sale) {
        console.error("❌ Payhip webhook: 'paid' event missing sale data");
        return NextResponse.json(
          { error: "Missing sale data" },
          { status: 400 }
        );
      }

      // Extract sale information
      const customerEmail = sale.email || "unknown@email.com";
      const customerName = sale.name || customerEmail;
      const amount = parseFloat(sale.price || "0");
      const currency = sale.currency || "USD";
      const orderId = sale.id || sale.sale_id || "unknown";
      const productName = sale.product_name || "Ebook";
      const productId = sale.product_id || "";

      console.log("💰 Payhip purchase detected:", {
        customerEmail,
        customerName,
        amount,
        currency,
        orderId,
        productName,
      });

      // Send Slack notification
      try {
        await notifyPayhipEbookPurchase({
          customerEmail,
          customerName,
          amount,
          currency: currency.toUpperCase(),
          orderId: String(orderId),
          productName,
        });

        console.log("✅ Slack notification sent for Payhip purchase");
      } catch (slackError: any) {
        console.error("❌ Error sending Slack notification:", slackError);
        // Don't fail the webhook if Slack fails
      }

      return NextResponse.json({
        success: true,
        message: "Webhook processed successfully",
        orderId,
      });
    }

    // Handle other events (refunded, subscription.created, subscription.deleted)
    if (event.event === "refunded") {
      console.log("🔄 Payhip refund detected:", {
        saleId: event.sale?.id,
        customerEmail: event.sale?.email,
      });

      // You can add refund notification logic here if needed
      return NextResponse.json({
        success: true,
        message: "Refund event processed",
      });
    }

    // Log unhandled events
    console.log("ℹ️ Payhip webhook: Unhandled event type:", event.event);

    return NextResponse.json({
      success: true,
      message: "Webhook received but event not handled",
      event: event.event,
    });
  } catch (error: any) {
    console.error("❌ Payhip webhook error:", error);
    return NextResponse.json(
      {
        error: "Webhook processing failed",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

