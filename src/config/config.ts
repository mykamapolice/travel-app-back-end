import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  autoIndex: false,
  retryWrites: false,
};

const MONGO_USER_NAME = process.env.MONGO_USER_NAME || 'svdfsdev';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'rs-team-41';
const MONGO_HOST =
  process.env.MONGO_URL ||
  'travel-app.nkkga.mongodb.net/travel-app?retryWrites=true&w=majority';

const MONGO = {
  host: MONGO_HOST,
  username: MONGO_USER_NAME,
  password: MONGO_PASSWORD,
  options: MONGO_OPTIONS,
  url: `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
};

const HOST = process.env.SERVER_HOSTNAME || 'localhost';
const PORT = process.env.SERVER_PORT || 5000;

const SERVER = {
  hostname: HOST,
  port: PORT,
};

const config = {
  mongo: MONGO,
  server: SERVER,
};

export default config;
