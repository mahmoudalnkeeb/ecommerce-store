// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getAnalytics } = require('firebase/analytics');
const {
  FB_API_KEY,
  FB_AUTH_DOMAIN,
  FB_PROJECT_ID,
  FB_STORAGE_BUCKET,
  FB_MASSAGING_SENDER_ID,
  FB_APP_ID,
  FB_MEASURMENT_ID,
} = require('./env');

const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: FB_AUTH_DOMAIN,
  projectId: FB_PROJECT_ID,
  storageBucket: FB_STORAGE_BUCKET,
  messagingSenderId: FB_MASSAGING_SENDER_ID,
  appId: FB_APP_ID,
  measurementId: FB_MEASURMENT_ID,
};

// console.log(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

module.exports = app;
