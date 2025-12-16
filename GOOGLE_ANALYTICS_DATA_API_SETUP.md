# Google Analytics Data API Setup Guide

This guide will help you set up Google Analytics Data API integration to display real-time visitor data in your admin dashboard.

## Prerequisites

- Google Analytics 4 (GA4) property set up
- Google Cloud Project
- Admin access to both Google Analytics and Google Cloud Console

## Step-by-Step Setup

### 1. Get Your GA4 Property ID

1. Go to [Google Analytics](https://analytics.google.com)
2. Select your GA4 property
3. Go to **Admin** (gear icon) → **Property Settings**
4. Find your **Property ID** (format: `123456789`)
5. Copy this ID - you'll need it for `GOOGLE_ANALYTICS_PROPERTY_ID`

### 2. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click **Select a project** → **New Project**
3. Name your project (e.g., "The Orange Code Analytics")
4. Click **Create**
5. Wait for the project to be created, then select it

### 3. Enable Google Analytics Data API

1. In Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for "Google Analytics Data API"
3. Click on it and click **Enable**
4. Wait for the API to be enabled

### 4. Create Service Account

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Fill in:
   - **Service account name**: `analytics-reader` (or any name)
   - **Service account ID**: Auto-generated
   - **Description**: "Service account for reading Google Analytics data"
4. Click **Create and Continue**
5. Skip role assignment (click **Continue**)
6. Click **Done**

### 5. Create and Download Service Account Key

1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** → **Create new key**
4. Select **JSON** format
5. Click **Create**
6. The JSON file will download automatically
7. **Important**: Keep this file secure - it contains credentials

### 6. Add Service Account to Google Analytics

1. Go back to [Google Analytics](https://analytics.google.com)
2. Go to **Admin** → **Property Access Management**
3. Click **+** → **Add users**
4. Enter the service account email (found in the JSON file, `client_email` field)
5. Select role: **Viewer**
6. Click **Add**

### 7. Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add the following variables:

#### Required Variables:

**`GOOGLE_ANALYTICS_PROPERTY_ID`**
- Value: Your GA4 Property ID (e.g., `123456789`)
- Environment: Production, Preview, Development

**`GOOGLE_SERVICE_ACCOUNT_KEY`**
- Value: The entire contents of the JSON file you downloaded (as a single-line JSON string)
- Example format:
  ```json
  {"type":"service_account","project_id":"your-project","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"analytics-reader@your-project.iam.gserviceaccount.com","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}
  ```
- Environment: Production, Preview, Development

**`NEXT_PUBLIC_GA_MEASUREMENT_ID`** (if not already set)
- Value: Your GA4 Measurement ID (format: `G-XXXXXXXXXX`)
- Found in: Google Analytics → Admin → Data Streams → Your stream → Measurement ID
- Environment: Production, Preview, Development

### 8. Verify Setup

1. Deploy your changes to Vercel
2. Go to your admin dashboard → **Analytics** tab
3. Click **Refresh** on the Google Analytics section
4. You should see:
   - Total Users
   - Active Now (real-time)
   - Page Views
   - Sessions
   - Top Pages
   - Top Countries

## Troubleshooting

### "Google Analytics Data API error"

**Possible causes:**
1. Property ID is incorrect
2. Service account key is invalid JSON
3. Service account doesn't have access to GA4 property
4. Google Analytics Data API is not enabled

**Solutions:**
1. Verify `GOOGLE_ANALYTICS_PROPERTY_ID` matches your GA4 Property ID
2. Ensure `GOOGLE_SERVICE_ACCOUNT_KEY` is valid JSON (check for escaped quotes)
3. Re-add service account email to GA4 property with Viewer role
4. Enable Google Analytics Data API in Google Cloud Console

### "No data showing"

**Possible causes:**
1. No visitors in the last 30 days
2. API credentials are incorrect
3. Service account doesn't have proper permissions

**Solutions:**
1. Check Google Analytics directly - do you see data there?
2. Verify all environment variables are set correctly
3. Check Vercel function logs for detailed error messages

### "Setup Required" message

This means:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set (tracking works)
- But `GOOGLE_ANALYTICS_PROPERTY_ID` or `GOOGLE_SERVICE_ACCOUNT_KEY` is missing

**Solution:** Follow steps 1-7 above to set up the Data API.

## Security Notes

- **Never commit** the service account JSON file to Git
- Keep your service account key secure
- Use environment variables in Vercel (never hardcode)
- The service account only needs **Viewer** access (read-only)

## What Data is Fetched?

The integration fetches:
- **Real-time users** (active right now)
- **Total users** (last 30 days)
- **Page views** (last 30 days)
- **Sessions** (last 30 days)
- **Top pages** (last 30 days)
- **Top countries** (last 30 days)
- **Top traffic sources** (last 30 days)

## Data Refresh

- Real-time data refreshes when you click "Refresh"
- Historical data is fetched for the last 30 days
- Data is cached briefly to avoid API rate limits

## API Limits

Google Analytics Data API has quotas:
- **Queries per day**: 25,000 (usually sufficient)
- **Queries per 100 seconds**: 100

If you hit limits, the dashboard will show an error message.

## Support

If you encounter issues:
1. Check Vercel function logs (`/api/admin/google-analytics`)
2. Verify all environment variables are set
3. Test service account access in Google Cloud Console
4. Check Google Analytics directly to confirm data exists

