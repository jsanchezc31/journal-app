// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcFxrnrPq5xBYbnKoevn2tMiDrmSy29Ew",
  authDomain: "react-examples-82bd0.firebaseapp.com",
  projectId: "react-examples-82bd0",
  storageBucket: "react-examples-82bd0.appspot.com",
  messagingSenderId: "744310222458",
  appId: "1:744310222458:web:18515139197046e2a755c3"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
