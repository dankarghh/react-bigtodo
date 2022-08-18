import { signInWithGoogle } from "../Firebase";

export default function Header() {
  return (
    <div className="header">
      <h1 className="header__heading">
        <img alt="" src="./doneall.svg"></img>bigTO-DO
      </h1>
      <button className="btn" onClick={signInWithGoogle}>
        Sign In
      </button>
    </div>
  );
}
