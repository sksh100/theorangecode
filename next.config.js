/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header for security and performance
  reactStrictMode: true, // Enable React strict mode for better performance
  
  // Image optimization
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'], // Modern formats for better compression
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Transpile packages that need it
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  
  // Experimental features for performance
  experimental: {
    optimizeCss: true, // Optimize CSS
    optimizePackageImports: ['lucide-react', 'framer-motion'], // Tree-shake unused exports
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk for node_modules
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Common chunk for shared code
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'async',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
            // Framer Motion separate chunk (large library)
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            // Three.js separate chunk (large library)
            three: {
              name: 'three',
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              chunks: 'all',
              priority: 30,
            },
          },
        },
      }
    }
    return config
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
