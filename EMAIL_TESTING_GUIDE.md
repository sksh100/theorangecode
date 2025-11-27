# 📧 Email System Testing Guide

## Current Issues (Before Fix)
1. ❌ Subscribers not appearing in MailerLite
2. ❌ Emails not arriving at `hello@theorangecode.com`
3. ❌ Verification codes not received

## Root Causes Found
1. **Resend "Enable Receiving"** is ON → Intercepting emails meant for Google Workspace
2. **MX Record Conflict:** Resend (Priority 0) vs Google Workspace (Priority 1+)
3. **MailerLite API:** Insufficient logging to debug failures

## Fixes Applied

### Fix 1: Enhanced MailerLite Logging
- Added detailed API request/response logging
- Added authentication error detection
- Added group membership verification
- Better error messages for debugging

### Fix 2: DNS Configuration (YOU MUST DO THIS MANUALLY)
- Remove Resend receiving MX record (Priority 0)
- Disable "Enable Receiving" in Resend dashboard
- Keep only Google Workspace MX records

### Fix 3: Contact Form Email Routing
- Changed FROM: `contact@theorangecode.com` (not hello@)
- Changed TO: `sksh.ae100@gmail.com` (direct delivery)
- Kept reply-to for customer responses

---

## Testing Checklist

### 🔧 Before Testing: Apply DNS Fix

1. **Disable Resend Receiving:**
   - Go to https://resend.com/domains/theorangecode.com
   - Find "Enable Receiving" toggle
   - Turn it **OFF**

2. **Remove MX Record in Vercel:**
   - Go to https://vercel.com/the-orange-codes-projects/~/domains/theorangecode.com
   - Find MX record: `inbound-smtp.ap-northeast-1.amazonaws.com` (Priority 0)
   - Delete it

3. **Wait 15 minutes** for DNS propagation

---

### ✅ Test 1: MailerLite Subscriber Addition

**Test Newsletter Subscription:**

1. Go to https://theorangecode.com
2. Scroll to footer
3. Enter test email in newsletter field
4. Click "Subscribe"
5. **Expected:** Success message appears

**Verify in MailerLite:**

1. Go to https://dashboard.mailerlite.com/subscribers
2. Look for your test email
3. **Expected:** Subscriber appears with status "Active"
4. Check the subscriber's group membership
5. **Expected:** Should be in the group you configured

**Check Logs (Vercel):**

1. Go to https://vercel.com/the-orange-codes-projects
2. Click on latest deployment
3. Go to "Functions" tab
4. Click "submit-form"
5. **Look for:**
   ```
   📧 MailerLite config check
   📝 Adding subscriber to MailerLite
   🔄 Calling MailerLite API
   ✅ Subscriber added to MailerLite successfully
   🔍 MailerLite Group Check
   ```

**If it fails:**
- Check for `❌ MailerLite error`
- Check for `🔐 MailerLite Authentication Error`
- Verify `MAILERLITE_API_KEY` is correct
- Verify `MAILERLITE_GROUP_ID` is correct

---

### ✅ Test 2: Contact Form Emails

**Submit Contact Form:**

1. Go to https://theorangecode.com/contact
2. Fill out the form:
   - Name: Your Name
   - Email: your-test-email@gmail.com
   - Phone: +971 50 123 4567
   - Subject: Test Contact Form
   - Message: This is a test message
3. Click "Send Message"
4. **Expected:** Success message appears

**Verify Email Received:**

1. Check `sksh.ae100@gmail.com` inbox
2. **Expected:** Email arrives within 1-2 minutes
3. Check subject: "New contact form message: Test Contact Form"
4. **Reply-to should be:** your-test-email@gmail.com

**Check Resend Logs:**

1. Go to https://resend.com/emails
2. **Expected:** New entry with status "200" (delivered)
3. Click on the email to see details
4. **Expected:** No errors or bounces

**If email doesn't arrive:**
- Check spam folder in Gmail
- Check Resend logs for errors
- Verify `RESEND_API_KEY` is set correctly
- Check if Resend domain verification is complete

---

### ✅ Test 3: Direct Email to hello@theorangecode.com

**Send Test Email:**

1. From your personal email (Gmail, Outlook, etc.)
2. Send email TO: `hello@theorangecode.com`
3. Subject: "Test Email Delivery"
4. Body: "Testing if emails are received"

**Verify Received:**

1. Log in to Google Workspace admin: https://admin.google.com
2. Go to "Users"
3. Click on `hello@theorangecode.com`
4. Check if email forwarding is configured
5. **If forwarded:** Check `sksh.ae100@gmail.com` inbox
6. **If not forwarded:** Log in to `hello@theorangecode.com` inbox directly

**Expected:** Email arrives within 1-2 minutes

**If email doesn't arrive:**
- Wait 15 minutes (DNS propagation)
- Check spam folder
- Verify MX records are correct:
  ```bash
  nslookup -type=MX theorangecode.com
  ```
