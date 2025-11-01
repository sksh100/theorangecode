# Google Sheets Setup Instructions

## Quick Setup Steps

1. **Create a Google Cloud Project:**
   - Go to https://console.cloud.google.com
   - Create a new project (or use existing)

2. **Enable Google Sheets API:**
   - In your project, go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

3. **Create Service Account:**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Name it (e.g., "sheets-writer") and click "Create"
   - Skip role assignment and click "Done"

4. **Create and Download Key:**
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose "JSON" format
   - Download the JSON file

5. **Share Google Sheet with Service Account:**
   - Create a new Google Sheet (or use existing)
   - Click "Share" button
   - Add the service account email (found in the JSON file, `client_email` field)
   - Give it "Editor" permissions
   - Copy the Sheet ID from the URL:
     - Example: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
     - The part between `/d/` and `/edit` is your Sheet ID

6. **Set Environment Variables:**
   - In Vercel: Go to your project > Settings > Environment Variables
   - Add these variables:
     - `GOOGLE_SERVICE_ACCOUNT_KEY` - Paste the entire JSON file content
     - `GOOGLE_SHEET_ID` - Paste your Sheet ID

7. **For Local Development (.env.local):**
   ```env
   GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'
   GOOGLE_SHEET_ID=your_sheet_id_here
   ```

## Sheet Format

The data will be appended to columns:
- Column A: Timestamp
- Column B: Name
- Column C: Email
- Column D: Source

You can add headers in row 1:
| Timestamp | Name | Email | Source |
|-----------|------|-------|--------|

## Testing

1. Click the "Notify Me When Launch" button
2. Fill in the form
3. Submit
4. Check your Google Sheet - the data should appear!

## Notes

- The API will work even if Google Sheets isn't configured (it just won't save to Sheets)
- Submissions will still be logged to Vercel KV if configured
- Make sure to keep your service account key secure and never commit it to git

