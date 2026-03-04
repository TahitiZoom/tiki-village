/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
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
