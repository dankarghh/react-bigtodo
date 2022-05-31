import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZoR4WRQhaOmFJqdh8TlMMCC5v3EstMzo",
  authDomain: "big-to-do.firebaseapp.com",
  projectId: "big-to-do",
  storageBucket: "big-to-do.appspot.com",
  messagingSenderId: "70615735434",
  appId: "1:70615735434:web:41552186ed27a3890be173",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

// export function signInWithGoogle() {
//   signInWithPopup(auth, provider)
//     .then(result => {
//       const name = result.user.displayName;
//       const email = result.user.email;
//       const profilePic = result.user.photoURL;
//     })
//     .catch(error => console.log(error));
// }