- Expected output should show ONLY Google Workspace MX records
- No Resend `inbound-smtp.ap-northeast-1.amazonaws.com` should appear

---

### ✅ Test 4: Verification Code Emails

**Trigger Verification Code:**

1. Go to your application's password reset page
2. Enter: `hello@theorangecode.com`
3. Request password reset code
4. **Expected:** "Email sent" message appears

**Verify Code Received:**

1. Check `hello@theorangecode.com` inbox (or forwarded inbox)
2. **Expected:** Email with verification code arrives
3. Subject should contain "Password Reset" or similar

**If code doesn't arrive:**
- Check which service sends verification codes (Resend?)
- Check Resend logs
- Verify email isn't blocked by spam filters
- Check Google Workspace routing rules

---

## Debugging Commands

### Check MX Records (After DNS Fix)
```bash
nslookup -type=MX theorangecode.com
```

**Expected Output (After Fix):**
```
theorangecode.com   mail exchanger = 1 aspmx.l.google.com.
theorangecode.com   mail exchanger = 5 alt1.aspmx.l.google.com.
theorangecode.com   mail exchanger = 5 alt2.aspmx.l.google.com.
theorangecode.com   mail exchanger = 10 alt3.aspmx.l.google.com.
theorangecode.com   mail exchanger = 10 alt4.aspmx.l.google.com.
```

**Should NOT appear:**
```
theorangecode.com   mail exchanger = 0 inbound-smtp.ap-northeast-1.amazonaws.com.  ❌
```

### Check SPF Record
```bash
nslookup -type=TXT theorangecode.com | grep spf
```

**Expected:**
```
v=spf1 include:_spf.google.com include:spf.resend.com ~all
```

### Test Email Delivery
```bash
# Install mailutils if needed
echo "Test email body" | mail -s "Test Subject" hello@theorangecode.com
```

---

## Success Criteria

✅ **MailerLite:**
- Subscribers appear in dashboard within 30 seconds
- Group membership is correct
- Welcome automation triggers (if configured)

✅ **Contact Form:**
- Emails arrive at `sksh.ae100@gmail.com` within 1-2 minutes
- Reply-to address is the form submitter
- No errors in Resend logs

✅ **Direct Email:**
- Emails to `hello@theorangecode.com` arrive
- No emails go to Resend
- All routing through Google Workspace

✅ **Verification Codes:**
- Codes arrive within 1-2 minutes
- Not blocked by spam filters
- Properly formatted and functional

---

## Common Issues & Solutions

### Issue: "MailerLite Authentication Error"
**Solution:**
1. Go to https://dashboard.mailerlite.com/integrations/api
2. Generate a new API key
3. Update `MAILERLITE_API_KEY` in Vercel environment variables
4. Redeploy the application

### Issue: "Subscriber added but not in group"
**Solution:**
1. Check `MAILERLITE_GROUP_ID` is correct
2. Go to https://dashboard.mailerlite.com/subscribers/groups
3. Copy the correct group ID from the URL
4. Update in Vercel and redeploy

### Issue: "Emails still not arriving after 15 minutes"
**Solution:**
1. Verify DNS changes propagated:
   ```bash
   nslookup -type=MX theorangecode.com
   ```
2. Clear DNS cache:
   ```bash
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   ```
3. Check Google Workspace user status
4. Verify email forwarding rules

### Issue: "Resend shows 200 but email not received"
**Solution:**
1. Check spam folder thoroughly
2. Check Google Workspace quarantine
3. Verify SPF/DKIM/DMARC alignment
4. Check Google Workspace routing rules

---

## Monitoring

### Daily Checks:
1. **Resend Dashboard:** https://resend.com/emails
   - Check for bounces or failures
   - Monitor delivery rate

2. **MailerLite Dashboard:** https://dashboard.mailerlite.com/subscribers
   - Check subscriber growth
   - Monitor automation triggers

3. **Google Workspace Admin:** https://admin.google.com
   - Check email traffic
   - Monitor for spam or bounces

### Weekly Checks:
1. Test newsletter subscription
2. Test contact form
3. Verify email deliverability
4. Check DNS record integrity

---

## Emergency Contacts

**If email system completely breaks:**
1. Check Vercel deployment logs
2. Check Resend status page: https://resend.com/status
3. Check Google Workspace status: https://www.google.com/appsstatus
4. Check MailerLite status: https://status.mailerlite.com/

**Fallback Email:**
- Always have `sksh.ae100@gmail.com` as backup
- Consider adding `+theorangecode` alias for filtering

---

## Post-Fix Verification

After applying all fixes and testing:

1. ✅ MailerLite subscribers appearing?
2. ✅ Contact form emails arriving?
3. ✅ Direct emails to hello@ arriving?
4. ✅ Verification codes arriving?
5. ✅ No Resend MX record in DNS?
6. ✅ Google Workspace receiving all mail?

**If all ✅ → System is working correctly!**

