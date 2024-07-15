// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-ac199.firebaseapp.com",
  projectId: "mern-blog-ac199",
  storageBucket: "mern-blog-ac199.appspot.com",
  messagingSenderId: "129251478525",
  appId: "1:129251478525:web:6fc81e96b78b0d3691a794",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
