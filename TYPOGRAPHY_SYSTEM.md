# Typography System - Standardized Styles

This document outlines the standardized typography system used across The Orange Code website.

## 🎯 Goal
Create consistent typography across all pages using **maximum 4 font styles**.

## 📐 Typography Styles

### **Style 1: Main Titles (H1)**
**Class:** `text-title`

**Usage:** Main page titles, hero headings

**Example:**
```tsx
<h1 className="text-title">
  Our Masterclasses
</h1>
```

**CSS Equivalent:**
```css
text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-normal
```

---

### **Style 2: Subtitles (H2/H3)**
**Class:** `text-subtitle`

**Usage:** Section headings, subsection titles

**Example:**
```tsx
<h2 className="text-subtitle">
  Transform your potential
</h2>
```

**CSS Equivalent:**
```css
text-2xl md:text-3xl lg:text-4xl font-bold mb-4 tracking-normal
```

---

### **Style 3: Body Text**
**Class:** `text-body`

**Usage:** Main content paragraphs, descriptions

**Example:**
```tsx
<p className="text-body">
  Transform your potential with our signature masterclasses designed for excellence.
</p>
```

**CSS Equivalent:**
```css
text-xl md:text-2xl text-white/80 max-w-5xl mx-auto leading-relaxed tracking-normal
```

---

### **Style 4: Smaller Text**
**Class:** `text-small`

**Usage:** Business benefits, captions, card descriptions, small informational text

**Example:**
```tsx
<p className="text-small">
  Close deals faster, build stronger partnerships, and create lasting business relationships.
</p>
```

**CSS Equivalent:**
```css
text-base text-white/70 leading-relaxed tracking-normal
```

---

## 📋 Usage Guidelines

### When to Use Each Style:

1. **`text-title`** → Main page titles, hero sections, primary headings
2. **`text-subtitle`** → Section headings, card titles, subsection headers
3. **`text-body`** → Paragraphs, descriptions, main content text
4. **`text-small`** → Benefits lists, captions, secondary information, card descriptions

### Combining with Other Classes:

You can combine these classes with other utility classes:

```tsx
{/* Title with gradient */}
<h1 className="text-title">
  <span className="text-white">Our </span>
  <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
    Masterclasses
  </span>
</h1>

{/* Subtitle with custom color */}
<h2 className="text-subtitle text-orange">Section Title</h2>

{/* Body text with custom max-width */}
<p className="text-body max-w-3xl">Custom width body text</p>
```

---

## ✅ Components Updated

The following components have been updated to use the standardized typography:

- ✅ `src/components/ProgramsOverview.tsx`
- ✅ `src/components/WhyCulturalIntelligenceSection.tsx`
- ✅ `src/components/USPBar.tsx`
- ✅ `src/components/ContactFormSection.tsx`
- ✅ `src/components/HeroSection.tsx`
- ✅ `src/components/StartTodayCTA.tsx`
- ✅ `src/app/workshops/page.tsx`
- ✅ `src/app/ai-training-data/page.tsx`

---

## 🔄 Migration Checklist

When updating other components, replace:

- `text-4xl md:text-5xl lg:text-6xl font-bold` → `text-title`
- `text-2xl md:text-3xl lg:text-4xl font-bold` → `text-subtitle`
- `text-xl md:text-2xl text-white/80 leading-relaxed` → `text-body`
- `text-base text-white/70 leading-relaxed` → `text-small`

---

## 📝 Notes

- All styles include `tracking-normal` for consistent letter spacing
- All styles are responsive (mobile → tablet → desktop)
- Body and small text include appropriate opacity for readability
- Max-width constraints are included in body text for optimal reading width

