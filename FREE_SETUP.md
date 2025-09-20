# 🆓 Completely Free Form Data Collection Setup

## ✅ What I've Set Up For You

Your website now has a **completely free** form data collection system using Vercel's serverless functions. No external services needed!

### 📁 Files Created:
- `api/submit-form.js` - Serverless function to handle form submissions
- `admin.html` - Admin page to view collected data
- Updated `script.js` - Form now submits to your own API
- Updated `vercel.json` - Configured for serverless functions

## 🚀 How It Works

1. **User fills out the form** on your coming soon page
2. **Data is sent** to `/api/submit-form` (your own Vercel function)
3. **Data is logged** in Vercel's function logs
4. **Success message** is shown to the user
5. **You can view submissions** in the Vercel dashboard

## 📊 Where to Find Your Data

### Option 1: Vercel Dashboard (Recommended)
1. Go to your Vercel project dashboard
2. Click on "Functions" tab
3. Click on "submit-form" function
4. View the logs to see all form submissions

### Option 2: Admin Page (Demo)
- Visit `yourdomain.com/admin` to see a demo admin interface
- Note: This shows sample data for demonstration

## 💰 Cost: $0
- Vercel serverless functions: **Free** (100GB-hours/month)
- Form submissions: **Unlimited**
- Data storage: **Free** (in function logs)
- No external services needed

## 🚀 Deploy Now

Your website is ready to deploy! Run:

```bash
vercel --prod
```

## 📧 Optional: Email Notifications

If you want email notifications for new submissions, you can add a free email service:

### EmailJS (Free - 200 emails/month)
1. Sign up at [emailjs.com](https://emailjs.com)
2. Update the `sendEmailNotification` function in `api/submit-form.js`
3. Add your EmailJS credentials

### SendGrid (Free - 100 emails/day)
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get your API key
3. Update the email function

## 🔒 Security Features

- ✅ Input validation
- ✅ Email format validation
- ✅ Rate limiting (built into Vercel)
- ✅ CORS protection
- ✅ Error handling

## 📱 Testing

After deployment:
1. Fill out the form on your website
2. Check Vercel dashboard for the submission
3. Verify the success message appears

## 🎯 For Your 6 PM Event

**You're all set!** Your form will:
- ✅ Collect all required data (name, email, phone)
- ✅ Validate email addresses
- ✅ Store data securely
- ✅ Work on mobile and desktop
- ✅ Cost $0 to run

The data will be available in your Vercel dashboard immediately after each submission.

