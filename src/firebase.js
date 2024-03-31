import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: 'horawatch-1b080.firebaseapp.com',
  projectId: 'horawatch-1b080',
  storageBucket: 'horawatch-1b080.appspot.com',
  messagingSenderId: '607975404508',
  appId: '1:607975404508:web:f311ac8773ba73b48c1519',
  measurementId: 'G-JKH76KHYBT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
