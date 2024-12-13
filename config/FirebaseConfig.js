// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7tKdfcaQGNKcJuZggaV9JjXLlrXby2Po",
  authDomain: "easylocateug.firebaseapp.com",
  projectId: "easylocateug",
  storageBucket: "easylocateug.firebasestorage.app",
  messagingSenderId: "824750694423",
  appId: "1:824750694423:web:4d9d59f32f818bd9d5fc52"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//initialize database
export const db = getFirestore(app);

//initialize storage
export const storage = getStorage(app);
