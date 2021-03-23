import dotenv from 'dotenv';

dotenv.config();

enum Mongo {
  user = 'svdfsdev',
  password = 'rs-team-41',
  host = 'travel-app.nkkga.mongodb.net/travel-app?retryWrites=true&w=majority',
}

enum Token {
  expireTime = 3600,
  issuer = 'superIssuer',
  secret = 'superSecret',
}

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  autoIndex: false,
  retryWrites: false,
};

const MONGO_USER_NAME = process.env.MONGO_USER_NAME || Mongo.user;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || Mongo.password;
const MONGO_HOST = process.env.MONGO_URL || Mongo.host;

const MONGO = {
  host: MONGO_HOST,
  username: MONGO_USER_NAME,
  password: MONGO_PASSWORD,
  options: MONGO_OPTIONS,
  url: `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
};

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3001;

const TOKEN_EXPIRETIME =
  process.env.SERVER_TOKEN_EXPIRETIME || Token.expireTime;
const TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || Token.issuer;
const TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || Token.secret;

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
