// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "moodle-cleaner-ef812.firebaseapp.com",
  projectId: "moodle-cleaner-ef812",
  storageBucket: "moodle-cleaner-ef812.firebasestorage.app",
  messagingSenderId: "338216040238",
  appId: "1:338216040238:web:23672387e791e38dd52cbf",
  measurementId: "G-S6TP5G8YC6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
