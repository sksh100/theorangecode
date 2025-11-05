# 🔐 Environment Variables Setup Guide

## Required Environment Variables for Vercel

Add these environment variables in your **Vercel Dashboard** → **Project Settings** → **Environment Variables**

---

## 📱 **Social Media OAuth (Content Planner)**

### **Instagram**
- `INSTAGRAM_APP_ID` - Your Instagram App ID (from Meta for Developers)
- `INSTAGRAM_APP_SECRET` - Your Instagram App Secret

**How to get:**
1. Go to https://developers.facebook.com/
2. Create a Meta App
3. Add Instagram Basic Display product
4. Get App ID and App Secret

### **LinkedIn**
- `LINKEDIN_CLIENT_ID` - Your LinkedIn Client ID
- `LINKEDIN_CLIENT_SECRET` - Your LinkedIn Client Secret

**How to get:**
1. Go to https://www.linkedin.com/developers/
2. Create a new app
3. Get Client ID and Client Secret

### **Pinterest**
- `PINTEREST_APP_ID` - Your Pinterest App ID
- `PINTEREST_APP_SECRET` - Your Pinterest App Secret

**How to get:**
1. Go to https://developers.pinterest.com/
2. Create a new app
3. Get App ID and App Secret

### **X (Twitter)**
- `TWITTER_CLIENT_ID` - Your Twitter Client ID
- `TWITTER_CLIENT_SECRET` - Your Twitter Client Secret

**How to get:**
1. Go to https://developer.twitter.com/
2. Create a new app
3. Get Client ID and Client Secret

---

## 💳 **Payment Processing (Stripe)**

- `STRIPE_SECRET_KEY` - Your Stripe Secret Key (sk_live_... or sk_test_...)
- `STRIPE_WEBHOOK_SECRET` - Your Stripe Webhook Secret (whsec_...)

**How to get:**
1. Go to https://dashboard.stripe.com/
2. Go to Developers → API keys
3. Copy Secret Key
4. Go to Developers → Webhooks
5. Create webhook endpoint: `https://theorangecode.com/api/webhooks/stripe`
6. Copy Webhook Signing Secret

---

## 📧 **Email Subscribers (MailerLite)**

- `MAILERLITE_API_KEY` - Your MailerLite API Key
- `MAILERLITE_GROUP_ID` - Your MailerLite Group ID (for automation)

**How to get:**
1. Go to https://dashboard.mailerlite.com/
2. Go to Integrations → Developers → API
3. Generate API Key
4. Go to Subscribers → Groups
5. Copy Group ID from URL

---

## 📱 **WhatsApp Notifications (Twilio)**

- `TWILIO_ACCOUNT_SID` - Your Twilio Account SID
- `TWILIO_AUTH_TOKEN` - Your Twilio Auth Token
- `TWILIO_WHATSAPP_NUMBER` - Twilio WhatsApp number (e.g., `whatsapp:+14155238886`)
- `WHATSAPP_TO_NUMBER` - Your WhatsApp number (e.g., `+971501234567`)

**How to get:**
1. Go to https://www.twilio.com/
2. Sign up for an account
3. Get Account SID and Auth Token from dashboard
4. Set up WhatsApp Sandbox or use Twilio WhatsApp number

---

## 🗄️ **Database (Vercel KV)**

- `KV_REST_API_URL` - Vercel KV REST API URL
- `KV_REST_API_TOKEN` - Vercel KV REST API Token

**How to get:**
1. In Vercel Dashboard, go to Storage
2. Create a new KV Database
3. Copy REST API URL and Token

---

## 🌐 **Base URL**

- `NEXT_PUBLIC_BASE_URL` - Your website URL (e.g., `https://theorangecode.com`)

**Note:** This is used for OAuth redirects and should match your production domain.

---

## 🔒 **Admin Dashboard**

- `ADMIN_PASSWORD` - Your admin dashboard password

**Note:** This is the password required to access `/admin`

---

## 🤖 **AI Features (Optional)**

- `OPENAI_API_KEY` - Your OpenAI API Key (for AI caption/hashtag generation)

**How to get:**
1. Go to https://platform.openai.com/
2. Create API key
3. Copy key

**Note:** If not set, the content planner will use template-based generation (still works, just less AI-powered)

---

## ✅ **Quick Setup Checklist**

### **Minimum Required (for Content Planner to work):**
- [ ] `INSTAGRAM_APP_ID`
- [ ] `INSTAGRAM_APP_SECRET`
- [ ] `NEXT_PUBLIC_BASE_URL`
- [ ] `KV_REST_API_URL`
- [ ] `KV_REST_API_TOKEN`
- [ ] `ADMIN_PASSWORD`

### **For Full Functionality:**
- [ ] Add all social media OAuth credentials (Instagram, LinkedIn, Pinterest, Twitter)
- [ ] Add Stripe credentials (for payments)
- [ ] Add MailerLite credentials (for subscribers)
- [ ] Add Twilio credentials (for WhatsApp notifications)
- [ ] Add OpenAI API key (for AI features)

---

## 📝 **How to Add in Vercel**

1. Go to https://vercel.com/dashboard
2. Select your project (`theorangecode`)
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter **Name** (e.g., `INSTAGRAM_APP_ID`)
6. Enter **Value** (your actual value)
7. Select **Environment** (Production, Preview, Development - or all)
8. Click **Save**
9. **Redeploy** your project for changes to take effect

---

## ⚠️ **Important Notes**

1. **OAuth Redirect URIs**: Make sure to add these redirect URIs in your social media app settings:
   - Instagram: `https://theorangecode.com/api/auth/instagram`
   - LinkedIn: `https://theorangecode.com/api/auth/linkedin`
   - Pinterest: `https://theorangecode.com/api/auth/pinterest`
   - Twitter: `https://theorangecode.com/api/auth/twitter`

2. **Redeploy After Adding Variables**: After adding environment variables, you must redeploy your project for them to take effect.

3. **Test Mode vs Live Mode**: For Stripe, you can use test keys (`sk_test_...`) for development and live keys (`sk_live_...`) for production.

---

## 🚀 **After Setup**

Once all environment variables are added:
1. Redeploy your project in Vercel
2. Go to `https://theorangecode.com/admin`
3. Click **Content Planner** tab
4. Click **Connect Account** for Instagram (and other platforms)
5. Authorize the connection
6. You should see ✅ **Connected** status

---

**Need help?** Check the Vercel logs or browser console for specific error messages.

