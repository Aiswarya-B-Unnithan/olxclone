import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAMP-DuzGnXUOZW3R6GmsD5RzpzxyoAaJ8",
  authDomain: "olxclone-35aca.firebaseapp.com",
  projectId: "olxclone-35aca",
  storageBucket: "olxclone-35aca.appspot.com",
  messagingSenderId: "67721156101",
  appId: "1:67721156101:web:6899a777d9f6d1d86d2e6c",
  measurementId: "G-J2FWBHQJN3",
};

const Firebase = initializeApp(firebaseConfig);

const auth = getAuth(Firebase);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(Firebase);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(Firebase);
export { Firebase, auth, db, storage };
