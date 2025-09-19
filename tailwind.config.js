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
        'azure': '#ff914d',
        'darkAzure': '#ff914d',
        'primary-dark': '#01011e',
        'secondary-dark': '#1a1f3a',
        'accent-blue': '#ff914d',
        'bright-blue': '#ff914d',
        'light-blue': '#ff914d',
        'glass-bg': 'rgba(255, 145, 77, 0.32)',
        'glass-border': 'rgba(255, 145, 77, 0.2)',
        'text-primary': '#ffffff',
        'text-secondary': '#cbd5e1',
        'text-muted': '#94a3b8',
        'brand-orange': '#ff914d',
        'brand-orange-transparent': 'rgba(255, 145, 77, 0.32)',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'sofia': ['Sofia Pro', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #ff914d 0%, #ff914d 50%, rgba(255, 145, 77, 0.8) 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #01011e 0%, #1a1f3a 50%, #ff914d 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(255, 145, 77, 0.3)',
        'glow': '0 0 40px rgba(255, 145, 77, 0.3)',
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
