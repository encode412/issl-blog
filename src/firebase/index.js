import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDxQqoL6GcH4jAs3b6U5Q2KmrsdH9vTnFc",
  authDomain: "i-blog-2948d.firebaseapp.com",
  projectId: "i-blog-2948d",
  storageBucket: "i-blog-2948d.firebasestorage.app",
  messagingSenderId: "861248470788",
  appId: "1:861248470788:web:3bce7a0d6d1ce279bb1a51"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)