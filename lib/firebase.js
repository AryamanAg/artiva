import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "artivo-98563.firebaseapp.com",
  projectId: "artivo-98563",
  storageBucket: "artivo-98563.firebasestorage.app",
  messagingSenderId: "12868539717",
  appId: "1:12868539717:web:9c1f879520d9d0f3ba5a2c",
  measurementId: "G-NXHBJH7BE8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
