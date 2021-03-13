import http from 'http';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import mongoose from 'mongoose';
import countriesRoutes from './routes/countries';

const NAMESPACE = 'Server';
const app = express();

mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then((res) => logging.info(NAMESPACE, 'Connected to mongoDB'))
  .catch((err) => logging.error(NAMESPACE, err.message, err));

app.use((req, res, next) => {
  logging.info(
    NAMESPACE,
    `METHOD - [${req.method}], URL - [${req.url}], IP -[${req.socket.remoteAddress}]`
  );

  req.on('finish', () => {
    logging.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP -[${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
    );
  });

  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');

    return res.status(200).json({});
  }

  next();
});

app.use('/api', countriesRoutes);

app.use((req, res, next) => {
  const err = new Error('not found');

  return res.status(404).json({ message: err.message });
});

const server = http.createServer(app);
const host = config.server.hostname;
const port = config.server.port;

server.listen(config.server.port, () => {
  logging.info(NAMESPACE, `Server runnig on ${host}:${port}`);
});
