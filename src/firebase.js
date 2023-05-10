// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNMvmQIehNIcmYJARTy4ChzAsnVKL2EjQ",
  authDomain: "realstate-react-dfedc.firebaseapp.com",
  projectId: "realstate-react-dfedc",
  storageBucket: "realstate-react-dfedc.appspot.com",
  messagingSenderId: "284512118816",
  appId: "1:284512118816:web:bea5d2094721c6eaa53445"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();