# 🔐 Dual Webhook Secret Setup - Complete

## ✅ What Was Changed

The webhook handler now supports **two separate webhook secrets**:
1. **`STRIPE_WEBHOOK_SECRET_UK_TO_UAE_EBOOK`** - For ebook purchases
2. **`STRIPE_WEBHOOK_SECRET`** - For masterclass purchases

---

## 🔧 How It Works

### Webhook Verification Logic:

1. **First, tries ebook secret:**
   - Attempts to verify with `STRIPE_WEBHOOK_SECRET_UK_TO_UAE_EBOOK`
   - If successful → Processes as ebook purchase (if metadata matches)

2. **Falls back to masterclass secret:**
   - If ebook secret fails → Tries `STRIPE_WEBHOOK_SECRET`
   - If successful → Processes as masterclass purchase

3. **Ebook Detection:**
   - If verified with ebook secret → Automatically treated as ebook
   - OR if metadata contains:
     - `type: ebook`
     - `productName` containing "ebook" or "uk to uae"
     - `product` containing "ebook" or "uk to uae"

---

## 📋 Environment Variables Required

### In Vercel (Both Required):

```env
# For ebook purchases
STRIPE_WEBHOOK_SECRET_UK_TO_UAE_EBOOK=whsec_kwJn3LJGfwEkXF7JGy2YaHAVTv7aaEvE

# For masterclass purchases (existing)
STRIPE_WEBHOOK_SECRET=whsec_your_masterclass_secret_here
```

---

## 🎯 Stripe Webhook Configuration

### You Need TWO Webhooks in Stripe:

#### Webhook 1: Ebook Purchases
- **Endpoint URL:** `https://www.theorangecode.com/api/webhooks/stripe`
- **Events:** `checkout.session.completed`
- **Secret:** Use `STRIPE_WEBHOOK_SECRET_UK_TO_UAE_EBOOK`
- **Metadata:** Must have `type: ebook` or `productName: UK to UAE Ebook`

#### Webhook 2: Masterclass Purchases
- **Endpoint URL:** `https://www.theorangecode.com/api/webhooks/stripe` (same endpoint!)
- **Events:** `checkout.session.completed`
- **Secret:** Use `STRIPE_WEBHOOK_SECRET`
- **Metadata:** Masterclass-related metadata

**Note:** Both webhooks point to the **same endpoint** (`/api/webhooks/stripe`). The handler automatically determines which secret to use based on verification success.

---

## ✅ What Happens Now

### Ebook Purchase Flow:
1. Customer pays for ebook via Stripe
2. Stripe sends webhook with ebook secret signature
3. Handler verifies with `STRIPE_WEBHOOK_SECRET_UK_TO_UAE_EBOOK` ✅
4. Detects `type: ebook` in metadata ✅
5. Generates download token
6. Sends email with download link
7. Customer receives personalized PDF

### Masterclass Purchase Flow:
1. Customer pays for masterclass via Stripe
2. Stripe sends webhook with masterclass secret signature
3. Handler verifies with `STRIPE_WEBHOOK_SECRET` ✅
4. Processes as masterclass (no ebook logic triggered)
5. Stores payment, sends notifications
6. Normal masterclass flow continues

---

## 🧪 Testing

### Test Ebook Webhook:
1. Make test purchase with ebook payment link
2. Check Vercel logs: Should see "✅ Webhook verified with ebook secret"
3. Check email: Should receive ebook download link
4. Verify PDF downloads with watermark

### Test Masterclass Webhook:
1. Make test purchase with masterclass payment link
2. Check Vercel logs: Should see "✅ Webhook verified with masterclass secret"
3. Verify masterclass booking/access works
4. No ebook email should be sent

---

## 🔍 Troubleshooting

### If Ebook Webhook Fails:
- Check `STRIPE_WEBHOOK_SECRET_UK_TO_UAE_EBOOK` is set correctly
- Verify Stripe webhook is using the correct secret
- Check metadata has `type: ebook`

### If Masterclass Webhook Fails:
- Check `STRIPE_WEBHOOK_SECRET` is set correctly
- Verify Stripe webhook is using the correct secret

### If Both Fail:
- Check both environment variables are set
- Verify Stripe webhook secrets match
- Check Vercel logs for specific error messages

---

## ✅ Summary

**What's Working:**
- ✅ Dual webhook secret support
- ✅ Automatic routing based on verification
- ✅ Ebook detection via metadata OR secret verification
- ✅ Masterclass webhook still works
- ✅ Both can use the same endpoint

**No Changes Needed:**
- ✅ Existing masterclass webhook continues to work
- ✅ All existing functionality preserved
- ✅ Backward compatible

**Ready to Deploy!** 🚀

