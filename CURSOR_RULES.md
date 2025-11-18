# Cursor Editing Rules for The Orange Code Project

## ⚠️ CRITICAL RULES - DO NOT VIOLATE

When editing this project, follow these rules:

1. **Do not delete existing sections or components** unless explicitly told to delete them.
2. **Do not remove the navigation bar, footer, or hero card.**
3. **When making changes, modify only the smallest possible part of the code.** Do not refactor entire files.
4. **When adding WebGL or animations, keep them in separate components** (like WebglBackground) and only mount them behind existing content. Never replace the main JSX tree of the page.
5. **If you are not sure where something should go, ask instead of guessing.**

## Current Page Structure

The homepage (`src/app/page.tsx`) MUST always include:
- `ModernNavbar` - Navigation bar at the top
- `Hero` - Hero section with text and buttons
- `USPBar` - USP bar section
- `BentoBoxSection` - Bento box grid section
- `ExtendedAdvantagesBanner` - Extended advantages section
- `ProgramsOverview` - Programs overview section
- `ModernFooter` - Footer at the bottom

## WebGL Globe

- The globe is in `src/components/WebglBackground.tsx`
- It is used ONLY as a background in the Hero component
- It should NEVER replace or hide existing content
- It is positioned with `-z-10` to stay behind content

## Hero Component Structure

The Hero component (`src/components/Hero.tsx`) structure:
1. Section wrapper
2. WebglBackground (background only, z-index: -z-10)
3. Gradient overlay (for text readability)
4. Hero content card (with all text and buttons - DO NOT REMOVE)

## Before Making Changes

Before editing any file:
1. Check if the change will affect other sections
2. Verify all sections are still included
3. Test that navigation and footer remain visible
4. Ensure hero content (text, buttons) is not removed

