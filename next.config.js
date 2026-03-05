const { withPayload } = require('@payloadcms/next');


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
}

module.exports = withPayload(nextConfig)
