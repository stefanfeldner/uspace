import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_API_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_API_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_API_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_API_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_API_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_API_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage();
