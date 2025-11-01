# Stripe Payment Integration Setup Guide

## What's Been Set Up

✅ Stripe checkout integration is complete and ready to use. The "Enroll Now" button will redirect users to Stripe's secure checkout page.

## What You Need to Do

### 1. Create a Stripe Account
1. Go to [https://stripe.com](https://stripe.com)
2. Sign up for an account (free to create)
3. Complete the account setup

### 2. Get Your API Keys

#### For Testing (Development):
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Find your **Test Mode** API keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

#### For Production (Live Site):
1. Switch to **Live Mode** in Stripe Dashboard
2. Get your **Live Mode** API keys:
   - **Publishable key** (starts with `pk_live_`)
   - **Secret key** (starts with `sk_live_`)

### 3. Add Environment Variables to Vercel

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add these variables:

   ```
   STRIPE_SECRET_KEY=sk_test_your_test_secret_key_here
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_publishable_key_here
   NEXT_PUBLIC_BASE_URL=https://www.theorangecode.com
   ```

   **For Production**, use your live keys:
   ```
   STRIPE_SECRET_KEY=sk_live_your_live_secret_key_here
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key_here
   NEXT_PUBLIC_BASE_URL=https://www.theorangecode.com
   ```

### 4. Local Development Setup

Create a `.env.local` file in the root of your project:

```env
STRIPE_SECRET_KEY=sk_test_your_test_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_publishable_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**⚠️ Important:** Never commit `.env.local` to Git! It's already in `.gitignore`.

### 5. Test the Integration

1. Use Stripe test card numbers:
   - **Success:** `4242 4242 4242 4242`
   - **Decline:** `4000 0000 0000 0002`
   - Use any future expiry date (e.g., 12/34)
   - Use any 3-digit CVC
   - Use any postal code

2. Click "Enroll Now" on your site
3. Complete checkout with test card
4. Verify you're redirected to the success page

### 6. Configure Webhooks (Optional but Recommended)

Webhooks notify your server when payments succeed or fail:

1. Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Endpoint URL: `https://www.theorangecode.com/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Add webhook signing secret to environment variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

## Pricing Details

- **Price:** 999 AED (99900 fils - smallest currency unit)
- **Currency:** AED (United Arab Emirates Dirham)
- **Limited:** First 30 registrations only

## Success & Cancel URLs

- **Success URL:** `https://www.theorangecode.com/success`
- **Cancel URL:** `https://www.theorangecode.com/`

These are configured automatically based on your `NEXT_PUBLIC_BASE_URL`.

## Next Steps

1. ✅ Add your Stripe API keys to Vercel environment variables
2. ✅ Test the checkout flow with test cards
3. ✅ When ready, switch to live keys
4. ✅ Monitor payments in Stripe Dashboard
5. ⚠️ Set up webhooks for production (recommended)

## Support

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)
- Your implementation is ready to use once API keys are configured!

