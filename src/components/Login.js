import React, { useContext } from "react";
import { Context } from "../Context";

function Login() {
  const { signInWithGoogle } = useContext(Context);
  return (
    <div className="login">
      <form className="login__form">
        <h1>Already have an account ?</h1>
        <input
          className="login__form-input"
          type="email"
          placeholder="Email Address"
        ></input>
        <input
          className="login__form-input"
          type="password"
          placeholder="Password"
        ></input>
        <button type="button" className="btn btn-primary btn--login">
          Sign In
        </button>
        <p>Don't have an Account?</p>
        <button
          type="button"
          onClick={signInWithGoogle}
          className="btn btn--login btn--login-blue "
        >
          Sign in with Google
        </button>
        <p>OR</p>
        <button type="button" className="btn btn--login btn-secondary">
          Create New Account
        </button>
      </form>
    </div>
  );
}

export default Login;
