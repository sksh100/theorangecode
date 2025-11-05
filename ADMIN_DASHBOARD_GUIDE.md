# 🎯 Complete Admin Dashboard Guide

## 🚀 Access Your Dashboard

**URL:** `https://theorangecode.com/admin`

**Password:** Set in Vercel environment variable `ADMIN_PASSWORD`

---

## 📊 **TAB 1: OVERVIEW**

### What You'll See:
- **Total Revenue** - All revenue from Stripe (AED)
- **Total Subscribers** - All MailerLite subscribers
- **Total Payments** - Count of successful payments
- **Today's Revenue** - Revenue for today (AED)

### Charts:
- **Revenue Trend (30 Days)** - Line chart showing daily revenue
- **Payment Distribution** - Pie chart (Today, This Month, Total)

### Features:
✅ Auto-refreshes every 30 seconds
✅ All data synchronized with Payments and Subscribers tabs

---

## 💳 **TAB 2: PAYMENTS**

### What You'll See:
- **Complete Payment List** showing:
  - Payment ID
  - Customer Name & Email
  - Amount & Currency (AED)
  - Status (Succeeded/Pending/Failed)
  - Date & Time

### Features:
✅ Shows ALL payments:
  - PaymentIntents (from Checkout)
  - Charges (from Payment Links)
  - Checkout Sessions (from Payment Links)
✅ Search by customer name, email, or payment ID
✅ Statistics cards at top
✅ Real-time data (auto-refreshes every 30 seconds)

### How to Use:
1. Click "Payments" tab
2. See all payments in table
3. Use search box to find specific payments
4. Click "Refresh" to manually update

---

## 👥 **TAB 3: SUBSCRIBERS**

### What You'll See:
- **Subscriber List** with:
  - Name & Email
  - Phone Number
  - **Subscription Timestamp** (Date & Time)
  - **Email Stats:**
    - Sent count
    - Opens count
    - Clicks count
  - **Welcome Email Status:**
    - ✅ Received
    - 👁️ Opened
    - 🔗 Clicked
    - ❌ Not Sent
  - Source (where they came from)

### Features:
✅ Shows email engagement metrics
✅ Welcome email tracking
✅ Timestamps (like MailerLite)
✅ Search by name or email
✅ Statistics cards at top

### How to Use:
1. Click "Subscribers" tab
2. See all subscribers with full stats
3. Use search to find specific subscribers
4. Click "Refresh" to update

---

## 📈 **TAB 4: ANALYTICS**

### What You'll See:
- **Revenue Analytics:**
  - 30-day revenue trend chart
  - Daily breakdown
- **Subscriber Growth:**
  - Total, today, monthly counts
- **Payment Trends:**
  - Payment distribution charts

### Features:
✅ Interactive charts
✅ 30-day trends
✅ All data synchronized with other tabs

---

## 🌍 **TAB 5: VISITORS** ⭐ NEW

### What You'll See:

#### **Statistics Cards:**
- Total Visitors
- Unique Visitors
- Active Now (currently browsing)
- Today's Visitors
- This Month's Visitors

#### **Active Visitors Right Now:**
See who's browsing your site RIGHT NOW:
- Location (City, Country)
- IP Address
- Current Page
- **Time on Page** (minutes & seconds)
- **Number of Clicks**
- **Scroll Depth** (percentage)
- **Last Click** (what they clicked)
- **Time Since Last Activity**

#### **Visualizations:**
- **Visitor Trend Chart** - 30-day visitor growth
- **Top Countries Chart** - Bar chart of visitor countries
- **World Map Visualization** - Country distribution with percentages
- **Top Pages** - Most viewed pages

#### **Recent Visitors Table:**
- Timestamp
- IP Address
- Location (City, Country)
- Page Visited
- Referrer Source

### Features:
✅ Real-time tracking (updates as people browse)
✅ See exactly who's on your site
✅ Track clicks, scroll, time on page
✅ Location tracking (city & country)
✅ World map showing visitor distribution

