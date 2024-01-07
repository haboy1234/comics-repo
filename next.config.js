/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.isu.pub',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
