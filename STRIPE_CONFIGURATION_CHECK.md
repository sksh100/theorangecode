# ✅ Stripe Configuration Check

## 🔍 Environment Variables Status

### ✅ **Correctly Set (from your Vercel dashboard):**
- ✅ `RESEND_API_KEY` - Set (for sending emails)
- ✅ `STRIPE_SECRET_KEY` - Set (for Stripe API)
- ✅ `STRIPE_WEBHOOK_SECRET` - Set (for webhook verification)
- ✅ `NEXT_PUBLIC_DOMAIN` - Set (alternative to NEXT_PUBLIC_BASE_URL)
- ✅ `MAILERLITE_API_KEY` - Set

### ⚠️ **Missing or Needs Verification:**
- ❓ `DOWNLOAD_TOKEN_SECRET` - **NOT VISIBLE** in your screenshots
  - **Action Required:** Add this to Vercel
  - **Value:** `6a90d1eb6df5774f7c0597c3dcd1279837e6daf36df71d08d0567f777c01be87ac4bda3309f3d26a6e304e919624f67294a25687cce023b33771c239e8b9a97b`
  
- ❓ `NEXT_PUBLIC_BASE_URL` - **NOT VISIBLE** (but `NEXT_PUBLIC_DOMAIN` is set)
  - **Status:** Code uses both, so `NEXT_PUBLIC_DOMAIN` should work
  - **Recommended:** Set `NEXT_PUBLIC_BASE_URL=https://www.theorangecode.com` for consistency

---

## ✅ Stripe Redirect Configuration - CORRECT!

From your Stripe payment link settings:
- ✅ **"Don't show confirmation page"** is selected
- ✅ **Redirect URL:** `https://theorangecode.com/ebook/thank-you`
- ✅ This means customers will be redirected to your site after payment (not Stripe's confirmation page)

**This is perfect!** ✅

---

## ⚠️ Stripe Metadata - NEEDS FIX!

### Current Metadata in Stripe:
```
product_type: ebook
delivery: instant_download
format: pdf
download_url: https://theorangecode.com/files/uk-to-uae-relocation-guide.pdf
... (other fields)
```

### What the Webhook Code Checks For:
```javascript
const productName = session.metadata?.productName || session.metadata?.product || ""
const isEbookPurchase = productName.toLowerCase().includes('ebook') || 
                        productName.toLowerCase().includes('uk to uae') ||
                        session.metadata?.type === 'ebook'
```

### ❌ **PROBLEM:**
The webhook checks for:
1. `metadata.productName` containing "ebook" - **NOT SET**
2. `metadata.productName` containing "uk to uae" - **NOT SET**
3. `metadata.type === 'ebook'` - **NOT SET** (you have `product_type` instead)

### ✅ **SOLUTION:**
Add ONE of these metadata fields to your Stripe payment link:

**Option 1 (Recommended):**
- Key: `type`
- Value: `ebook`

**Option 2:**
- Key: `productName`
- Value: `UK to UAE Ebook`

**Option 3:**
- Key: `product`
- Value: `UK to UAE Ebook`

---

## 🔧 How to Fix Metadata in Stripe

1. **Go to Stripe Dashboard**
   - Navigate to: Products → Payment Links
   - Find your ebook payment link
   - Click to edit it

2. **Add Metadata**
   - Scroll to "Metadata" section
   - Click "Add metadata" or edit icon
   - Add:
     - **Key:** `type`
     - **Value:** `ebook`
   - **OR** add:
     - **Key:** `productName`
     - **Value:** `UK to UAE Ebook`

3. **Save Changes**
   - Click "Update link" or "Save"

---

## ✅ Complete Checklist

### Environment Variables:
- [ ] Add `DOWNLOAD_TOKEN_SECRET` to Vercel (if not already added)
- [ ] Verify `NEXT_PUBLIC_BASE_URL` is set (or confirm `NEXT_PUBLIC_DOMAIN` works)

### Stripe Configuration:
- [x] Redirect is set correctly ✅
- [ ] Add metadata: `type: ebook` OR `productName: UK to UAE Ebook` ⚠️

### Testing:
- [ ] Make a test purchase
- [ ] Verify webhook receives event
- [ ] Check email is sent
- [ ] Verify download link works

---

## 🎯 Summary

**What's Correct:**
- ✅ Stripe redirect configuration
- ✅ Most environment variables set
- ✅ Email service (Resend) configured

**What Needs Fixing:**
- ⚠️ Add `DOWNLOAD_TOKEN_SECRET` to Vercel (if missing)
- ⚠️ Add metadata `type: ebook` to Stripe payment link (CRITICAL!)

**Once you add the metadata, the webhook will automatically:**
1. Detect it's an ebook purchase
2. Generate download token
3. Send email with download link
4. Customer gets personalized PDF

