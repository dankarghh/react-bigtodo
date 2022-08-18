import React from "react";
import { signInWithGoogle } from "../AuthContext";

function Login() {
  return (
    <div>
      <button onClick={signInWithGoogle}>LOGIN</button>
    </div>
  );
}

export default Login;
