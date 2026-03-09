import express from 'express';
import payload from 'payload';
import next from 'next';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const nextApp = next({
  dev: process.env.NODE_ENV !== 'production',
});
const nextHandler = nextApp.getRequestHandler();

const start = async () => {
  await nextApp.prepare();

  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  app.use((req, res) => nextHandler(req, res));

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

start();
