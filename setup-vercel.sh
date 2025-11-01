#!/bin/bash

# Setup Vercel project for theorangecode.com
# This script will link your project to Vercel and configure the domain

set -e

echo "🔗 Setting up Vercel project for theorangecode.com..."

# Check if vercel CLI is available
if ! command -v npx &> /dev/null; then
    echo "❌ npx not found. Please install Node.js"
    exit 1
fi

# Step 1: Login to Vercel (if not already logged in)
echo "📝 Checking Vercel authentication..."
if ! npx vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel..."
    npx vercel login
else
    echo "✅ Already logged in to Vercel"
    npx vercel whoami
fi

# Step 2: Link project
echo "🔗 Linking project to Vercel..."
npx vercel link --yes --name theorangecode || {
    echo "⚠️  Project might already be linked or name taken. Continuing..."
}

# Step 3: Add domain
echo "🌐 Adding theorangecode.com domain..."
npx vercel domains add theorangecode.com || {
    echo "⚠️  Domain might already be added. Continuing..."
}

# Step 4: Add www subdomain
echo "🌐 Adding www.theorangecode.com subdomain..."
npx vercel domains add www.theorangecode.com || {
    echo "⚠️  www subdomain might already be added. Continuing..."
}

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Configure DNS records in your domain registrar"
echo "2. Vercel will show you the exact DNS records needed"
echo "3. Run: npx vercel domains ls theorangecode.com"
echo ""

