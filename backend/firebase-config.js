import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
dotenv.config();

export const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGS_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

const firestore_app = initializeApp(firebaseConfig);
const db = getFirestore(firestore_app);


export default db