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
        // Brand Colors - Exact codes as requested
        'dark-blue': '#01011e',
        'orange': '#ff914d',
        'azure-blue': '#5ce1e6',
        'bright-blue': '#1f8bff',
        
        // Transparent versions with 32% transparency
        'orange-transparent': 'rgba(255, 145, 77, 0.32)',
        'azure-blue-transparent': 'rgba(92, 225, 230, 0.32)',
        'bright-blue-transparent': 'rgba(31, 139, 255, 0.32)',
        
        // Legacy color mappings for existing components
        'azure': '#5ce1e6',
        'darkAzure': '#5ce1e6',
        'primary-dark': '#01011e',
        'secondary-dark': '#1a1f3a',
        'accent-blue': '#1f8bff',
        'light-blue': '#5ce1e6',
        'glass-bg': 'rgba(92, 225, 230, 0.32)',
        'glass-border': 'rgba(92, 225, 230, 0.2)',
        
        // Text colors - All white as requested
        'text-primary': '#ffffff',
        'text-secondary': '#ffffff',
        'text-muted': '#ffffff',
        
        // Brand color aliases
        'brand-orange': '#ff914d',
        'brand-orange-transparent': 'rgba(255, 145, 77, 0.32)',
        'brand-azure': '#5ce1e6',
        'brand-azure-transparent': 'rgba(92, 225, 230, 0.32)',
        'brand-bright-blue': '#1f8bff',
        'brand-bright-blue-transparent': 'rgba(31, 139, 255, 0.32)',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'playfair': ['Montserrat', 'sans-serif'],
        'sofia': ['Montserrat', 'sans-serif'],
        'inter': ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #ff914d 0%, #5ce1e6 50%, #1f8bff 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #01011e 0%, #1a1f3a 50%, #5ce1e6 100%)',
        'gradient-azure': 'linear-gradient(135deg, #5ce1e6 0%, rgba(92, 225, 230, 0.8) 100%)',
        'gradient-bright-blue': 'linear-gradient(135deg, #1f8bff 0%, rgba(31, 139, 255, 0.8) 100%)',
        'gradient-orange': 'linear-gradient(135deg, #ff914d 0%, rgba(255, 145, 77, 0.8) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(92, 225, 230, 0.3)',
        'glow': '0 0 40px rgba(92, 225, 230, 0.3)',
        'glow-orange': '0 0 40px rgba(255, 145, 77, 0.3)',
        'glow-azure': '0 0 40px rgba(92, 225, 230, 0.3)',
        'glow-bright-blue': '0 0 40px rgba(31, 139, 255, 0.3)',
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
