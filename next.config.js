/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  compiler: {
    styledComponents: true
  },
  images: {
    domains: [
      'strapi.centralparktours.com',
      'centralparktours.net',
      'centralparktours.com',
      'centralparktours.org',
      'new.centralparktours.net',
      'res.cloudinary.com',
      'localhost'
    ],
    formats: ['image/avif', 'image/webp'],
  },
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://strapi.centralparktours.com/api/:path*',
      },
      {
        source: '/bike-rentals',
        destination: '/tours/bike-rentals',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/tours/bike-rentals',
        destination: '/bike-rentals',
        permanent: true
      },
    ]
  },
}

module.exports = nextConfig;
