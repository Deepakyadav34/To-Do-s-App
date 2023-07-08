// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP3ELgnxfJCy4Tg4p_yab3jFZ9VWViPy4",
  authDomain: "todo-app-32588.firebaseapp.com",
  projectId: "todo-app-32588",
  storageBucket: "todo-app-32588.appspot.com",
  messagingSenderId: "797689009053",
  appId: "1:797689009053:web:1c315e5fb56c4c324b9574"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app)