# 🚨 DNS FIX REQUIRED - Email Delivery Issue

## Problem
Emails to `hello@theorangecode.com` are not being received because **Resend's MX record** is intercepting them before they reach Google Workspace.

## Current DNS Configuration (WRONG)

### MX Records (Mail Exchange):
```
Priority 0: inbound-smtp.ap-northeast-1.amazonaws.com  ❌ REMOVE THIS
Priority 1: aspmx.l.google.com                         ✅ Keep
Priority 5: alt1.aspmx.l.google.com                    ✅ Keep
Priority 5: alt2.aspmx.l.google.com                    ✅ Keep
Priority 10: alt3.aspmx.l.google.com                   ✅ Keep
Priority 10: alt4.aspmx.l.google.com                   ✅ Keep
```

**Issue:** Resend (Priority 0) receives emails FIRST, not Google Workspace (Priority 1+)

---

## SOLUTION: Remove Resend Receiving MX Record

### Step 1: Disable in Resend Dashboard
1. Go to https://resend.com/domains/theorangecode.com
2. Find **"Enable Receiving"** section
3. **Toggle it OFF** (disable)
4. This will stop Resend from expecting incoming emails

### Step 2: Remove DNS Record in Vercel
1. Go to https://vercel.com/the-orange-codes-projects/~/domains/theorangecode.com
2. Find the MX record:
   - **Type:** MX
   - **Value:** `inbound-smtp.ap-northeast-1.amazonaws.com`
   - **Priority:** 0
3. Click the three-dot menu (...)
4. Click **"Delete"**
5. Confirm deletion

### Step 3: Verify Google Workspace MX Records (Should Remain)
Keep these MX records (for Google Workspace):
```
Priority 1:  aspmx.l.google.com
Priority 5:  alt1.aspmx.l.google.com
Priority 5:  alt2.aspmx.l.google.com
Priority 10: alt3.aspmx.l.google.com
Priority 10: alt4.aspmx.l.google.com
```

---

## Result After Fix
- ✅ All emails to `@theorangecode.com` → Google Workspace
- ✅ Resend can still SEND emails (SPF record allows it)
- ✅ MailerLite can still SEND newsletters (DKIM configured)
- ✅ No conflicts or interception

---

## DNS Propagation
- Changes take 5-15 minutes to propagate
- Test by sending an email to `hello@theorangecode.com`
- Check your Gmail inbox at `sksh.ae100@gmail.com` (if forwarded)

---

## Final DNS Configuration (Correct)

### For Email SENDING (Keep these):
- **SPF:** `v=spf1 include:_spf.google.com include:spf.resend.com ~all`
- **DKIM (Google):** `google._domainkey` → Google's key
- **DKIM (Resend):** `resend._domainkey` → Resend's key
- **DKIM (MailerLite):** `litesrv._domainkey` → MailerLite's CNAME
- **DMARC:** `v=DMARC1; p=quarantine; rua=mailto:hello@theorangecode.com`

### For Email RECEIVING (Keep only Google):
- **MX Priority 1:** `aspmx.l.google.com`
- **MX Priority 5:** `alt1.aspmx.l.google.com`, `alt2.aspmx.l.google.com`
- **MX Priority 10:** `alt3.aspmx.l.google.com`, `alt4.aspmx.l.google.com`

### Remove:
- ❌ MX Priority 0: `inbound-smtp.ap-northeast-1.amazonaws.com` (Resend receiving)
- ❌ MX Priority 10: `feedback-smtp.ap-northeast-1.amazonaws.com` (Resend feedback, not needed)

---

## Who Does What (After Fix)

| Service | Purpose | DNS Records |
|---------|---------|-------------|
| **Google Workspace** | Receive ALL emails | MX records (Priority 1, 5, 10) |
| **Resend** | Send transactional emails | SPF + DKIM (resend._domainkey) |
| **MailerLite** | Send newsletters | DKIM (litesrv._domainkey) |

---

## Test After Fix

1. **Send test email:**
   ```bash
   # From any email client, send to:
   hello@theorangecode.com
   ```

2. **Check these locations:**
   - Google Workspace inbox for `hello@theorangecode.com`
   - Gmail inbox for `sksh.ae100@gmail.com` (if forwarded)
   - **Spam folders** in both

3. **Verify in Resend Dashboard:**
   - Go to https://resend.com/emails
   - Check if emails are being **sent** (should show 200 status)

---

## Need Help?
If emails still don't arrive after 15 minutes:
1. Check Google Workspace routing rules
2. Verify `hello@theorangecode.com` user exists
3. Check if forwarding is set up correctly

