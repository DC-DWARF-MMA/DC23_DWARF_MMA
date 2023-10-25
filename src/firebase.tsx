// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAFDshSrRyeFuHJAdzEJbsgnehKRjb32a8",
    authDomain: "dwarf-mma.firebaseapp.com",
    projectId: "dwarf-mma",
    storageBucket: "dwarf-mma.appspot.com",
    messagingSenderId: "457788378456",
    appId: "1:457788378456:web:de2402149f2b51c92fe92d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);