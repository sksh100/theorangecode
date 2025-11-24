# How to Exclude Your IP Address from Google Analytics

## Step 1: Find Your IP Address

### Quick Method:
1. Visit: https://whatismyipaddress.com/
2. Copy the number shown (e.g., `123.45.67.89`)

### Alternative:
1. Visit: https://www.whatismyip.com/
2. Copy your IPv4 address

**Note:** Your IP might change if you're on a dynamic connection. If it changes, you'll need to update the filter.

## Step 2: Create IP Exclusion Filter in Google Analytics

1. **Go to Google Analytics**
   - Visit: https://analytics.google.com
   - Select your property (`www.theorangecode.com`)

2. **Navigate to Admin**
   - Click the **gear icon (⚙️)** in the bottom left corner

3. **Go to Data Settings**
   - Under the **Property** column (middle column)
   - Click **Data Settings**
   - Click **Data Filters**

4. **Create New Filter**
   - Click **Create filter** button (top right)

5. **Configure the Filter**
   - **Filter name:** `Exclude My IP` (or any name you prefer)
   - **Filter type:** Select **Internal traffic**
   - **Parameter name:** `ip_address`
   - **Match type:** Select **IP address equals**
   - **Filter value:** Paste your IP address (e.g., `123.45.67.89`)
   - **Evaluation:** Select **Both** (testing and production)

6. **Save**
   - Click **Save** button
   - The filter will start in "Testing" mode

## Step 3: Test the Filter

1. **Visit Your Site**
   - Go to: https://www.theorangecode.com
   - Navigate through a few pages

2. **Check Realtime Reports**
   - In Google Analytics, go to **Reports** → **Realtime**
   - Your visit should NOT appear (may take a few minutes)

3. **Activate the Filter**
   - If the filter works correctly, go back to **Admin** → **Data Settings** → **Data Filters**
   - Find your filter
   - You can activate it fully (it will move from "Testing" to "Active")

## Excluding Multiple IPs

If you have multiple locations (home, office, etc.):

1. **Create Separate Filters**
   - Create one filter for each IP address
   - Name them clearly (e.g., "Exclude Home IP", "Exclude Office IP")

2. **Or Use IP Range (Advanced)**
   - If your IPs are in a range, you can use "IP address is in range"
   - Contact your ISP for your IP range

## Important Notes

- **Dynamic IPs:** If your IP changes frequently, you may need to update the filter
- **Mobile Data:** Your mobile device might have a different IP - exclude that too if needed
- **VPN:** If you use a VPN, exclude the VPN's IP address
- **Testing Mode:** Filters start in testing mode - verify they work before fully activating

## Quick Checklist

- [ ] Found my IP address
- [ ] Created filter in Google Analytics
- [ ] Tested the filter (my visits don't appear)
- [ ] Activated the filter

---

**That's it!** Your own visits will now be excluded from your analytics data.

