import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Replace these with your actual Firebase project settings
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "studio-omm-srimayee.firebaseapp.com",
  projectId: "studio-omm-srimayee",
  storageBucket: "studio-omm-srimayee.firebasestorage.app",
  messagingSenderId: "1006223740160",
  appId: "1:1006223740160:web:60edb4de85758a944cf7e5",
  measurementId: "G-78P7MPKEF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);