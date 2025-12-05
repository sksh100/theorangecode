# Ebook Sample PDF Setup

## Where to Place the Sample PDF

Place your sample PDF (first 7 pages of the UK to UAE Cultural Intelligence Guide) in this directory with the filename:

**`sample-uk-uae-guide.pdf`**

## File Location
```
protected/sample-uk-uae-guide.pdf
```

## How It Works

1. User clicks "Preview a Sample" button on the relocation page
2. A modal appears asking for name and email
3. User submits their details
4. Contact details are:
   - Logged to console (you can add database storage later)
   - Added to MailerLite automatically
5. User receives a download link to the sample PDF
6. Sample PDF is served from `/api/download-sample`

## Current Status

- ✅ Modal component created (`src/components/EbookSampleModal.tsx`)
- ✅ API route for collecting details (`src/app/api/ebook-sample/route.ts`)
- ✅ API route for serving PDF (`src/app/api/download-sample/route.ts`)
- ✅ Preview button connected to modal
- ⏳ **Waiting for sample PDF file** - Place `sample-uk-uae-guide.pdf` in `protected/` directory

## Next Steps

1. Extract first 7 pages from your full ebook PDF
2. Save as `sample-uk-uae-guide.pdf` in the `protected/` directory
3. Test the flow by clicking "Preview a Sample" button

## Login/Dashboard Access

Login and dashboard links are already hidden in the navbar (commented out). They won't appear until you're ready to enable them.