### How to Use:
1. Click "Visitors" tab
2. See active visitors in real-time
3. View visitor statistics
4. See world map of visitor distribution
5. Check recent visitors table

### To Test:
1. Open your website (`theorangecode.com`) in another tab
2. Browse around (click, scroll)
3. Go back to admin dashboard
4. Click "Refresh" in Visitors tab
5. You'll see yourself appear as a visitor!

---

## 📅 **TAB 6: CONTENT PLANNER** ⭐ NEW

### What You'll See:

#### **1. Brand Profile Section:**
- Configure your brand colors
- Set tone of voice
- Define target audience
- Set banned topics
- Add example posts

#### **2. Social Media Connections:**
Connect your accounts:
- **Instagram** - Click "Connect Account" → Redirects to Instagram OAuth
- **LinkedIn** - Click "Connect Account" → Redirects to LinkedIn OAuth
- **Pinterest** - Click "Connect Account" → Redirects to Pinterest OAuth
- **X (Twitter)** - Click "Connect Account" → Redirects to Twitter OAuth

Status shows: ✅ Connected or ⚪ Not connected

#### **3. Visual Feed Preview:**
- **Instagram 3x3 Grid** showing your upcoming feed
- Drag-and-drop to reorder
- Hover to see captions
- See how your feed will look

#### **4. Content Grid:**
All your posts with:
- Media preview
- Platform badges
- Caption preview
- Hashtags
- Status (draft/scheduled/published)
- Edit/Delete/Publish buttons

### How to Create a Post:

1. **Click "Create Post"** button

2. **Select Platforms:**
   - Click Instagram, LinkedIn, Pinterest, and/or X
   - Selected platforms turn blue

3. **Upload Media:**
   - Click "Choose File" to upload from phone/desktop
   - OR enter image URL
   - Image preview appears automatically
   - **Brand color analysis** runs automatically

4. **Generate Caption:**
   - Type your caption OR
   - Click **"AI Generate"** button
   - AI creates caption matching your brand voice
   - Caption appears in textarea

5. **Generate Hashtags:**
   - Type hashtags OR
   - Click **"AI Generate"** button
   - AI creates 15-20 relevant hashtags

6. **Add Alt Text:**
   - Describe the image for accessibility

7. **Schedule or Publish:**
   - Set date & time for scheduling
   - OR leave empty for immediate publish
   - Select status: Draft, Scheduled, or Published

8. **Click "Create Content"**

### How to Publish:

1. **Connect Social Media Accounts:**
   - Click "Connect Account" for each platform
   - Authorize on platform's website
   - Redirects back to dashboard
   - Status shows "Connected" ✅

2. **Create or Edit Post:**
   - Create new post or edit existing

3. **Click Publish Button:**
   - Click the send icon (📤) next to each platform
   - Post publishes to that platform

### Features:
✅ **AI Caption Generation** - Matches your brand voice
✅ **AI Hashtag Generation** - Platform-specific hashtags
✅ **Color Analysis** - Matches images to your brand colors
✅ **Visual Feed Preview** - See Instagram feed before posting
✅ **Multi-platform** - Post to all platforms at once
✅ **Scheduling** - Schedule posts for later
✅ **OAuth Integration** - Secure social media connections

---

## 🔧 **Setup Required**

### Environment Variables (Vercel):

#### **Required for Payments:**
- `STRIPE_SECRET_KEY` - Your Stripe secret key

#### **Required for Subscribers:**
- `MAILERLITE_API_KEY` - Your MailerLite API key
- `MAILERLITE_GROUP_ID` - Your MailerLite group ID

#### **Required for Visitor Tracking:**
- `KV_REST_API_URL` - Vercel KV URL
- `KV_REST_API_TOKEN` - Vercel KV token

#### **Required for Content Planner:**
- `NEXT_PUBLIC_BASE_URL` - Your website URL (e.g., `https://theorangecode.com`)

#### **Optional for AI Features:**
- `OPENAI_API_KEY` - For AI caption/hashtag generation (optional, has fallback)

