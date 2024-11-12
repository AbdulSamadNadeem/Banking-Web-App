import { initializeApp } from "firebase/app";
import { getAuth ,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged ,signOut } from "firebase/auth";
import { getFirestore,collection,addDoc,getDoc,doc, setDoc,getDocs  ,updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYw6QiiHWv1pmwRyrwQgLrgSarNa9oxG0",
  authDomain: "banking-web-app-215ee.firebaseapp.com",
  projectId: "banking-web-app-215ee",
  storageBucket: "banking-web-app-215ee.firebasestorage.app",
  messagingSenderId: "767186216811",
  appId: "1:767186216811:web:77ed1384e8321bc413ce2e",
  measurementId: "G-9PRT8LYT6X"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export{auth , createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged , addDoc ,db , getDoc ,doc , setDoc,signOut , collection , getDocs  ,updateDoc}