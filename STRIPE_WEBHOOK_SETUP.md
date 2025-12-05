# 🔗 Stripe Webhook Setup - Required!

## ⚠️ Yes, You Need to Configure This!

The webhook is **essential** for the ebook download system to work. Without it, emails won't be sent automatically after payment.

---

## 📋 Step-by-Step Setup

### Step 1: Go to Stripe Webhooks Dashboard

1. **Log into Stripe Dashboard**
   - Go to: https://dashboard.stripe.com/webhooks
   - Or: Dashboard → Developers → Webhooks

### Step 2: Add Webhook Endpoint

1. **Click "Add endpoint"** (or "Add webhook endpoint")

2. **Endpoint URL:**
   ```
   https://www.theorangecode.com/api/webhooks/stripe
   ```
   ⚠️ **Important:** Use `www.theorangecode.com` (with www) or `theorangecode.com` (without www) - whichever matches your actual domain

3. **Description (optional):**
   ```
   Ebook download automation and payment tracking
   ```

### Step 3: Select Events to Listen For

**Select this event:**
- ✅ `checkout.session.completed`

**How to select:**
- Click "Select events"
- Search for "checkout.session.completed"
- Check the box
- Click "Add events"

**Optional (for better tracking):**
- `payment_intent.succeeded` (if you want to track all payments)
- `payment_intent.payment_failed` (if you want to track failures)

**For ebook downloads, you only NEED:**
- ✅ `checkout.session.completed` ← **This is the critical one!**

### Step 4: Create the Webhook

1. Click **"Add endpoint"** or **"Create endpoint"**

2. **Stripe will test the endpoint:**
   - It will send a test event
   - If your site is live, it should respond with 200 OK
   - If it fails, check that your site is deployed

### Step 5: Get the Webhook Secret

1. **After creating, click on the webhook** you just created

2. **Find "Signing secret"** section

3. **Click "Reveal"** or **"Click to reveal"**

4. **Copy the secret** (starts with `whsec_...`)
   - Example: `whsec_1234567890abcdef...`

5. **Add to Vercel Environment Variables:**
   - Go to Vercel → Your Project → Settings → Environment Variables
   - Add:
     - **Name:** `STRIPE_WEBHOOK_SECRET`
     - **Value:** `whsec_...` (paste the secret you copied)
   - **Environment:** All Environments (Production, Preview, Development)
   - Click **Save**

6. **Redeploy** your site on Vercel

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Webhook endpoint created in Stripe
- [ ] Endpoint URL is correct: `https://www.theorangecode.com/api/webhooks/stripe`
- [ ] Event `checkout.session.completed` is selected
- [ ] Webhook secret copied (starts with `whsec_`)
- [ ] `STRIPE_WEBHOOK_SECRET` added to Vercel environment variables
- [ ] Site redeployed after adding secret

---

## 🧪 Testing the Webhook

### Test Mode (Recommended First):

1. **Make sure you're in Stripe Test Mode**
   - Toggle in Stripe Dashboard (top right)

2. **Make a test purchase:**
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Complete checkout

3. **Check Webhook Status:**
   - Go to Stripe Dashboard → Webhooks
   - Click on your webhook
   - Go to "Recent events" tab
   - You should see `checkout.session.completed` event
   - Status should be "Succeeded" (green checkmark)

4. **Check Vercel Logs:**
   - Go to Vercel Dashboard → Your Project → Logs
   - Look for webhook logs
   - Should see: "✅ Ebook sent successfully to: [email]"

5. **Check Email:**
   - Check the test email inbox
   - Should receive email with download link

### If Webhook Fails:

**Common Issues:**
- ❌ **404 Not Found:** Endpoint URL is wrong
- ❌ **401 Unauthorized:** `STRIPE_WEBHOOK_SECRET` is wrong or missing
- ❌ **500 Server Error:** Check Vercel logs for specific error

**How to Debug:**
1. Check Stripe webhook logs (Dashboard → Webhooks → Your webhook → Recent events)
2. Check Vercel function logs (Dashboard → Your project → Logs)
3. Verify environment variables are set correctly
4. Make sure site is deployed and live

---

## 🎯 What Happens When Webhook Works:

1. ✅ Customer completes payment
2. ✅ Stripe sends `checkout.session.completed` event
3. ✅ Your webhook receives it at `/api/webhooks/stripe`
4. ✅ Webhook verifies signature (security)
5. ✅ Webhook detects `type: ebook` in metadata
6. ✅ Generates download token
7. ✅ Sends email via Resend
8. ✅ Customer receives email with download link

**All automatic!** 🎉

---

## 📝 Quick Reference

**Webhook URL:**
```
https://www.theorangecode.com/api/webhooks/stripe
```

**Required Event:**
```
checkout.session.completed
```

**Environment Variable:**
```
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Test Card:**
```
4242 4242 4242 4242
```

---

## ⚠️ Important Notes

1. **Use Production URL:** Make sure the webhook URL matches your actual live domain
2. **Test Mode vs Live Mode:** You can have separate webhooks for test and live mode
3. **Webhook Secret:** Keep this secret! Never commit it to Git
4. **Redeploy:** Always redeploy after adding `STRIPE_WEBHOOK_SECRET`

---

## 🚀 You're Done!

Once the webhook is configured and tested, the entire ebook download system will work automatically for every purchase!

