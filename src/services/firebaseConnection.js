import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjLT21271rdMMlUXRLlVGKC71QMYoixaQ",
  authDomain: "react-links-3a80d.firebaseapp.com",
  projectId: "react-links-3a80d",
  storageBucket: "react-links-3a80d.firebasestorage.app",
  messagingSenderId: "351430794984",
  appId: "1:351430794984:web:1b4a4341f30ca2c3eeb35d",
  measurementId: "G-E9RW5XTYBM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };