const { withPayload } = require('@payloadcms/next/withPayload');

module.exports = withPayload({
  output: 'standalone',
  reactStrictMode: true,
});
