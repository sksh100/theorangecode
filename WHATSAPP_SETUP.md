# 📱 WhatsApp Notifications Setup for Stripe Payments

## ✅ What's Been Set Up

Your website now has WhatsApp notifications configured for Stripe payments! When someone makes a payment, you'll receive a WhatsApp message with the payment details.

## 🔧 Setup Instructions

### Step 1: Create a Twilio Account

1. Go to [https://www.twilio.com](https://www.twilio.com)
2. Sign up for a free account (you get $15.50 free credit)
3. Verify your phone number
4. Go to the Twilio Console Dashboard

### Step 2: Get Your Twilio Credentials

1. In Twilio Console, go to **Settings** → **General** → **API Credentials**
2. Copy your:
   - **Account SID** (starts with `AC...`)
   - **Auth Token** (click "Show" to reveal it)

### Step 3: Enable WhatsApp Sandbox (Free Testing)

1. In Twilio Console, go to **Messaging** → **Try it out** → **Send a WhatsApp message**
2. Click **"Join sandbox"** or go to **Messaging** → **WhatsApp** → **Sandbox**
3. You'll see a WhatsApp number (e.g., `+1 415 523 8886`)
4. Send the join code to this number from your WhatsApp (e.g., "join [code]" to `+1 415 523 8886`)
5. You'll receive a confirmation message

### Step 4: Get Your WhatsApp Numbers

1. **Twilio WhatsApp Number**: Found in Twilio Console → Messaging → WhatsApp → Sandbox
   - Format: `+14155238886` or `whatsapp:+14155238886`
   
2. **Your WhatsApp Number**: Your personal WhatsApp number
   - Format: `+971501234567` (include country code, no + in env var)
   - Or `whatsapp:+971501234567`

### Step 5: Add Environment Variables to Vercel

Go to your Vercel project dashboard and add these environment variables:

```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
WHATSAPP_TO_NUMBER=whatsapp:+971501234567
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Important Notes:**
- Replace `ACxxxxxxxxxxxx...` with your actual Account SID
- Replace `your_auth_token_here` with your actual Auth Token
- Replace `+14155238886` with your Twilio WhatsApp sandbox number
- Replace `+971501234567` with YOUR WhatsApp number (include country code)
- The `STRIPE_WEBHOOK_SECRET` will be set in Step 6

### Step 6: Set Up Stripe Webhook

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. **Endpoint URL**: `https://www.theorangecode.com/api/webhooks/stripe`
4. **Events to send**: Select these events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded` (optional)
5. Click **"Add endpoint"**
6. Copy the **Signing secret** (starts with `whsec_...`)
7. Add it to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

### Step 7: Test It!

1. Make a test payment on your website
2. You should receive a WhatsApp message with payment details!

## 📱 What You'll Receive

### Successful Payment Message:
```
🎉 *New Payment Received!*

💰 Amount: 999 AED
👤 Customer: John Doe
📧 Email: john@example.com
🆔 Payment ID: pi_xxxxx

✅ Payment successful!

View in Stripe: https://dashboard.stripe.com/payments/pi_xxxxx
```

### Failed Payment Message:
```
⚠️ *Payment Failed*

🆔 Payment ID: pi_xxxxx
💰 Amount: 999 AED
❌ Status: failed

Check Stripe dashboard for details.
```

## 💰 Pricing

### Twilio WhatsApp Pricing:
- **Sandbox (Free)**: Free for testing (limited to sandbox number)
- **Production**: ~$0.005 per message (very cheap!)
- **Free Credit**: $15.50 free credit when you sign up (good for ~3,100 messages)

### Upgrade to Production WhatsApp (Optional):

1. Go to Twilio Console → **Messaging** → **WhatsApp**
2. Request a WhatsApp Business API number
3. Complete WhatsApp Business verification
4. Update `TWILIO_WHATSAPP_NUMBER` with your production number

## 🔒 Security

- ✅ Webhook signature verification (prevents fake requests)
- ✅ Environment variables (credentials stored securely)
- ✅ HTTPS only (required by Twilio)

## 🐛 Troubleshooting

### Not receiving WhatsApp messages?

1. **Check Twilio Console**: Go to **Monitor** → **Logs** → **Messaging** to see if messages were sent
2. **Check environment variables**: Make sure all variables are set correctly in Vercel
3. **Check WhatsApp number format**: Must include country code (e.g., `+971501234567`)
4. **Verify Sandbox**: Make sure you've joined the Twilio WhatsApp sandbox
5. **Check Stripe webhook**: Verify webhook is active in Stripe Dashboard

### Webhook not receiving events?

1. **Check webhook URL**: Must be `https://www.theorangecode.com/api/webhooks/stripe`
2. **Check webhook secret**: Must match in Vercel environment variables
3. **Check Stripe Dashboard**: Go to **Webhooks** → Click on your webhook → View **Recent events**
4. **Check Vercel logs**: Go to Vercel Dashboard → Functions → Check for errors

## 📚 Additional Resources

- [Twilio WhatsApp Documentation](https://www.twilio.com/docs/whatsapp)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Twilio Console](https://console.twilio.com)

## ✅ Next Steps

1. Set up Twilio account
2. Add environment variables to Vercel
3. Configure Stripe webhook
4. Test with a payment
5. Enjoy instant WhatsApp notifications! 🎉

