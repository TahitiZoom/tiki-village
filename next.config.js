const { withPayload } = require('@payloadcms/next/withPayload');

module.exports = withPayload({
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['cms.tikivillage.pf'],
    },
  },
});
