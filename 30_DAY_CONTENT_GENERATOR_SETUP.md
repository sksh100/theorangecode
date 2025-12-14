# 30-Day Content Generator Setup Guide

## ✅ What's Been Built

A complete, Unsplash-compliant system for generating 30 days of social media content focused on selling "Beyond Formalities" ebook.

### Features

1. **30-Day Content Generator**
   - Generates 30 posts (1-2 per day) across Instagram, LinkedIn, Twitter, Pinterest
   - All posts focused on "Beyond Formalities" ebook
   - Pre-written captions, hashtags, and platform assignments
   - Automatic scheduling starting from your chosen date

2. **Unsplash Image Integration**
   - Fetches 1 image per post from Unsplash
   - Proper attribution automatically included
   - Rate limiting (50 requests/hour)
   - Image caching (30 days)
   - Hotlinked images (no re-hosting)

3. **Preview & Review System**
   - See all posts before they go live
   - Preview how posts look on each platform
   - Edit any post before approving
   - Visual preview with brand styling

4. **Approval Workflow**
   - All posts start as "Ready for Review"
   - Approve individually or bulk approve
   - Human-in-the-loop (Unsplash compliant)
   - Status tracking: draft → ready_for_review → approved → scheduled → published

## 🚀 Setup Instructions

### Step 1: Get Unsplash API Key (5-10 days)

1. Go to https://unsplash.com/developers
2. Click "New Application"
3. Fill in application details:
   - Application name: "The Orange Code Content Generator"
   - Description: "Social media content generator for The Orange Code"
   - Website: https://theorangecode.com
4. Accept terms and submit
5. Wait for approval (5-10 days)
6. Once approved, copy your Access Key

### Step 2: Add to Vercel Environment Variables

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add new variable:
   - **Key**: `UNSPLASH_ACCESS_KEY`
   - **Value**: (paste your Unsplash Access Key)
   - **Environment**: Production, Preview, Development
3. Save and redeploy

### Step 3: Access the Generator

1. Go to `/admin` on your website
2. Click the **"30-Day Generator"** tab
3. You're ready to generate!

## 📖 How to Use

### Generate 30 Days of Content

1. **Set Start Date**
   - Choose when you want the first post to be scheduled
   - Default: Tomorrow at 9 AM

2. **Click "Generate 30 Days"**
   - System generates 30 posts
   - Fetches images from Unsplash (with delays to respect rate limits)
   - All posts start as "Ready for Review"

3. **Review Posts**
   - Filter by status: All, Ready for Review, Approved, Scheduled, Published
   - Click "Preview" on any post to see how it looks
   - Check Unsplash attribution is included

4. **Approve Posts**
   - **Individual**: Click approve button on each post
   - **Bulk**: Select posts and click "Approve Selected"
   - **All**: Click "Approve All Ready" to approve everything

5. **Auto-Publish**
   - Approved posts move to "Scheduled"
   - Existing cron job publishes scheduled posts automatically

## 🎨 Content Strategy

### Week 1: Problem Awareness
- Day 1-5: Pain points (relationships, communication, trust)
- Day 6-7: Weekend quote and educational tip

### Week 2: Solution Introduction
- Day 8-12: What the guide covers, benefits, testimonials
- Day 13-14: Success stories and CTAs

### Week 3: Deep Value
- Day 15-19: Cultural values, trust, etiquette, business culture
- Day 20-21: Weekend learning and testimonials

### Week 4: Conversion Focus
- Day 22-26: Pricing, features, FAQs
- Day 27-30: Final CTAs and urgency

## 🔒 Unsplash Compliance

### ✅ What We Do Right

1. **Human Approval Required**
   - All posts require manual approval
   - No fully automated posting

2. **Proper Attribution**
   - Every post includes: "Photo by [Photographer] on Unsplash"
   - Links to photographer profile and Unsplash page
   - Attribution visible in preview and on posts

3. **Rate Limiting**
   - Max 50 requests/hour (Unsplash free tier)
   - 2-second delay between requests
   - Automatic rate limit tracking

4. **Image Caching**
   - Images cached for 30 days
   - Reduces API calls
   - Faster loading

5. **Hotlinked Images**
   - Using Unsplash URLs directly
   - No re-hosting or copying images

6. **Backend-Only API Calls**
   - API key never exposed to frontend
   - All Unsplash calls from server

### ⚠️ Important Notes

- **Don't bulk generate multiple times** - Respect rate limits
- **Always review attribution** - Make sure it's included
- **Approve before posting** - Human-in-the-loop is required
- **Monitor rate limits** - System will warn if limit reached

## 🛠️ Technical Details

### API Routes Created

1. `/api/admin/fetch-unsplash-image` - Fetches images with attribution
2. `/api/admin/generate-30-day-content` - Generates 30 days of posts
3. `/api/admin/approve-content` - Approves posts (individual/bulk)
4. `/api/admin/content-preview` - Returns formatted preview

### Components Created

1. `30DayContentGenerator.tsx` - Main generator UI
2. `ContentPreviewModal.tsx` - Preview modal with brand styling

### Data Structure

```typescript
interface ContentPost {
  id: string
  caption: string
  hashtags: string[]
  altText: string
  mediaUrl?: string
  platforms: string[]
  scheduledDate?: string
  status: 'ready_for_review' | 'approved' | 'scheduled' | 'published'
  unsplashImage?: {
    id: string
    url: string // Hotlinked
    photographer: { name, username, profileUrl }
    unsplashUrl: string
    attributionText: string
  }
  // ... other fields
}
```

## 🐛 Troubleshooting

### "Unsplash API key not configured"
- Add `UNSPLASH_ACCESS_KEY` to Vercel environment variables
- Redeploy after adding

### "Rate limit reached"
- Wait 1 hour before generating more content
- System automatically resets after 1 hour

### "No images fetched"
- Check Unsplash API key is correct
- Check rate limit hasn't been exceeded
- Images are optional - posts can be generated without them

### Posts not showing
- Check status filter
- Make sure posts were generated successfully
- Check browser console for errors

## 📝 Next Steps

1. **Wait for Unsplash Approval** (5-10 days)
2. **Add API Key to Vercel**
3. **Generate 30 Days of Content**
4. **Review All Posts**
5. **Approve When Ready**
6. **Monitor Auto-Publishing**

## 🎯 Success Checklist

- [ ] Unsplash API key approved
- [ ] API key added to Vercel
- [ ] 30 days of content generated
- [ ] All posts reviewed
- [ ] Unsplash attribution verified
- [ ] Posts approved
- [ ] Auto-publishing working

---

**Ready to go!** Once your Unsplash API key is approved, you can start generating content immediately. The system is fully compliant and ready to use.

