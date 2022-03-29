// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import { getStorage, uploadBytes } from "firebase/storage";
import {
  getAuth,
  signInWithCustomToken,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaroAJnDRLEKc_hbI_ZJaWnhCIM3QqVvM",
  authDomain: "espacio-temporal-9a372.firebaseapp.com",
  projectId: "espacio-temporal-9a372",
  storageBucket: "espacio-temporal-9a372.appspot.com",
  messagingSenderId: "653454338816",
  appId: "1:653454338816:web:b6a1645be58774251c21e5",
  measurementId: "G-6V07RG64PP",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const auth = getAuth();

export const uploadBytesfunciont = uploadBytes;
export {
  storage,
  auth,
  signInWithCustomToken,
  firebaseApp as default,
  onAuthStateChanged,
  signOut,
};
