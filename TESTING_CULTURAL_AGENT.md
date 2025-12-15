# Testing Cultural Intelligence Agent

## Common "Connection Failed" Issues

### 1. **Testing on Production Before Deployment**
If you're testing on `https://www.theorangecode.com/cultural-intelligence-agent?preview=true`:
- Make sure you've deployed the latest changes to Vercel
- Wait a few minutes after pushing to GitHub for Vercel to deploy
- Check Vercel deployment logs for any errors

### 2. **Testing Locally**
Run the development server:
```bash
npm run dev
```
Then access: `http://localhost:3000/cultural-intelligence-agent?preview=true`

### 3. **Check Browser Console**
Open browser DevTools (F12) and check:
- **Console tab**: Look for JavaScript errors
- **Network tab**: Check if the API call to `/api/cultural-intelligence-agent` is failing
  - Status code (should be 200)
  - Response body (check for error messages)

### 4. **API Route Issues**
The API route needs:
- `OPENAI_API_KEY` environment variable (optional - will use fallback if missing)
- Proper error handling (already implemented)

### 5. **Check Error Message**
The improved error handling will now show:
- Specific error messages from the API
- Network errors
- Server errors with status codes

## Quick Debug Steps

1. **Check if page loads**: Can you see the form?
2. **Check browser console**: Any JavaScript errors?
3. **Check network tab**: What's the status of the API call?
4. **Check Vercel logs**: If deployed, check function logs

## Expected Behavior

- ✅ Page loads with form
- ✅ Can fill in fields
- ✅ Can check disclaimer checkbox
- ✅ Submit button works
- ✅ Shows loading state
- ✅ Returns response (even if OpenAI key is missing - uses fallback)

## If Still Not Working

1. Check Vercel deployment status
2. Check environment variables in Vercel dashboard
3. Try accessing locally first: `npm run dev`
4. Check browser console for specific error messages

