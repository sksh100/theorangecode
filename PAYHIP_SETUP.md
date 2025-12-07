# Payhip Webhook Integration Setup

This guide will help you set up Payhip webhooks to receive Slack notifications when someone purchases your ebook.

## Prerequisites

- Payhip account with an API key
- Slack webhook URL configured (already set up in your project)

## Step 1: Get Your Payhip API Key

1. Log in to your Payhip account
2. Go to **Account** → **Settings** → **Developer** tab
3. Copy your API key (it looks like: `f9e03755a8135778abef3366dcd438430278fbc3`)

## Step 2: Add Environment Variable

Add your Payhip API key to your Vercel environment variables:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name:** `PAYHIP_API_KEY`
   - **Value:** Your Payhip API key (from Step 1)
   - **Environment:** Production, Preview, Development (select all)
4. Click **Save**

## Step 3: Configure Payhip Webhook

1. Go to your Payhip account → **Account** → **Settings** → **Developer** tab
2. In the **Webhook Endpoint** field, enter:
   ```
   https://www.theorangecode.com/api/webhooks/payhip
   ```
   (Replace with your actual domain if different)

3. In **Select webhook events to listen for**, check:
   - ✅ **paid** — Occurs whenever a customer is charged
   - (Optional) **refunded** — Occurs whenever a payment is refunded

4. Click **Save settings**

## Step 4: Test the Integration

1. Make a test purchase on your Payhip store (or use Payhip's test mode if available)
2. Check your Slack channel for a notification
3. The notification should include:
   - Customer name and email
   - Purchase amount
   - Product name
   - Order ID
   - Links to view in Payhip and email the customer

## Troubleshooting

### Webhook Not Receiving Events

1. **Check Vercel logs:**
   - Go to your Vercel project → **Logs**
   - Look for Payhip webhook entries
   - Check for any error messages

2. **Verify webhook URL:**
   - Make sure the URL in Payhip is exactly: `https://www.theorangecode.com/api/webhooks/payhip`
   - Ensure it's using `https://` (not `http://`)

3. **Check environment variable:**
   - Verify `PAYHIP_API_KEY` is set in Vercel
   - Make sure it matches your Payhip API key exactly

4. **Test the endpoint:**
   - You can test if the endpoint is accessible by visiting:
     `https://www.theorangecode.com/api/webhooks/payhip`
   - It should return an error (since it expects a POST request), but this confirms the endpoint exists

### Slack Notifications Not Appearing

1. **Verify Slack webhook:**
   - Check that `SLACK_WEBHOOK_URL` is set in Vercel
   - Test Slack integration: Visit `/api/slack-test` to verify Slack is working

2. **Check webhook signature:**
   - If you see "Invalid signature" errors in logs, verify your `PAYHIP_API_KEY` is correct
   - Payhip uses HMAC SHA256 to sign webhooks

### Common Issues

- **"Payhip API key not configured"**: Add `PAYHIP_API_KEY` to Vercel environment variables
- **"Invalid signature"**: Double-check your API key matches exactly
- **"Missing sale data"**: Payhip may have changed their webhook format - check logs for the actual payload

## Webhook Event Format

Payhip sends webhooks in this format:

```json
{
  "event": "paid",
  "sale": {
    "id": "sale_id_here",
    "email": "customer@example.com",
    "name": "Customer Name",
    "price": "29.99",
    "currency": "USD",
    "product_name": "Your Ebook Name",
    "product_id": "product_id_here"
  }
}
```

## Security Notes

- The webhook endpoint verifies the signature using your Payhip API key
- Only webhooks with valid signatures are processed
- Invalid signatures are rejected with a 401 error
- All webhook events are logged for debugging

## Next Steps

Once set up, you'll automatically receive Slack notifications for:
- ✅ New ebook purchases
- ✅ Customer information
- ✅ Purchase amounts
- ✅ Order IDs

You can extend this integration to:
- Store purchases in a database
- Send automated emails to customers
- Update analytics dashboards
- Trigger other workflows

