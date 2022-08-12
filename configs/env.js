require('dotenv').config();

module.exports = env = {
  port: process.env.PORT,
  saltRounds: process.env.SALT_ROUNDS,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
};
