import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useContext, useState } from "react";
import { Context } from "../Context";

export default function Header() {
  const { signInWithGoogle, user, handleSignOut } = useContext(Context);

  return (
    <div className="header">
      <h1 className="header__heading">
        <img alt="brand logo" src="./doneall.svg"></img>bigTO-DO
      </h1>

      {user && (
        <div className="header__right">
          <h2>Welcome {user.displayName}</h2>
          <h1
            onClick={handleSignOut}
            className="header__heading header__heading-logout "
          >
            <img className="icon--logout" src="./logout.svg"></img>
            Logout
          </h1>
        </div>
      )}
    </div>
  );
}
