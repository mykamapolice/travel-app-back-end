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
const PORT = process.env.SERVER_PORT || 3000;

const TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'superIssuer';
const TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'superSecret';

const SERVER = {
  hostname: HOST,
  port: PORT,
  token: {
    expireTime: TOKEN_EXPIRETIME,
    issuer: TOKEN_ISSUER,
    secret: TOKEN_SECRET,
  },
};

const config = {
  mongo: MONGO,
  server: SERVER,
};

export default config;
