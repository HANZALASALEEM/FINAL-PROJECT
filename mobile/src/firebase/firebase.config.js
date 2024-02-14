// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAEgweJHDKF_B_SHeZe4v7BgrEYm2CBrv4',
  authDomain: 'suffah-model-school-fed72.firebaseapp.com',
  projectId: 'suffah-model-school-fed72',
  storageBucket: 'suffah-model-school-fed72.appspot.com',
  messagingSenderId: '46075682266',
  appId: '1:46075682266:web:4a5d31c11f9b089b38b4e3',
  measurementId: 'G-JN75VETP1E',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Check if Firebase Analytics is supported
// if (!analytics.isSupported()) {
//   console.log('environment not supported');
// }
