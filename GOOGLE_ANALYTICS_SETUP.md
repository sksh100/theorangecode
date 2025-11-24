# Google Analytics Setup Guide

## Overview
This website has been configured with Google Analytics 4 (GA4) to track all visitor behavior, clicks, and interactions.

## Setup Instructions

### 1. Create a Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Create a new GA4 property for your website
4. Get your Measurement ID (format: `G-XXXXXXXXXX`)

### 2. Add Your Measurement ID
1. Create a `.env.local` file in the root directory (if it doesn't exist)
2. Add your Google Analytics Measurement ID:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   Replace `G-XXXXXXXXXX` with your actual Measurement ID from Google Analytics.

### 3. Deploy
After adding the environment variable, deploy your site. The analytics will automatically start tracking.

## What Gets Tracked

### Automatic Tracking:
- **Page Views**: Every page visit is tracked automatically
- **Traffic Sources**: Where visitors come from (referrers, UTM parameters)
- **User Behavior**: Scroll depth, time on page, page visibility
- **All Clicks**: Every click on links, buttons, and interactive elements
- **Form Interactions**: Form starts and completions
- **File Downloads**: Any file downloads
- **Video Plays**: Video interactions (if videos are added)

### Custom Events Tracked:
- **Masterclass Selection**: When users select a masterclass
- **Time Slot Selection**: When users choose a date/time
- **Checkout Start**: When users click "Secure Your Spot"
- **Dropdown Interactions**: Opening and clicking items in dropdown menus
- **Form Submissions**: Contact form and tailormade course inquiries
- **Button Clicks**: All CTA buttons throughout the site

### Data Captured:
- Page paths and URLs
- Referrer information
- UTM parameters (source, medium, campaign, term, content)
- Element details (IDs, classes, text)
- Timestamps
- User engagement metrics

## Viewing Your Data

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Navigate to **Reports** > **Realtime** to see live activity
4. Navigate to **Reports** > **Engagement** > **Events** to see all tracked events
5. Navigate to **Reports** > **Acquisition** to see traffic sources

## Privacy & Compliance

- IP addresses are anonymized
- Cookies are configured with SameSite=None;Secure
- All tracking is done in compliance with GDPR and privacy regulations

## Troubleshooting

If analytics aren't working:
1. Check that `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly in your environment variables
2. Verify the Measurement ID format (should start with `G-`)
3. Check browser console for any errors
4. Ensure the site is deployed (analytics only work in production or with the correct environment variable)

