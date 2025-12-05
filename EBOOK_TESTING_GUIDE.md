# 🧪 Ebook Purchase System - Testing Guide

## 📋 Step-by-Step Testing Instructions

### Step 1: Switch to Stripe Test Mode

1. **Go to Stripe Dashboard**
   - https://dashboard.stripe.com
   - Look for the toggle in the top right
   - Switch from "Live mode" to **"Test mode"** (should show "Test mode" badge)

2. **Verify Test Mode**
   - URL should show "test" or you'll see "Test mode" indicator
   - Test mode uses different API keys (starts with `sk_test_`)

---

### Step 2: Get Your Test Payment Link

1. **In Stripe Dashboard (Test Mode)**
   - Go to: **Products** → **Payment Links**
   - Find your ebook payment link
   - Click on it to view details

2. **Copy the Payment Link URL**
   - Should look like: `https://buy.stripe.com/test_...` or similar
   - Or use the link from your website: `/uk-to-uae-relocation`

---

### Step 3: Make a Test Purchase

1. **Open the Payment Link**
   - In a new browser window/incognito
   - Go to your payment link or click "Buy the Ebook" on your site

2. **Fill in Test Details:**
   - **Email:** Use your real email (so you can test receiving the email)
   - **Name:** Any test name
   - **Card Number:** `4242 4242 4242 4242`
   - **Expiry Date:** Any future date (e.g., `12/34`)
   - **CVC:** Any 3 digits (e.g., `123`)
   - **ZIP/Postal Code:** Any valid code

3. **Complete Payment**
   - Click "Pay" or "Complete purchase"
   - Should redirect to your thank-you page

---

### Step 4: Verify Webhook Was Triggered

1. **Check Stripe Dashboard**
   - Go to: **Developers** → **Webhooks**
   - Click on: `uk-to-uae-ebook-download-webhook`
   - Click **"Event deliveries"** tab
   - You should see a new event: `checkout.session.completed`
   - Status should be **"Succeeded"** (green checkmark)

2. **Check Event Details**
   - Click on the event
   - Verify:
     - Event type: `checkout.session.completed`
     - Status: `Succeeded`
     - Response: Should show `200` status code

---

### Step 5: Check Vercel Logs

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard
   - Select your project
   - Go to **"Logs"** or **"Functions"** tab

2. **Look for Success Messages:**
   ```
   ✅ Webhook verified with ebook secret
   ✅ Ebook sent successfully to: [your-email]
   ```

3. **If You See Errors:**
   - Check the error message
   - Common issues:
     - Webhook secret mismatch
     - Missing environment variable
     - Email service error

---

### Step 6: Check Your Email

1. **Check Your Inbox**
   - Look for email from: `The Orange Code <hello@theorangecode.com>`
   - Subject: "Your UK to UAE Cultural Intelligence Guide - Instant Download"

2. **Verify Email Content:**
   - Should have download button
   - Should include download link: `https://www.theorangecode.com/download?token=...`
   - Should mention 48-hour validity

---

### Step 7: Test Download Link

1. **Click Download Button in Email**
   - Should open: `https://www.theorangecode.com/download?token=...`
   - Page should auto-download PDF

2. **Or Copy Link and Open in Browser**
   - Paste the download link in browser
   - Should trigger download automatically

3. **Verify PDF:**
   - PDF should download: `UK-to-UAE-Cultural-Intelligence-Guide.pdf`
   - Open the PDF
   - Check footer on every page
   - Should see: **"Purchased by: [your-test-email]"**
   - Watermark should be light grey (15% opacity)

---

## ✅ Success Checklist

After testing, you should see:

- [ ] ✅ Stripe webhook event shows "Succeeded"
- [ ] ✅ Vercel logs show "Webhook verified with ebook secret"
- [ ] ✅ Vercel logs show "Ebook sent successfully"
- [ ] ✅ Email received in inbox
- [ ] ✅ Download link works
- [ ] ✅ PDF downloads successfully
- [ ] ✅ PDF has watermark with your email

---

## 🐛 Troubleshooting

### Issue: Webhook Event Shows "Failed"

**Check:**
1. Webhook secret matches in Vercel
2. Endpoint URL is correct: `https://www.theorangecode.com/api/webhooks/stripe`
3. Site is deployed and live
4. Check Vercel logs for specific error

**Fix:**
- Verify `STRIPE_WEBHOOK_SECRET_UK_TO_UAE_EBOOK` in Vercel matches Stripe
- Redeploy site if needed

---

### Issue: No Email Received

**Check:**
1. `RESEND_API_KEY` is set correctly
2. Check spam/junk folder
3. Check Vercel logs for email errors
4. Verify email address in Stripe checkout

**Fix:**
- Check Resend dashboard for email status
- Verify Resend API key is valid
- Check email didn't go to spam

---

### Issue: Download Link Doesn't Work

**Check:**
1. Token is valid (48-hour expiry)
2. `DOWNLOAD_TOKEN_SECRET` is set correctly
3. PDF file exists: `protected/uk-uae-guide-flattened.pdf`
4. Font file exists: `fonts/Lato-Regular.ttf`

**Fix:**
- Check Vercel logs for specific error
- Verify files are deployed (not just local)
- Check token hasn't expired

---

### Issue: PDF Has No Watermark

**Check:**
1. Font file is accessible: `fonts/Lato-Regular.ttf`
2. PDF file is accessible: `protected/uk-uae-guide-flattened.pdf`
3. Check Vercel logs for PDF generation errors

**Fix:**
- Verify files are in correct locations
- Check file permissions
- Review Vercel function logs

---

## 🎯 Quick Test Summary

**Fastest Way to Test:**

1. **Stripe Test Mode** → Make purchase with `4242 4242 4242 4242`
2. **Check Stripe Webhooks** → Should see "Succeeded"
3. **Check Email** → Should receive download link
4. **Click Link** → PDF should download with watermark

**If all 4 steps work, you're good to go!** ✅

---

## 📝 Test Card Numbers

**Success:**
- `4242 4242 4242 4242` - Standard card

**Decline (for testing failures):**
- `4000 0000 0000 0002` - Card declined
- `4000 0000 0000 9995` - Insufficient funds

**Use any:**
- Future expiry date
- Any 3-digit CVC
- Any ZIP code

---

## 🚀 Ready to Test!

Follow the steps above, and you'll verify the entire system works end-to-end. If everything passes, you're ready for production! 🎉

