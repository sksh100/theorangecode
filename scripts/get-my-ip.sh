#!/bin/bash

# Quick script to get your public IP address

echo "🔍 Finding your public IP address..."
echo ""

# Method 1: ipify.org
IP1=$(curl -s https://api.ipify.org 2>/dev/null)
if [ ! -z "$IP1" ]; then
  echo "✅ Your IP Address: $IP1"
  echo ""
  echo "Copy this IP and use it in Google Analytics filter:"
  echo "   $IP1"
  echo ""
  exit 0
fi

# Method 2: ifconfig.me
IP2=$(curl -s https://ifconfig.me 2>/dev/null)
if [ ! -z "$IP2" ]; then
  echo "✅ Your IP Address: $IP2"
  echo ""
  echo "Copy this IP and use it in Google Analytics filter:"
  echo "   $IP2"
  echo ""
  exit 0
fi

# Fallback
echo "❌ Could not automatically detect IP address"
echo ""
echo "Please visit one of these websites to find your IP:"
echo "   - https://whatismyipaddress.com/"
echo "   - https://www.whatismyip.com/"
echo ""

