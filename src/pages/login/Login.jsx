import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useHistory } from "react-router-dom";

import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const history = useHistory();

  function handleClick() {
    history.push("/signup");
    window.location.reload(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["login-form"]}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      
      {!isPending && <button className={styles.btn}>Login</button>}
      {isPending && (
        <button className="btn" disabled>
          loading
        </button>
      )}
      <button className={styles.btn1} onClick={handleClick}>New User? Signup Instead</button>
      {error && <p>{error}</p>}
    </form>
  );
}
