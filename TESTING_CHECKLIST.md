# ✅ Email System Testing Checklist

## Test 1: MailerLite Newsletter Subscription

### Steps:
1. Go to https://theorangecode.com
2. Scroll to the footer
3. Enter a test email: `test+newsletter@yourdomain.com`
4. Click "Subscribe"
5. Wait for success message

### Verify:
1. Go to https://dashboard.mailerlite.com/subscribers
2. Look for your test email
3. **Expected:** Email appears within 30 seconds

### Check Logs (if fails):
1. Go to https://vercel.com/the-orange-codes-projects
2. Click latest deployment → Functions → submit-form
3. Look for:
   - `📧 MailerLite config check` - Shows if API key loaded
   - `🔄 Calling MailerLite API` - Shows request
   - `✅ Subscriber added` - Success!
   - `❌ MailerLite error` - Shows failure reason
   - `🔐 Authentication Error` - API key wrong

### Result: ☐ PASS ☐ FAIL

---

## Test 2: Contact Form Emails

### Steps:
1. Go to https://theorangecode.com/contact
2. Fill out form:
   - Name: Test User
   - Email: your-email@gmail.com
   - Phone: +971 50 123 4567
   - Subject: Test Contact Form
   - Message: Testing email delivery
3. Click "Send Message"
4. Wait for success message

### Verify:
1. Check `sksh.ae100@gmail.com` inbox
2. Check spam folder too
3. **Expected:** Email arrives in 1-2 minutes
4. Subject: "New contact form message: Test Contact Form"
5. Reply-to should be: your-email@gmail.com

### Check Resend Logs (if fails):
1. Go to https://resend.com/emails
2. Look for recent email
3. **Expected:** Status 200 (delivered)
4. Click to see details

### Result: ☐ PASS ☐ FAIL

---

## Test 3: Direct Email to hello@theorangecode.com

### Steps:
1. Open your personal email (Gmail, Outlook, etc.)
2. Send email TO: `hello@theorangecode.com`
3. Subject: "Test Email Delivery"
4. Body: "Testing if emails are received"

### Verify:
1. Check where hello@ forwards to:
   - Option A: Forwarded to `sksh.ae100@gmail.com`
   - Option B: Log in to `hello@theorangecode.com` directly
2. **Expected:** Email arrives in 1-2 minutes

### If not forwarding yet:
1. Go to https://admin.google.com
2. Click "Users"
3. Click `hello@theorangecode.com`
4. Set up email forwarding to `sksh.ae100@gmail.com`

### Result: ☐ PASS ☐ FAIL

---

## Test 4: Verification Code Emails

### Steps:
1. Trigger a verification code (password reset, etc.)
2. Check inbox where codes should arrive

### Verify:
1. **Expected:** Code arrives in 1-2 minutes
2. Not in spam folder
3. Code is readable and functional

### Result: ☐ PASS ☐ FAIL

---

## 📊 Overall Results

| Test | Status | Notes |
|------|--------|-------|
| MailerLite Subscription | ☐ PASS ☐ FAIL | |
| Contact Form | ☐ PASS ☐ FAIL | |
| Direct Email to hello@ | ☐ PASS ☐ FAIL | |
| Verification Codes | ☐ PASS ☐ FAIL | |

---

## ✅ Success Criteria

All tests should PASS:
- ✅ Newsletter subscriptions appear in MailerLite
- ✅ Contact form emails arrive at Gmail
- ✅ Direct emails to hello@ are received
- ✅ Verification codes arrive

If ALL PASS → **Email system is fully operational! 🎉**

---

## 🔧 Common Issues & Quick Fixes

### Issue: MailerLite shows "Authentication Error"
**Fix:**
1. Go to https://dashboard.mailerlite.com/integrations/api
2. Generate new API key
3. Update `MAILERLITE_API_KEY` in Vercel
4. Redeploy

### Issue: Subscriber not in group
**Fix:**
1. Go to https://dashboard.mailerlite.com/subscribers/groups
2. Get correct Group ID from URL
3. Update `MAILERLITE_GROUP_ID` in Vercel
4. Redeploy

### Issue: Emails still not arriving
**Fix:**
1. Wait full 15-30 minutes for DNS
2. Check spam folders
3. Verify Google Workspace user exists
4. Check email forwarding rules

### Issue: Resend shows 200 but no email
**Fix:**
1. Check spam thoroughly
2. Check Google Workspace quarantine
3. Verify forwarding is set up

---

## 🎯 Next Steps After Testing

If all tests pass:
1. ✅ Mark this issue as resolved
2. ✅ Monitor MailerLite dashboard for new subscribers
3. ✅ Check Resend logs occasionally for delivery issues
4. ✅ Enjoy your working email system! 🎉

If any tests fail:
1. Check the detailed guide: `EMAIL_TESTING_GUIDE.md`
2. Review Vercel logs for errors
3. Verify environment variables are correct
4. Check specific error messages in logs

