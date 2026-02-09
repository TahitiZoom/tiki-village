/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    reactCompiler: false,
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        '*.app.github.dev',
        'ideal-doodle-pjrww4947w2jpr-3000.app.github.dev',
      ],
    },
  },
}

module.exports = nextConfig
