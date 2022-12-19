// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXqm2X-BXQ2iWzNGCA1JGjgwKAu8mYzls",
  authDomain: "microblogging-app-76cb7.firebaseapp.com",
  projectId: "microblogging-app-76cb7",
  storageBucket: "microblogging-app-76cb7.appspot.com",
  messagingSenderId: "965797183963",
  appId: "1:965797183963:web:bc4715b9426a85957fe7fe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
