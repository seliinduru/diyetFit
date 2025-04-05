// FirebaseConfig.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCU-UXUH885zp5L2a0AELOP6DVHsZ6g8uI",
  authDomain: "diyetfit-5cd06.firebaseapp.com",
  projectId: "diyetfit-5cd06",
  storageBucket: "diyetfit-5cd06.appspot.com",
  messagingSenderId: "837557736661",
  appId: "1:837557736661:web:07e621adef8e0ae8f8be5c",
  measurementId: "G-8DBPCNJKSR"
};

// Eğer Firebase daha önce başlatılmadıysa başlat
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Eğer auth daha önce başlatılmadıysa initializeAuth kullan, yoksa getAuth
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}

export { auth };
