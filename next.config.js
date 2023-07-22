/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'random.imagecdn.app',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'gateway.pinata.cloud',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'scarlet-brilliant-roundworm-590.mypinata.cloud',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
