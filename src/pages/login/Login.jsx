import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useHistory } from "react-router-dom";
import styles from "./Login.module.css";
import firebase from "firebase/app";
import "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const { login, error, isPending } = useLogin();
  const history = useHistory(); // Initialize useHistory

  const handleClick = () => {
    setForgotPassword(!forgotPassword);
    setPassword("");
  };

  const handleResetPassword = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      console.log("Password reset email sent.");
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };

  const handleSignupClick = () => {
    // Programmatically navigate to the signup page
    history.push("/signup");
    window.location.reload(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (forgotPassword) {
      handleResetPassword();
    } else {
      login(email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles["login-form"]}>
      <h2>{forgotPassword ? "Forgot Password" : "Login"}</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      {!forgotPassword && (
        <label>
          <span>Password:</span>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
      )}
      {!isPending && (
        <button className={styles.btn}>
          {forgotPassword ? "Reset Password" : "Login"}
        </button>
      )}
      {isPending && (
        <button className="btn" disabled>
          Loading
        </button>
      )}
      {!forgotPassword && (
        <button className={styles.btn1} onClick={handleClick}>
          Forgot Password?
        </button>
      )}
      <button className={styles.btn1} onClick={handleSignupClick}>
        New User? Signup Instead
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
