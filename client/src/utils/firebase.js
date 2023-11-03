// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAuCgf4zwPtnyjPz6DIVOFGlDL8KxPLLSI',
  authDomain: 'english-app-be579.firebaseapp.com',
  projectId: 'english-app-be579',
  storageBucket: 'english-app-be579.appspot.com',
  messagingSenderId: '953563554269',
  appId: '1:953563554269:web:7a28977c855788dcb51634',
  measurementId: 'G-GMG1V37QVJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
