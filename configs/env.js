require('dotenv').config();

module.exports = env = {
  PORT: process.env.PORT || '3000',
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  DB_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  DEV_SECRET: process.env.DEV_SECRET,
};
