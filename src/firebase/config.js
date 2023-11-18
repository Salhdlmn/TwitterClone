// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAF3dH_Yutkt16MjHwp0mz1G2dlvEVW-Ws",
  authDomain: "twitter-76809.firebaseapp.com",
  projectId: "twitter-76809",
  storageBucket: "twitter-76809.appspot.com",
  messagingSenderId: "586314795170",
  appId: "1:586314795170:web:da83ce763f640185092ffb",
};

const app = initializeApp(firebaseConfig);

// yetkilendirme kurulumu
export const auth = getAuth(app);

// google sağlyıcı kurulumu
export const googleProvider = new GoogleAuthProvider();

// github sağlıyı kurulumu

// veritabanı kurulum
export const db = getFirestore(app);

// medaya depolama laanı kurulumu
export const storage = getStorage(app);
