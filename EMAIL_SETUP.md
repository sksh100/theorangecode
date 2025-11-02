# Email Setup for Password Reset

## Overview
The password reset system is set up and ready to use. Currently, it logs reset links to the console in development mode. To enable actual email sending in production, you need to integrate an email service.

## Current Setup

### Password Reset Flow
1. User requests password reset on `/forgot-password`
2. System generates a secure token and stores it in Vercel KV (1 hour expiry)
3. Email with reset link is sent (currently logged to console)
4. User clicks link to `/reset-password?token=...`
5. System validates token and allows password reset
6. New password is saved (hashed)

## Setup Email Service (Recommended: Resend)

### Option 1: Resend (Recommended)

1. **Sign up for Resend**: https://resend.com
2. **Get API Key**: 
   - Go to API Keys in Resend dashboard
   - Create a new API key
   - Copy the key (starts with `re_`)
3. **Add to Vercel Environment Variables**:
   - `RESEND_API_KEY`: Your Resend API key
   - `RESEND_FROM_EMAIL`: Your verified domain email (e.g., `noreply@yourdomain.com`)
4. **Update Code**:
   - Uncomment the Resend code in `/src/app/api/forgot-password/route.ts`
   - Install Resend: `npm install resend`

### Option 2: SendGrid

1. **Sign up for SendGrid**: https://sendgrid.com
2. **Get API Key**: Create API key in SendGrid dashboard
3. **Add to Vercel**: `SENDGRID_API_KEY`
4. **Update code** to use SendGrid SDK

### Option 3: AWS SES

1. **Set up AWS SES**: Verify your domain/email
2. **Get credentials**: AWS Access Key and Secret
3. **Add to Vercel**: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`
4. **Update code** to use AWS SES SDK

## Development Mode

In development (`NODE_ENV=development`), the reset link is returned in the API response so you can test the flow without email.

## Testing

1. Go to `/forgot-password`
2. Enter your email
3. Check console/logs for reset link (development mode)
4. Click the reset link
5. Enter new password
6. Password is saved

## Security Features

- ✅ Secure token generation (crypto.randomBytes)
- ✅ Token expiration (1 hour)
- ✅ Token validation before password reset
- ✅ Password hashing (SHA-256 with salt)
- ✅ Password length validation (min 8 characters)
- ✅ Password matching validation
- ✅ Prevents email enumeration (always returns success)
- ✅ Token cleanup after use

