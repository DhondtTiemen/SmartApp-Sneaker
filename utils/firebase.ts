// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTrVNzjkniQ7aSkQpHXwUi8yHg7wT-UtU",
  authDomain: "smartapp-eindopdracht-24587.firebaseapp.com",
  projectId: "smartapp-eindopdracht-24587",
  storageBucket: "smartapp-eindopdracht-24587.appspot.com",
  messagingSenderId: "574837060824",
  appId: "1:574837060824:web:01859bf77f15f4c4df93ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);