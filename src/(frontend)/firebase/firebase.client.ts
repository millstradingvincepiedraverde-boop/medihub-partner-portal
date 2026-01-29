import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSVs_lDkdCE6001JsQ9kjlRHHTZ4e-BA0",
  authDomain: "medihub-seller-portal.firebaseapp.com",
  projectId: "medihub-seller-portal",
  storageBucket: "medihub-seller-portal.firebasestorage.app",
  messagingSenderId: "367991388278",
  appId: "1:367991388278:web:c4fd4d6370a190fe848757",
  measurementId: "G-L4XWVDVPXD"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);