import React, { useState, useEffect } from "react";

import { useLogin } from "../../hooks/useLogin";

import { useHistory } from "react-router-dom";

import styles from "./Login.module.css";

import firebase from "firebase/app";

import "firebase/auth";

import { useCollection } from "../../hooks/useCollection";

import { useDocument } from "../../hooks/useDocument";

import { useAuthContext } from "../../hooks/useAuthContext";

export default function Login() {
  const [isRegistrationAllowed, setRegistrationAllowed] = useState(false);

  const { documents, error: electiveError } = useCollection("settings");

  useEffect(() => {
    // Fetch the registration status from Firestore

    const fetchRegistrationStatus = async () => {
      try {
        // console.log("try loop is visited");

        // console.log(documents); // Assuming you have the ID of the document you want to find

        const targetDocumentId = "J6fiB89VZ6qN1O3QrQu9"; // Find the document by ID

        const targetDocument = documents.find(
          (doc) => doc.id === targetDocumentId
        );

        if (targetDocument) {
          const registrationAllowed = targetDocument.regAllow; // Perform any further actions based on the document data

          // console.log("registrationAllowed", registrationAllowed);

          setRegistrationAllowed(registrationAllowed);

          // console.log("isRegistrationAllowed", isRegistrationAllowed);
        } else {
          console.error(`Document with ID ${targetDocumentId} not found.`);
        }
      } catch (error) {
        console.error("Error fetching registration status:", error);
      }
    };

    fetchRegistrationStatus();
  }, [documents]);

  // console.log(isRegistrationAllowed);

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
    if (email) {
      try {
        // Display a confirmation dialog

        const isConfirmed = window.confirm(
          `Are you sure you want to reset the password for ${email}?`
        );

        if (isConfirmed) {
          // If confirmed, send the password reset email

          await firebase.auth().sendPasswordResetEmail(email);

          // console.log("Password reset email sent.");
        } else {
          // console.log("Password reset canceled.");
        }
      } catch (error) {
        console.error("Error sending password reset email:", error);
      }
    } else {
      console.error("Please enter a valid email address.");
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

  return isRegistrationAllowed ? (
    <form onSubmit={handleSubmit} className={styles["login-form"]}>
            <h2>{forgotPassword ? "Forgot Password" : "Login"}</h2>     {" "}
      <label>
                <span>Email:</span>       {" "}
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
             {" "}
      </label>
           {" "}
      {!forgotPassword && (
        <label>
                    <span>Password:</span>         {" "}
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
                 {" "}
        </label>
      )}
           {" "}
      {!isPending && (
        <button className={styles.btn}>
                    {forgotPassword ? "Reset Password" : "Login"}       {" "}
        </button>
      )}
           {" "}
      {isPending && (
        <button className="btn" disabled>
                    Loading        {" "}
        </button>
      )}
           {" "}
      {/* {!forgotPassword && (
        <button className={styles.btn1} onClick={handleClick}>
                    Forgot Password?        {" "}
        </button>
      )} */}
           {" "}
      <button className={styles.btn1} onClick={handleSignupClick}>
                New User? Signup Instead      {" "}
      </button>
            {error && <p>{error}</p>}   {" "}
    </form>
  ) : (
    <div className={styles["login-form"]}>
            <h2>Login is closed for now</h2>     {" "}
      <button className={styles.btn1} onClick={handleSignupClick}>
                New User? Signup Instead      {" "}
      </button>
         {" "}
    </div>
  );
}
