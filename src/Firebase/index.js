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
  apiKey: "AIzaSyCryHLTZQo-8ZruB_Fb9SCkAZR351rPdPA",
  authDomain: "espaciotemporal-153a1.firebaseapp.com",
  projectId: "espaciotemporal-153a1",
  storageBucket: "espaciotemporal-153a1.appspot.com",
  messagingSenderId: "151262089514",
  appId: "1:151262089514:web:ac01268130fc10901a4e53",
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
