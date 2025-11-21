# Contact Form Email Setup

The contact form is now configured to send emails to `hello@theorangecode.com` when someone submits the form.

## Setup Instructions

### 1. Install Resend Package

Run this command in your terminal:
```bash
npm install resend
```

If you encounter npm errors, try:
```bash
rm -rf node_modules package-lock.json
npm install
npm install resend
```

### 2. Get Resend API Key

1. Go to [Resend.com](https://resend.com) and sign up for a free account
2. Navigate to the API Keys section in your dashboard
3. Create a new API key
4. Copy the API key

### 3. Add Environment Variable

Add the following to your `.env.local` file (create it if it doesn't exist):

```env
RESEND_API_KEY=re_your_api_key_here
```

### 4. Verify Your Domain (Optional but Recommended)

For production, you should verify your domain with Resend:

1. Go to Resend Dashboard → Domains
2. Add your domain (theorangecode.com)
3. Add the DNS records they provide to your domain registrar
4. Once verified, update the `from` field in `src/app/api/contact/route.ts` to use your verified domain:
   ```typescript
   from: 'The Orange Code <contact@theorangecode.com>',
   ```

### 5. Test the Form

1. Start your development server: `npm run dev`
2. Fill out the contact form on your website
3. Check your email inbox at `hello@theorangecode.com`

## How It Works

- When someone submits the contact form, it sends a POST request to `/api/contact`
- The API route formats the form data into a nice HTML email
- The email is sent to `hello@theorangecode.com` with:
  - The sender's email as the reply-to address
  - A formatted subject line
  - All form fields (name, email, phone, subject, message)

## Email Format

The email includes:
- **Name**: Full name of the person
- **Email**: Their email address (set as reply-to)
- **Phone**: Phone number (if provided)
- **Subject**: Selected subject from dropdown
- **Message**: Their message content

## Troubleshooting

- **Email not received**: Check your spam folder
- **API errors**: Verify your `RESEND_API_KEY` is correct in `.env.local`
- **Build errors**: Make sure `resend` package is installed: `npm install resend`

