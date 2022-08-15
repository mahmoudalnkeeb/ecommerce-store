require('dotenv').config();
let dbUrl = process.env.DATABASE_URL;
if (process.env.ENV == 'dev') dbUrl = process.env.DEV_DATABASE_URL;

module.exports = env = {
  PORT: process.env.PORT || '3000',
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  DB_URL: dbUrl,
  JWT_SECRET: process.env.JWT_SECRET,
  DEV_SECRET: process.env.DEV_SECRET
};
