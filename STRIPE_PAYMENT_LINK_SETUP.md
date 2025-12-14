# Stripe Payment Link Setup for Beyond Formalities

## Important: Configure Metadata for Automatic Email Delivery

To ensure customers automatically receive their ebook via email after purchase, you need to configure your Stripe Payment Link with metadata.

## Steps to Configure Stripe Payment Link

### 1. Go to Stripe Dashboard
1. Log in to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Products** → **Payment Links**
3. Find your "Beyond Formalities" payment link (or create a new one)

### 2. Edit Payment Link Settings
1. Click on your payment link
2. Click **Settings** or **Edit**
3. Scroll down to **Metadata** section

### 3. Add Required Metadata
Add these metadata fields:

```
Key: productName
Value: Beyond Formalities

Key: ebookType
Value: beyond-formalities

Key: type
Value: ebook
```

**OR** add a single metadata field:

```
Key: ebookType
Value: beyond-formalities
```

### 4. Save Changes
Click **Save** to update your payment link

## Why This Matters

Without metadata, the webhook might not detect the purchase as an ebook and won't automatically send the email. With metadata configured:

✅ Webhook automatically detects ebook purchase
✅ Email is sent immediately after payment
✅ Download token is generated
✅ Customer receives personalized PDF

## Testing

After configuring metadata:

1. Make a test purchase using Stripe test mode
2. Check webhook logs in Stripe Dashboard
3. Verify email is sent to customer
4. Check server logs for "✅ Ebook sent successfully"

## Current Payment Link

Your current payment link: `https://buy.stripe.com/eVqbJ1ctw66t9qz7pC8k806`

Make sure this link has the metadata configured as described above.

## Alternative: Use Checkout Session API

If you prefer more control, you can switch from Payment Links to Checkout Sessions API, which allows you to set metadata programmatically. However, Payment Links with metadata work perfectly fine.

---

**Note:** The webhook will still attempt to detect ebook purchases even without metadata by checking:
- Webhook secret used (ebook secret vs masterclass secret)
- Product name in metadata
- Amount (149 AED for Beyond Formalities)

But adding metadata ensures 100% reliable detection.

