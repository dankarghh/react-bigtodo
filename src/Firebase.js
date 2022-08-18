// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEVfjROa1aYzkju9rhfmbqQgsrFAfh2FY",
  authDomain: "bigtodo-ls.firebaseapp.com",
  projectId: "bigtodo-ls",
  storageBucket: "bigtodo-ls.appspot.com",
  messagingSenderId: "568712249001",
  appId: "1:568712249001:web:052402bf4763a91fd233b8",
  measurementId: "G-LEHDB41BYC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export function signInWithGoogle() {
  signInWithPopup(auth, provider)
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
}
