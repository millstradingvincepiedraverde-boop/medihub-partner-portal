// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSVs_lDkdCE6001JsQ9kjlRHHTZ4e-BA0",
  authDomain: "medihub-seller-portal.firebaseapp.com",
  projectId: "medihub-seller-portal",
  storageBucket: "medihub-seller-portal.firebasestorage.app",
  messagingSenderId: "367991388278",
  appId: "1:367991388278:web:c4fd4d6370a190fe848757",
  measurementId: "G-L4XWVDVPXD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);