# MailerLite Integration Setup Guide

This guide will walk you through setting up MailerLite for subscriber management and automatic welcome emails.

## 📋 Overview

Your application is now configured to:
- ✅ Add subscribers to MailerLite instead of Google Sheets
- ✅ Automatically send welcome emails/newsletters when people subscribe
- ✅ Track subscriber information (name, email, phone, source)

## 🚀 Step 1: Create a MailerLite Account

1. Go to [mailerlite.com](https://www.mailerlite.com)
2. Sign up for a free account (supports up to 1,000 subscribers)
3. Complete the account setup

## 🔑 Step 2: Get Your API Key

1. Log in to your MailerLite dashboard
2. Go to **Integrations** → **Developers** → **API**
3. Click **Generate new token**
4. Copy your API key (you'll need this in the next step)

**Important:** Keep your API key secure and never share it publicly!

## 📁 Step 3: Create a Subscriber Group

1. In MailerLite dashboard, go to **Subscribers** → **Groups**
2. Click **Create new group**
3. Name it something like "Newsletter Subscribers" or "Website Subscribers"
4. Click **Create**
5. **Copy the Group ID** from the URL or group settings (you'll need this!)

**Example:** If your group URL is `https://dashboard.mailerlite.com/subscribers/groups/123456`, the Group ID is `123456`

## ⚙️ Step 4: Set Up Environment Variables

### Option A: Local Development (`.env.local`)

Create or update `.env.local` in your project root:

```bash
MAILERLITE_API_KEY=your_api_key_here
MAILERLITE_GROUP_ID=your_group_id_here
```

### Option B: Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these two variables:
   - **Name:** `MAILERLITE_API_KEY`
     **Value:** Your MailerLite API key
   - **Name:** `MAILERLITE_GROUP_ID`
     **Value:** Your MailerLite Group ID
4. Click **Save**
5. **Redeploy your application** for the changes to take effect

## 📧 Step 5: Set Up Automatic Welcome Email

This is the key feature that sends a newsletter automatically when someone subscribes!

### Method 1: Simple Welcome Email (Recommended)

1. In MailerLite dashboard, go to **Automation** → **Workflows**
2. Click **Create workflow**
3. Select **Simple welcome email** template
4. **Configure the trigger:**
   - Choose **"When subscriber joins a group"**
   - Select the group you created in Step 3
5. **Design your welcome email:**
   - Click on the email step
   - Enter a subject line (e.g., "Welcome to The Orange Code!")
   - Design your email content using the drag-and-drop editor
   - You can personalize it with subscriber fields like `{{name}}` or `{{email}}`
6. **Save and Activate** the workflow

### Method 2: Advanced Welcome Sequence

1. Create a new automation workflow
2. Set trigger: **"When subscriber joins a group"** → Select your group
3. Add email steps for a multi-email sequence:
   - Email 1: Welcome email (immediate)
   - Email 2: Introduction email (e.g., 2 days later)
   - Email 3: Value proposition (e.g., 5 days later)
4. Design each email with relevant content
5. Set delays between emails if needed
6. **Activate** the workflow

## 🧪 Step 6: Test the Integration

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test the subscription form:**
   - Go to your website
   - Fill out the subscription form (Interest Form or Footer Newsletter)
   - Submit the form

3. **Verify in MailerLite:**
   - Go to **Subscribers** in your MailerLite dashboard
   - You should see your test subscriber
   - Check that they're in the correct group

4. **Check the welcome email:**
   - Check the email inbox you used for testing
   - You should receive the welcome email automatically (may take a few minutes)

## 📊 What Data Gets Collected

When someone subscribes, the following information is sent to MailerLite:

- **Email** (required)
- **First Name** (if provided)
- **Last Name** (if provided)
- **Phone Number** (if provided)
- **Source** (tracks where the subscription came from, e.g., "Footer Newsletter Subscription" or "The Orange Code Coming Soon Page")

## 🔍 Troubleshooting

### Subscribers not appearing in MailerLite

1. **Check environment variables:**
   - Verify `MAILERLITE_API_KEY` is set correctly
   - Verify `MAILERLITE_GROUP_ID` is set correctly
   - For Vercel: Make sure you redeployed after adding variables

2. **Check server logs:**
   - Look for MailerLite-related error messages
   - Check Vercel function logs if deployed

3. **Verify API key:**
   - Make sure your API key is valid and active
   - Check if the API key has the correct permissions

### Welcome emails not sending

1. **Check automation status:**
   - Go to **Automation** → **Workflows** in MailerLite
   - Make sure your workflow is **Active** (not draft)
   - Verify the trigger is set to the correct group

2. **Check subscriber status:**
   - Subscribers must be "active" status to receive emails
   - Verify the subscriber is in the correct group

3. **Check email spam folder:**
   - Welcome emails might be filtered to spam
   - Check spam/junk folder

4. **Verify group assignment:**
   - Check that subscribers are being added to the group
   - Look at subscriber details in MailerLite to see group membership

### API Errors

If you see errors like "401 Unauthorized" or "403 Forbidden":
- Verify your API key is correct
- Check that your MailerLite account is active
- Ensure you haven't exceeded API rate limits

## 📝 Next Steps

1. **Customize your welcome email:**
   - Make it personal and engaging
   - Include your branding
   - Add clear call-to-actions

2. **Set up additional automations:**
   - Drip campaigns
   - Re-engagement emails
   - Special offers for subscribers

3. **Monitor subscriber growth:**
   - Check MailerLite dashboard regularly
   - Review subscriber engagement metrics
   - Optimize your email content based on performance

## 🎉 You're All Set!

Your MailerLite integration is now complete! New subscribers will:
- ✅ Be automatically added to MailerLite
- ✅ Receive welcome emails/newsletters automatically
- ✅ Be organized in your subscriber group
- ✅ Have their information tracked for future campaigns

## 📚 Additional Resources

- [MailerLite API Documentation](https://developers.mailerlite.com/docs)
- [MailerLite Automation Guide](https://www.mailerlite.com/help/how-to-create-an-automation-workflow)
- [MailerLite Support](https://www.mailerlite.com/support)

---

**Note:** The Google Sheets integration has been replaced with MailerLite. If you still need Google Sheets, you'll need to set up a separate integration or use MailerLite's export feature.
