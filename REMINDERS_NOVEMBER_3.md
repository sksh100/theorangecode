# Reminders for November 3, 2025 Session

## 1. Glacial Indifference Font
- **Issue**: Removed Glacial Indifference from Google Fonts because it's not available there
- **Current Status**: Using Inter as a fallback font
- **Action Needed**: 
  - Option 1: Host Glacial Indifference font files locally
  - Option 2: Use a different font service (e.g., Adobe Fonts, Font Squirrel)
  - Option 3: Purchase license and self-host
  - Option 4: Find a similar free alternative font

## 2. Favicon Creation
- **Action Needed**: Create a favicon for "The Orange Code"
- **How to create a favicon**:
  1. Design a 32x32 or 16x16 icon (or create larger and scale down)
  2. Save as `.ico` format (or use `.png` and convert)
  3. Place in `/public` folder as `favicon.ico`
  4. Add to `src/app/layout.tsx` in the `<head>` section:
     ```tsx
     <link rel="icon" href="/favicon.ico" />
     <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
     ```
  5. For different sizes, create multiple files:
     - `favicon-16x16.png`
     - `favicon-32x32.png`
     - `apple-touch-icon.png` (180x180)
  6. Add to `metadata` in `layout.tsx`:
     ```tsx
     icons: {
       icon: '/favicon.ico',
       apple: '/apple-touch-icon.png',
     }
     ```

## Notes
- All changes committed with label "November 3, 2025"
- Build errors fixed: font issue and TypeScript video player error
- Mobile background patterns removed successfully

