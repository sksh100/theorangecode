# Your Luxury Agent - TypeScript/Next.js

A modern, luxurious coming-soon page built with Next.js 14, TypeScript, and Tailwind CSS. This project features glass-morphism design, smooth animations, and a professional form submission system.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Glass-morphism Design**: Beautiful translucent cards with backdrop blur
- **Smooth Animations**: Framer Motion for fluid interactions
- **Form Validation**: Real-time validation with error handling
- **API Integration**: Serverless function for form submissions
- **Responsive Design**: Mobile-first approach with perfect scaling
- **Performance Optimized**: Fast loading with Next.js optimizations
- **SEO Ready**: Meta tags and structured data
- **Accessibility**: WCAG compliant with keyboard navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Convert to TypeScript/Next.js"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and deploy

### Manual Deployment

```bash
npm run build
npm run start
```

## 🎨 Customization

### Colors
The project uses custom Tailwind colors defined in `tailwind.config.js`:
- `azure`: #3b82f6
- `darkAzure`: #1e3a8a
- Custom glass-morphism colors

### Content
- **Hero Section**: Edit `src/components/HeroSection.tsx`
- **Form Fields**: Modify `src/components/InterestForm.tsx`
- **Styling**: Update `src/app/globals.css`

### API Endpoint
Form submissions are handled by `src/app/api/submit-form/route.ts`

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── submit-form/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Background.tsx
│   ├── Footer.tsx
│   ├── FormSection.tsx
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── InterestForm.tsx
│   └── SuccessMessage.tsx
└── lib/
public/
├── hero-page/
│   └── hero-2.jpg
└── ...
```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## 🌟 Key Improvements from HTML Version

1. **Type Safety**: Full TypeScript support
2. **Component Architecture**: Reusable React components
3. **Modern Build System**: Next.js with optimizations
4. **Better Performance**: Code splitting and lazy loading
5. **Enhanced UX**: Smooth animations and transitions
6. **Developer Experience**: Hot reloading and error boundaries
7. **SEO Optimization**: Server-side rendering capabilities
8. **Scalability**: Easy to extend and maintain

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Your Luxury Agent** - Experience the future of luxury with AI-powered precision