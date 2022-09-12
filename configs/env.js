require('dotenv').config();
let dbUrl = process.env.DATABASE_URL;
if (process.env.ENV == 'dev') dbUrl = process.env.DEV_DATABASE_URL;

module.exports = env = {
  PORT: process.env.PORT || '3000',
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  DB_URL: dbUrl,
  JWT_SECRET: process.env.JWT_SECRET,
  DEV_SECRET: process.env.DEV_SECRET,
  MODERATOR_SECRET: process.env.MODERATOR_SECRET,
  // firebase env vars
  FB_API_KEY: process.env.FB_API_KEY,
  FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN,
  FB_PROJECT_ID: process.env.FB_PROJECT_ID,
  FB_STORAGE_BUCKET:process.env.FB_STORAGE_BUCKET,
  FB_MASSAGING_SENDER_ID:process.env.FB_MASSAGING_SENDER_ID,
  FB_APP_ID:process.env.FB_APP_ID,
  FB_MEASURMENT_ID:process.env.FB_MEASURMENT_ID
};