#### **Required for Social Media OAuth:**
- `INSTAGRAM_APP_ID` - Instagram App ID
- `INSTAGRAM_APP_SECRET` - Instagram App Secret
- `LINKEDIN_CLIENT_ID` - LinkedIn Client ID
- `LINKEDIN_CLIENT_SECRET` - LinkedIn Client Secret
- `PINTEREST_APP_ID` - Pinterest App ID
- `PINTEREST_APP_SECRET` - Pinterest App Secret
- `TWITTER_CLIENT_ID` - Twitter/X Client ID
- `TWITTER_CLIENT_SECRET` - Twitter/X Client Secret

#### **Required for Admin Access:**
- `ADMIN_PASSWORD` - Your admin dashboard password

---

## 🎯 **Quick Start Guide**

### 1. **View Payments:**
- Go to "Payments" tab
- See all Stripe payments
- Search for specific customers

### 2. **View Subscribers:**
- Go to "Subscribers" tab
- See all MailerLite subscribers
- Check email stats and welcome email status

### 3. **View Visitors:**
- Go to "Visitors" tab
- See who's on your site right now
- View visitor statistics and world map

### 4. **Create Social Media Post:**
- Go to "Content Planner" tab
- Connect social media accounts (click "Connect Account")
- Click "Create Post"
- Upload image
- Click "AI Generate" for caption and hashtags
- Select platforms
- Schedule or publish

### 5. **Test Visitor Tracking:**
- Open `theorangecode.com` in another tab
- Browse around (click, scroll)
- Go back to admin dashboard
- Click "Visitors" tab → "Refresh"
- See yourself appear as a visitor!

---

## 📱 **Mobile Responsive**

✅ All tabs work perfectly on mobile
✅ Touch-friendly drag-and-drop
✅ Mobile file upload
✅ Responsive tables and charts
✅ Mobile-optimized forms

---

## 🔄 **Auto-Refresh**

✅ **Data refreshes every 30 seconds** automatically
✅ All tabs stay synchronized
✅ Real-time visitor tracking
✅ Live payment and subscriber updates

---

## 🎨 **Design**

✅ **Glassmorphic UI** - Matches your website design
✅ **Brand Colors** - Uses your website color scheme (#E89F6B, #A7A7A7, #50A0F0)
✅ **Smooth Animations** - Framer Motion
✅ **Interactive Charts** - Recharts
✅ **Modern Icons** - Lucide React

---

## 🚨 **Troubleshooting**

### Payments Not Showing:
- Check `STRIPE_SECRET_KEY` is set in Vercel
- Verify you have payments in Stripe
- Check Vercel function logs

### Subscribers Not Showing:
- Check `MAILERLITE_API_KEY` is set in Vercel
- Verify subscribers exist in MailerLite
- Check Vercel function logs

### Visitors Not Showing:
- Open your website in another tab and browse
- Check `KV_REST_API_URL` and `KV_REST_API_TOKEN` are set
- Check Vercel function logs

### Social Media Not Connecting:
- Verify OAuth credentials are set in Vercel
- Check redirect URIs match in platform settings
- Check Vercel function logs

---

## ✨ **All Features Summary**

✅ **6 Complete Tabs** - Overview, Payments, Subscribers, Analytics, Visitors, Content Planner
✅ **Real-time Visitor Tracking** - See who's on your site, where from, what they're doing
✅ **Complete Payment Tracking** - All Stripe payments visible
✅ **Subscriber Management** - Full MailerLite integration with email stats
✅ **AI Content Planner** - Generate captions and hashtags matching your brand
✅ **Social Media Integration** - Post to Instagram, LinkedIn, Pinterest, X
✅ **Visual Feed Preview** - See your Instagram feed before posting
✅ **Auto-refresh** - All data stays live (30 seconds)
✅ **Mobile Responsive** - Works perfectly on all devices
✅ **Password Protected** - Secure admin access

---

**Your dashboard is fully functional and ready to use!** 🎉

