# Quick Domain Setup Guide for The Orange Code

## Link Your Domain to Your Website

Follow these simple steps to connect your domain to your Vercel deployment:

### Step 1: Deploy to Vercel

1. **Push your code to GitHub** (if not already done)
2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New..." → "Project"
   - Import your repository
   - Vercel will automatically detect Next.js and deploy

### Step 2: Add Your Domain

1. In your Vercel project dashboard
2. Go to **Settings** → **Domains**
3. Click **"Add Domain"**
4. Enter your domain: `theorangecode.com` (or whatever domain you purchased)
5. Click **"Add"**

### Step 3: Configure DNS

Vercel will show you DNS records to configure. You have 2 options:

**Option A: Use Vercel Nameservers (Easiest)**
1. In Vercel, copy the nameservers shown (looks like `ns1.vercel-dns.com`, `ns2.vercel-dns.com`)
2. Go to your domain registrar (where you bought the domain)
3. Find "Nameserver" or "DNS" settings
4. Replace the existing nameservers with Vercel's nameservers
5. Save and wait for propagation (usually 15 minutes to a few hours)

**Option B: Add DNS Records Manually**
1. In Vercel, copy the DNS records (usually A records pointing to Vercel IPs)
2. Go to your domain registrar's DNS settings
3. Add the records Vercel provided
4. Save and wait for propagation

### Step 4: Wait & Verify

- DNS changes take 15 minutes to 48 hours (usually under 2 hours)
- Check your domain in a browser once it's ready
- HTTPS/SSL is automatically set up by Vercel

### Common Domain Registrars

**Namecheap:**
- Domain List → Select domain → Manage → Advanced DNS → Add records

**GoDaddy:**
- My Products → DNS → Manage DNS → Edit or Add records

**Cloudflare:**
- DNS → Records → Add record

**Google Domains:**
- DNS → Add or Edit records

## Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Project imported to Vercel
- [ ] Domain added in Vercel settings
- [ ] DNS configured (nameservers or records)
- [ ] Wait for propagation
- [ ] Test domain in browser

## Your Coming Soon Page Will Be Live At:

- `https://yourdomain.com/coming-soon` - Your coming soon page
- `https://yourdomain.com/` - Your main landing page

Both pages will be accessible once DNS propagation completes!

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Vercel Support: Available in dashboard
- Your registrar's support: Help with DNS settings

