import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import twilio from 'twilio'

// Lazy initialization of Stripe to handle missing env vars
function getStripeClient() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  if (!stripeSecretKey) {
    return null
  }
  return new Stripe(stripeSecretKey, {
    apiVersion: '2025-10-29.clover',
  })
}

// Initialize Twilio client (lazy initialization to handle missing env vars)
function getTwilioClient() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  
  if (!accountSid || !authToken) {
    return null
  }
  
  return twilio(accountSid, authToken)
}

export const dynamic = 'force-dynamic'

/**
 * Send WhatsApp notification via Twilio
 */
async function sendWhatsAppNotification(message: string): Promise<boolean> {
  try {
    const whatsappNumber = process.env.WHATSAPP_TO_NUMBER // Your WhatsApp number (e.g., +971501234567)
    const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER // Twilio WhatsApp number (e.g., whatsapp:+14155238886)

    if (!whatsappNumber || !twilioWhatsAppNumber) {
      console.error('⚠️ WhatsApp configuration missing')
      return false
    }

    const twilioClient = getTwilioClient()
    if (!twilioClient) {
      console.error('⚠️ Twilio client not initialized')
      return false
    }

    // Format the number properly for WhatsApp
    const toNumber = whatsappNumber.startsWith('whatsapp:') 
      ? whatsappNumber 
      : `whatsapp:${whatsappNumber}`

    const fromNumber = twilioWhatsAppNumber.startsWith('whatsapp:')
      ? twilioWhatsAppNumber
      : `whatsapp:${twilioWhatsAppNumber}`

    const twilioMessage = await twilioClient.messages.create({
      from: fromNumber,
      to: toNumber,
      body: message,
    })

    console.log('✅ WhatsApp notification sent:', twilioMessage.sid)
    return true
  } catch (error: any) {
    console.error('❌ Failed to send WhatsApp notification:', error.message)
    return false
  }
}

/**
 * Format payment details for WhatsApp message
 */
function formatPaymentMessage(payment: Stripe.PaymentIntent): string {
  const amount = payment.amount / 100 // Convert from cents
  const currency = payment.currency.toUpperCase()
  const customerEmail = payment.receipt_email || 'N/A'
  const paymentId = payment.id
  
  // Get customer name if available
  let customerName = 'Customer'
  if (payment.metadata?.customer_name) {
    customerName = payment.metadata.customer_name
  } else if (payment.metadata?.name) {
    customerName = payment.metadata.name
  }

  return `🎉 *New Payment Received!*

💰 Amount: ${amount} ${currency}
👤 Customer: ${customerName}
📧 Email: ${customerEmail}
🆔 Payment ID: ${paymentId}

✅ Payment successful!

View in Stripe: https://dashboard.stripe.com/payments/${paymentId}`
}

/**
 * Handle Stripe webhook events
 */
export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    console.error('❌ Missing Stripe signature')
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    )
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error('❌ Missing Stripe webhook secret')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  const stripe = getStripeClient()
  if (!stripe) {
    console.error('❌ STRIPE_SECRET_KEY not configured')
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 500 }
    )
  }

  let event: Stripe.Event

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('✅ Payment succeeded:', paymentIntent.id)

        // Send WhatsApp notification
        const message = formatPaymentMessage(paymentIntent)
        await sendWhatsAppNotification(message)

        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent
        console.log('❌ Payment failed:', failedPayment.id)

        // Send failure notification
        const failureMessage = `⚠️ *Payment Failed*

🆔 Payment ID: ${failedPayment.id}
💰 Amount: ${failedPayment.amount / 100} ${failedPayment.currency.toUpperCase()}
❌ Status: ${failedPayment.status}

Check Stripe dashboard for details.`

        await sendWhatsAppNotification(failureMessage)
        break

      case 'charge.refunded':
        const refund = event.data.object as Stripe.Charge
        console.log('🔄 Refund processed:', refund.id)

        const refundMessage = `🔄 *Refund Processed*

🆔 Charge ID: ${refund.id}
💰 Amount: ${refund.amount / 100} ${refund.currency.toUpperCase()}
📧 Customer: ${refund.billing_details.email || 'N/A'}`

        await sendWhatsAppNotification(refundMessage)
        break

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('❌ Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

