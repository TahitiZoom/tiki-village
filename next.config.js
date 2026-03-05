const { withPayload } = require('@payloadcms/next/plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
}

module.exports = withPayload(nextConfig)
