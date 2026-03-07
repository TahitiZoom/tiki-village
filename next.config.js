const path = require('path');
const { withPayload } = require('@payloadcms/next/withPayload');

module.exports = withPayload({
  output: 'standalone',
  reactStrictMode: true,

  experimental: {
    serverActions: {
      allowedOrigins: ['cms.tikivillage.pf'],
    },
  },

  webpack: (config) => {
    config.resolve.alias['@payload-config'] = path.resolve('./payload.config.ts');
    return config;
  },
});
