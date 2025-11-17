# Generate VAPID Keys for Push Notifications

To enable push notifications, you need to generate VAPID keys.

## Steps:

1. Run this command in your terminal:
   ```bash
   npx web-push generate-vapid-keys
   ```

2. You will get output like:
   ```
   Public Key:
   BFxKX... (long string)
   
   Private Key:
   KXkFd... (long string)
   ```

3. Add these to your Vercel environment variables:
   - `NEXT_PUBLIC_VAPID_PUBLIC_KEY` = (the Public Key)
   - `VAPID_PRIVATE_KEY` = (the Private Key)
   - `VAPID_SUBJECT` = `mailto:admin@theorangecode.com` (or your email)

4. After adding, redeploy your Vercel project.

5. Test push notifications by visiting:
   ```
   https://www.theorangecode.com/api/push/test
   ```

## Quick Command:
```bash
npx web-push generate-vapid-keys
```

Copy the keys and add them to Vercel → Your Project → Settings → Environment Variables.

