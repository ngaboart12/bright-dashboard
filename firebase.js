// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import { getDatabase, ref, push as pushToDb } from 'firebase/database';
import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWWHl4eL_lAyjrFO2vV32J4M7e8YTDixI",
  authDomain: "brightforth-34e5d.firebaseapp.com",
  projectId: "brightforth-34e5d",
  storageBucket: "brightforth-34e5d.appspot.com",
  messagingSenderId: "282909347050",
  appId: "1:282909347050:web:354401a7f5a52d55db5b93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const dbr = getDatabase(app);
export  {  ref, pushToDb };