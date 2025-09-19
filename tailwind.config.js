/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'azure': '#3b82f6',
        'darkAzure': '#1e3a8a',
        'primary-dark': '#0a0e27',
        'secondary-dark': '#1a1f3a',
        'accent-blue': '#1e3a8a',
        'bright-blue': '#3b82f6',
        'light-blue': '#60a5fa',
        'glass-bg': 'rgba(30, 58, 138, 0.1)',
        'glass-border': 'rgba(96, 165, 250, 0.2)',
        'text-primary': '#ffffff',
        'text-secondary': '#cbd5e1',
        'text-muted': '#94a3b8',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'sofia': ['Sofia Pro', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #1e3a8a 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(30, 58, 138, 0.3)',
        'glow': '0 0 40px rgba(59, 130, 246, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'sparkle': 'sparkle 15s linear infinite',
        'fadeInUp': 'fadeInUp 0.8s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-30px) rotate(120deg)' },
          '66%': { transform: 'translateY(20px) rotate(240deg)' },
        },
        sparkle: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-200px)' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
