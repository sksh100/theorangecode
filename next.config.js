/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header for security and performance
  reactStrictMode: true, // Enable React strict mode for better performance
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    formats: ['image/avif', 'image/webp'], // Modern formats for better compression
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Transpile packages that need it
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  
  // Tree-shake unused exports from large packages
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  async rewrites() {
    return [
      { source: '/favicon.ico', destination: '/flavicon/favicon.ico' },
      { source: '/favicon-16x16.png', destination: '/flavicon/favicon-16x16.png' },
      { source: '/favicon-32x32.png', destination: '/flavicon/favicon-32x32.png' },
      { source: '/apple-touch-icon.png', destination: '/flavicon/apple-touch-icon.png' },
      { source: '/android-chrome-192x192.png', destination: '/flavicon/android-chrome-192x192.png' },
      { source: '/android-chrome-512x512.png', destination: '/flavicon/android-chrome-512x512.png' },
    ];
  },
  async redirects() {
    return [
      {
        source: '/preview',
        destination: '/',
        permanent: true,
      },
      {
        source: '/coming-soon',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
