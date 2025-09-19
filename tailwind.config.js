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
        // Brand Colors - Enhanced for luminous effect
        'dark-blue': '#01011e',
        'orange': '#ff914d',
        'azure-blue': '#00d4ff',        // More vibrant cyan
        'bright-blue': '#0099ff',       // More vibrant blue
        
        // Luminous versions with enhanced glow
        'azure-luminous': '#00ffff',    // Bright cyan for glow
        'blue-luminous': '#0088ff',     // Bright blue for glow
        'orange-luminous': '#ffaa00',   // Bright orange for glow
        
        // Transparent versions with enhanced opacity
        'orange-transparent': 'rgba(255, 145, 77, 0.4)',
        'azure-blue-transparent': 'rgba(0, 212, 255, 0.4)',
        'bright-blue-transparent': 'rgba(0, 153, 255, 0.4)',
        
        // Legacy color mappings for existing components
        'azure': '#00d4ff',
        'darkAzure': '#00d4ff',
        'primary-dark': '#01011e',
        'secondary-dark': '#0a0e27',
        'accent-blue': '#0099ff',
        'light-blue': '#00d4ff',
        'glass-bg': 'rgba(0, 212, 255, 0.15)',
        'glass-border': 'rgba(0, 212, 255, 0.3)',
        
        // Text colors - All white as requested
        'text-primary': '#ffffff',
        'text-secondary': '#ffffff',
        'text-muted': '#ffffff',
        
        // Brand color aliases
        'brand-orange': '#ff914d',
        'brand-orange-transparent': 'rgba(255, 145, 77, 0.4)',
        'brand-azure': '#00d4ff',
        'brand-azure-transparent': 'rgba(0, 212, 255, 0.4)',
        'brand-bright-blue': '#0099ff',
        'brand-bright-blue-transparent': 'rgba(0, 153, 255, 0.4)',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'playfair': ['Montserrat', 'sans-serif'],
        'sofia': ['Montserrat', 'sans-serif'],
        'inter': ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #ff914d 0%, #00d4ff 50%, #0099ff 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #01011e 0%, #0a0e27 50%, #00d4ff 100%)',
        'gradient-azure': 'linear-gradient(135deg, #00d4ff 0%, rgba(0, 212, 255, 0.8) 100%)',
        'gradient-bright-blue': 'linear-gradient(135deg, #0099ff 0%, rgba(0, 153, 255, 0.8) 100%)',
        'gradient-orange': 'linear-gradient(135deg, #ff914d 0%, rgba(255, 145, 77, 0.8) 100%)',
        'gradient-luminous': 'linear-gradient(135deg, #00ffff 0%, #00d4ff 30%, #0099ff 70%, #ff914d 100%)',
        'gradient-wave': 'radial-gradient(ellipse at top right, rgba(0, 212, 255, 0.3) 0%, rgba(0, 153, 255, 0.2) 30%, transparent 70%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 212, 255, 0.4)',
        'glow': '0 0 60px rgba(0, 212, 255, 0.5)',
        'glow-orange': '0 0 60px rgba(255, 145, 77, 0.5)',
        'glow-azure': '0 0 60px rgba(0, 212, 255, 0.5)',
        'glow-bright-blue': '0 0 60px rgba(0, 153, 255, 0.5)',
        'glow-luminous': '0 0 80px rgba(0, 255, 255, 0.6), 0 0 120px rgba(0, 212, 255, 0.3)',
        'glow-wave': '0 0 100px rgba(0, 212, 255, 0.4), 0 0 200px rgba(0, 153, 255, 0.2)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'sparkle': 'sparkle 15s linear infinite',
        'fadeInUp': 'fadeInUp 0.8s ease forwards',
        'wave': 'wave 20s ease-in-out infinite',
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
        wave: {
          '0%, 100%': { 
            transform: 'translateX(0px) translateY(0px) scale(1)',
            opacity: '0.3'
          },
          '25%': { 
            transform: 'translateX(20px) translateY(-10px) scale(1.1)',
            opacity: '0.5'
          },
          '50%': { 
            transform: 'translateX(-10px) translateY(15px) scale(0.9)',
            opacity: '0.4'
          },
          '75%': { 
            transform: 'translateX(15px) translateY(-5px) scale(1.05)',
            opacity: '0.6'
          },
        },
      },
    },
  },
  plugins: [],
}
