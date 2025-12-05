# 📧 Ebook Download System - Complete Setup Guide

## ✅ How It Works (Automatic!)

### The Flow:
1. **Customer pays via Stripe** → Stripe automatically collects their email during checkout
2. **Stripe sends webhook** → Your server receives payment notification
3. **Webhook automatically**:
   - Generates secure download token (48-hour validity)
   - Sends email via Resend with download link
   - **No manual action needed!**

### Who Sends the Email?
- **Resend** (email service) sends it automatically
- Triggered by Stripe webhook when payment succeeds
- Email includes personalized download link

---

## 🔧 Setup Required

### Step 1: Get Resend API Key (For Sending Emails)

1. **Sign up for Resend** (free tier: 3,000 emails/month)
   - Go to: https://resend.com
   - Sign up with your email
   - Verify your email address

2. **Verify your domain** (optional but recommended)
   - Go to: Resend Dashboard → Domains
   - Add `theorangecode.com`
   - Add DNS records (they'll provide instructions)
   - This allows sending from `hello@theorangecode.com`

3. **Get your API Key**
   - Go to: Resend Dashboard → API Keys
   - Click "Create API Key"
   - Name it: "Ebook Downloads"
   - Copy the key (starts with `re_`)

### Step 2: Configure Stripe Webhook

1. **Go to Stripe Dashboard**
   - https://dashboard.stripe.com/webhooks

2. **Add Webhook Endpoint**
   - Click "Add endpoint"
   - Endpoint URL: `https://www.theorangecode.com/api/webhooks/stripe`
   - Description: "Ebook download automation"

3. **Select Events**
   - Check: `checkout.session.completed`
   - This triggers when payment is successful

4. **Get Webhook Secret**
   - After creating, click on the webhook
   - Copy "Signing secret" (starts with `whsec_`)

5. **Add Metadata to Stripe Payment Link** (Important!)
   - Go to: Stripe Dashboard → Products → Payment Links
   - Find your ebook payment link
   - Edit it
   - Add metadata:
     - Key: `productName` → Value: `UK to UAE Ebook`
     - OR Key: `type` → Value: `ebook`
   - This tells the webhook it's an ebook purchase

### Step 3: Add Environment Variables

Add these to **Vercel** (Production) and `.env.local` (Local):

#### In Vercel:
1. Go to: Your Project → Settings → Environment Variables
2. Add each variable:

```env
# Download Token Secret (I generated this for you)
DOWNLOAD_TOKEN_SECRET=6a90d1eb6df5774f7c0597c3dcd1279837e6daf36df71d08d0567f777c01be87ac4bda3309f3d26a6e304e919624f67294a25687cce023b33771c239e8b9a97b

# Resend API Key (from Step 1)
RESEND_API_KEY=re_your_resend_api_key_here

# Your website URL (already set, just verify)
NEXT_PUBLIC_BASE_URL=https://www.theorangecode.com

# Stripe Webhook Secret (from Step 2)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

#### In `.env.local` (for local testing):
```env
DOWNLOAD_TOKEN_SECRET=6a90d1eb6df5774f7c0597c3dcd1279837e6daf36df71d08d0567f777c01be87ac4bda3309f3d26a6e304e919624f67294a25687cce023b33771c239e8b9a97b
RESEND_API_KEY=re_your_resend_api_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

---

## 📧 Email Collection - How It Works

### Stripe Automatically Collects Email!
- When customer clicks "Buy the Ebook" → Goes to Stripe checkout
- Stripe checkout **requires email** (it's mandatory)
- After payment, Stripe sends webhook with:
  - `session.customer_details.email` ← **This is the buyer's email**
  - `session.customer_details.name` ← Customer name (if provided)

**You don't need to do anything!** Stripe handles email collection automatically.

---

## ⏰ 48-Hour Validity - Where to Mention It

### Already Included:
✅ **In the email** - Already mentions "valid for 48 hours"

### Optional: Add to Confirmation Page
You can add this to `/ebook/thank-you/page.tsx` or create a note on the Stripe checkout page.

**Option 1: Add to Thank You Page**
```tsx
<p className="text-xs text-white/50 mt-4">
  ⏰ Your download link is valid for 48 hours. Please save the file to your device.
</p>
```

**Option 2: Add to Stripe Payment Link Description**
- Go to Stripe Dashboard → Payment Links
- Edit your ebook link
- Add to description: "Download link valid for 48 hours"

---

## 🧪 Testing the Flow

### Test Mode:
1. Use Stripe test mode
2. Use test card: `4242 4242 4242 4242`
3. Complete checkout
4. Check:
   - ✅ Webhook received (check Vercel logs)
   - ✅ Email sent (check Resend dashboard)
   - ✅ Download link works

### Production:
1. Make a real purchase
2. Check email inbox
3. Click download link
4. Verify PDF downloads with watermark

---

## 🔍 Troubleshooting

### Email Not Sending?
1. Check Resend API key is correct
2. Check Resend dashboard for errors
3. Check Vercel logs: `/api/send-ebook`
4. Verify domain is verified in Resend (if using custom domain)

### Webhook Not Triggering?
1. Check Stripe webhook is configured correctly
2. Verify webhook URL: `https://www.theorangecode.com/api/webhooks/stripe`
3. Check webhook secret matches in environment variables
4. Check Stripe dashboard → Webhooks → Recent events

### Download Link Not Working?
1. Check token is valid (48 hours)
2. Check `/api/download` route logs
3. Verify PDF file exists: `protected/uk-uae-guide-flattened.pdf`
4. Verify Lato font exists: `fonts/Lato-Regular.ttf`

---

## 📋 Checklist

- [ ] Signed up for Resend account
- [ ] Got Resend API key
- [ ] Added `RESEND_API_KEY` to Vercel environment variables
- [ ] Configured Stripe webhook endpoint
- [ ] Added `STRIPE_WEBHOOK_SECRET` to Vercel
- [ ] Added metadata to Stripe payment link (`productName: "UK to UAE Ebook"`)
- [ ] Added `DOWNLOAD_TOKEN_SECRET` to Vercel
- [ ] Verified `NEXT_PUBLIC_BASE_URL` is set
- [ ] Tested with Stripe test mode
- [ ] Verified email received after test purchase
- [ ] Verified download link works

---

## 🎯 Summary

**What's Automatic:**
- ✅ Email collection (Stripe does this)
- ✅ Email sending (Webhook triggers Resend)
- ✅ Token generation (Webhook creates JWT)
- ✅ PDF watermarking (API route adds email to PDF)

**What You Need to Set Up:**
1. Resend account + API key
2. Stripe webhook configuration
3. Environment variables
4. Metadata on Stripe payment link

**No Manual Work Required After Setup!** 🎉

