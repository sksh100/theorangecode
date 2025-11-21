/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
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
    ];
  },
};

module.exports = nextConfig;
