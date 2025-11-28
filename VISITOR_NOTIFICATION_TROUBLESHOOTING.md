# Visitor Notification Troubleshooting Guide

## Issue: Not Receiving Slack Notifications for Visitors

If you're not receiving Slack notifications when visitors come to your site, follow these steps:

### Step 1: Check Configuration

Visit this diagnostic endpoint to check your setup:
```
https://www.theorangecode.com/api/visitor-tracking-status
```

This will show you:
- ✅/❌ Redis configuration status
- ✅/❌ Slack webhook configuration status
- Whether the current visitor will trigger a notification

### Step 2: Verify Environment Variables

Make sure these are set in **Vercel Dashboard → Settings → Environment Variables**:

1. **SLACK_WEBHOOK_URL** (Required)
   - Your Slack webhook URL
   - Format: `https://hooks.slack.com/services/...`

2. **KV_REST_API_URL** (Required for visitor tracking)
   - Your Vercel KV/Upstash Redis URL

3. **KV_REST_API_TOKEN** (Required for visitor tracking)
   - Your Vercel KV/Upstash Redis token

### Step 3: Test Slack Integration

Test if Slack notifications work:
```
https://www.theorangecode.com/api/slack-test
```

If this works, Slack is configured correctly.

### Step 4: Test Visitor Notification

Test visitor notification specifically:
```
https://www.theorangecode.com/api/test-visitor-notification
```

This will send a test visitor notification to Slack with your current IP and location.

### Step 5: Check Vercel Function Logs

1. Go to **Vercel Dashboard → Your Project → Functions**
2. Click on `/api/track-visitor`
3. Check the logs for:
   - `📊 Visitor tracked:` - Shows visitor information
   - `🔔 Notification decision:` - Shows if notification will be sent
   - `👤 NEW VISITOR - Sending Slack notification...` - Shows notification attempt
   - `✅✅✅ Visitor Slack notification SENT SUCCESSFULLY` - Confirms success
   - `❌❌❌ Slack notification FAILED:` - Shows errors

### Common Issues

#### Issue 1: Visitor Not "New"
**Problem:** Visitor was seen in the last 2 minutes, so no notification sent.

**Solution:** 
- Wait 2+ minutes and have them visit again
- OR set `FORCE_VISITOR_NOTIFICATIONS=true` in Vercel to always notify

#### Issue 2: Slack Webhook Not Configured
**Problem:** `SLACK_WEBHOOK_URL` is missing or incorrect.

**Solution:**
1. Create a Slack webhook: https://api.slack.com/messaging/webhooks
2. Add it to Vercel as `SLACK_WEBHOOK_URL`
3. Redeploy the site

#### Issue 3: Redis Not Configured
**Problem:** `KV_REST_API_URL` or `KV_REST_API_TOKEN` is missing.

**Solution:**
1. Go to Vercel Dashboard → Storage → KV
2. Create a KV database if you don't have one
3. Copy the `KV_REST_API_URL` and `KV_REST_API_TOKEN`
4. Add them to Environment Variables
5. Redeploy

#### Issue 4: Visitor Tracking Not Firing
**Problem:** The `VisitorTracker` component might not be loading.

**Solution:**
1. Check browser console for: `✅ Visitor tracked successfully`
2. Check Network tab for `/api/track-visitor` requests
3. Verify `VisitorTracker` is in `layout.tsx`

### Force Notifications (For Testing)

To always send notifications (bypass the 2-minute window):

1. Go to **Vercel Dashboard → Settings → Environment Variables**
2. Add: `FORCE_VISITOR_NOTIFICATIONS` = `true`
3. Redeploy

**⚠️ Warning:** This will send a notification for EVERY visitor, which can be spammy. Only use for testing!

### Expected Behavior

**Normal Flow:**
1. Visitor lands on site
2. `VisitorTracker` component fires
3. `/api/track-visitor` is called
4. System checks if visitor is "new" (not seen in last 2 minutes)
5. If new → Slack notification sent
6. If not new → Notification skipped (to avoid spam)

**Logs to Look For:**
```
📊 Visitor tracked: { ip, country, city, isNewVisitor: true, ... }
🔔 Notification decision: { shouldNotify: true, ... }
👤 NEW VISITOR - Sending Slack notification...
✅✅✅ Visitor Slack notification SENT SUCCESSFULLY
```

### Quick Diagnostic Checklist

- [ ] `SLACK_WEBHOOK_URL` is set in Vercel
- [ ] `KV_REST_API_URL` is set in Vercel
- [ ] `KV_REST_API_TOKEN` is set in Vercel
- [ ] `/api/slack-test` returns success
- [ ] `/api/visitor-tracking-status` shows all green checkmarks
- [ ] Vercel Function Logs show visitor tracking activity
- [ ] Visitor is truly "new" (not seen in last 2 minutes)

### Still Not Working?

1. **Check Vercel Logs:** Look for error messages in Function Logs
2. **Test Endpoints:** Use `/api/test-visitor-notification` to verify Slack works
3. **Check Slack:** Verify webhook is still active in Slack settings
4. **Force Notifications:** Temporarily set `FORCE_VISITOR_NOTIFICATIONS=true` to test

### Recent Improvements

- ✅ Reduced notification window from 5 minutes to 2 minutes
- ✅ Enhanced logging for better debugging
- ✅ Created diagnostic endpoint (`/api/visitor-tracking-status`)
- ✅ Improved error messages
- ✅ Better handling of Redis failures

