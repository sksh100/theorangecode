# 📚 Ebook Delivery Setup Instructions

## ✅ What's Been Implemented

1. **Automatic Ebook Delivery System**
   - API route: `/api/send-ebook`
   - Automatically sends PDF via email after Stripe payment
   - Beautiful HTML email template with download link

2. **Stripe Webhook Integration**
   - Automatically detects ebook purchases
   - Triggers email delivery immediately after payment
   - Sends Slack notification when ebook is delivered

3. **Conversion Optimization (Phase 1 & 2)**
   - ✅ Fixed payment links (direct to Stripe)
   - ✅ Money-back guarantee section
   - ✅ Sticky CTA bar
   - ✅ Social proof numbers
   - ✅ Exit-intent popup
   - ✅ Urgency/scarcity elements
   - ✅ Value stack section
   - ✅ Trust badges

## 🔧 Setup Steps

### 1. Create Stripe Payment Link

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/payment_links)
2. Click "Create payment link"
3. Set up:
   - **Product Name:** "UK to UAE Cultural Intelligence Ebook"
   - **Price:** 
     - For UK: £59 GBP
     - For others: AED 270 (or equivalent)
   - **Description:** "A practical cultural intelligence guide for British professionals relocating to the UAE"
4. Copy the payment link (starts with `https://buy.stripe.com/...`)

### 2. Add Payment Link to Environment Variables

Add to Vercel Environment Variables:
```
NEXT_PUBLIC_STRIPE_EBOOK_LINK=https://buy.stripe.com/YOUR_LINK_HERE
```

Or update directly in `src/app/uk-to-uae-relocation/page.tsx`:
```tsx
const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/YOUR_LINK_HERE'
```

### 3. Add Metadata to Stripe Payment Link

When creating the payment link, add metadata:
- **Key:** `productName` → **Value:** `UK to UAE Relocation Ebook`
- **Key:** `type` → **Value:** `ebook`

This helps the webhook identify ebook purchases.

### 4. Upload Your Ebook PDF

1. Create a folder: `public/ebooks/`
2. Upload your PDF as: `uk-to-uae-relocation-guide.pdf`
3. The full path should be: `public/ebooks/uk-to-uae-relocation-guide.pdf`

**Alternative:** If you want to host the PDF elsewhere (CDN, S3, etc.):
- Update the `ebookUrl` in `src/app/api/send-ebook/route.ts`
- Change line: `const ebookUrl = 'YOUR_CDN_URL_HERE'`

### 5. Configure Email Service (Resend)

The system uses Resend for email delivery. Make sure:
- `RESEND_API_KEY` is set in Vercel environment variables
- Email domain is verified in Resend dashboard
- Sender email is verified: `hello@theorangecode.com`

### 6. Test the Flow

1. **Test Payment:**
   - Use Stripe test mode
   - Complete a test purchase
   - Check webhook logs in Vercel

2. **Test Email Delivery:**
   - Check your email inbox
   - Verify PDF attachment or download link
   - Check Slack notification

3. **Test Exit Intent:**
   - Visit the page
   - Move mouse to top of browser (exit intent)
   - Popup should appear

## 📧 Email Template

The email includes:
- Professional HTML design
- Download link or PDF attachment
- What's inside the guide
- Support contact information
- Branding

## 🔔 Slack Notifications

You'll receive Slack notifications for:
- ✅ Payment received
- ✅ Ebook delivered successfully
- ⚠️ Delivery errors (if any)

## 🎯 Conversion Features Active

### Phase 1 (Implemented):
- ✅ Direct Stripe payment links
- ✅ 30-day money-back guarantee section
- ✅ Sticky CTA bar (appears after 300px scroll)
- ✅ Social proof: "500+ British professionals have used this guide"

### Phase 2 (Implemented):
- ✅ Exit-intent popup with 20% discount code
- ✅ Urgency badge: "Launch Price - Limited Time Offer"
- ✅ Price comparison: Shows original price (£79) crossed out
- ✅ Value stack: "What You Get" section
- ✅ Trust badges: Secure Payment, 30-Day Guarantee, Instant Access

## 🚀 Next Steps

1. **Create Stripe Payment Link** (see step 1 above)
2. **Add payment link to environment variables**
3. **Upload PDF to `public/ebooks/` folder**
4. **Test the complete flow**
5. **Monitor conversions and optimize**

## 📊 Tracking

All purchases are tracked:
- Payment stored in Redis
- Slack notifications sent
- Ebook delivery logged
- Conversion events tracked

## ⚠️ Important Notes

- The payment link must include metadata `productName: "UK to UAE Relocation Ebook"` for automatic delivery
- PDF must be accessible at the specified URL
- Resend API key must be configured
- Test in Stripe test mode first before going live

## 🆘 Troubleshooting

**Ebook not sending?**
- Check Stripe webhook logs
- Verify payment metadata includes `productName: "ebook"` or `type: "ebook"`
- Check Resend API key is configured
- Verify PDF file exists at the specified path

**Exit intent not working?**
- Clear browser session storage
- Check browser console for errors
- Ensure popup component is imported

**Sticky CTA not showing?**
- Scroll down 300px
- Check z-index conflicts
- Verify component is imported

---

**Status:** ✅ Ready for production after Stripe link and PDF upload

