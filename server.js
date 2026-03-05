const express = require('express');
const payload = require('payload');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();

(async () => {
  // Initialise Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    mongoURL: process.env.DATABASE_URI,
    onInit: () => {
      console.log('Payload CMS initialized');
    },
  });

  // Prépare Next.js
  await nextApp.prepare();

  // Toutes les autres routes → Next.js
  app.use((req, res) => handle(req, res));

  app.listen(port, () => {
    console.log(`Server ready on http://localhost:${port}`);
  });
})();
