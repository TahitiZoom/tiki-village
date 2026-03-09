import express from 'express';
import payload from 'payload';
import path from 'path';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// On importe le serveur standalone généré par Next.js
const nextServer = require('./server.js');

const start = async () => {
  // Initialise Payload CMS
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Next.js standalone gère toutes les routes front
  app.use((req, res) => nextServer(req, res));

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

start();
