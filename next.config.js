/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Image Optimization ────────────────────────────────────────────────────
  images: {
    formats: ['image/avif', 'image/webp'], // Serve AVIF first, then WebP
    deviceSizes: [640, 750, 828, 1080, 1200], // Trim unnecessary sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // ── Compression ──────────────────────────────────────────────────────────
  compress: true,

  // ── Bundle Analysis & Optimizations ─────────────────────────────────────
  experimental: {
    optimizeCss: false, // Keep false — can cause issues with Tailwind
    optimizePackageImports: ['next/font'],
  },

  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false
    }

    return config
  },

  // ── Headers for caching static assets ────────────────────────────────────
  async headers() {
    return [
      // ── OG image & static assets: long-lived cache ──
      {
        source: '/(.*)\\.(png|jpg|jpeg|gif|svg|ico|webp|avif|woff2|woff|ttf)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      // ── Main page: explicit crawler-friendly headers ──
      {
        source: '/',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
          { key: 'X-Robots-Tag', value: 'index, follow' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
