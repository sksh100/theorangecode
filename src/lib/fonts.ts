import localFont from 'next/font/local'

export const lato = localFont({
  src: '../../fonts/Lato-Regular.ttf',
  variable: '--font-lato',
  weight: '400',
  style: 'normal',
  display: 'swap', // Prevents invisible text during font load
  preload: true, // Preload font for faster rendering
  fallback: ['system-ui', 'arial'], // Fallback fonts
  adjustFontFallback: true, // Adjust fallback font metrics
})

