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

  // ── Headers for caching static assets ────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)\\.(png|jpg|jpeg|gif|svg|ico|webp|avif|woff2|woff|ttf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
