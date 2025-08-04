// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// these are all public keys so we can expose them.
const firebaseConfig = {
  apiKey: "AIzaSyCI6yK_xa5PkLOXjkTqjhFf6HhCFxC9bWo",
  authDomain: "paytm-3056a.firebaseapp.com",
  projectId: "paytm-3056a",
  storageBucket: "paytm-3056a.firebasestorage.app",
  messagingSenderId: "182515336101",
  appId: "1:182515336101:web:d9d40dedf54d8f21615e4c",
  measurementId: "G-4BDSH7Q07P"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
auth.useDeviceLanguage();