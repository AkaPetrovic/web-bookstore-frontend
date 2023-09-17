"use client";

import TextField from "@/components/form/TextField";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEnvelope,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });

  function handleUserUpdate(name, value) {
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }

  async function login() {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const responseData = await response.json();
      setCookie("auth_token", responseData.access_token, 7);
      setCookie("logged_user_name", responseData.user.name, 7);
      setCookie("logged_user_role", responseData.user.role, 7);
      router.push("/");
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Login to bookile</h1>
        <div className={styles.textFieldWithIcon}>
          <TextField
            type="email"
            labelText="Email"
            name="email"
            updateFunction={handleUserUpdate}
            inputValue={user.email}
          />
          <FontAwesomeIcon className={styles.textFieldIcon} icon={faEnvelope} />
        </div>
        <div className={styles.textFieldWithIcon}>
          <TextField
            type="password"
            labelText="Password"
            name="password"
            updateFunction={handleUserUpdate}
            inputValue={user.password}
          />

          <FontAwesomeIcon className={styles.textFieldIcon} icon={faKey} />
        </div>

        <p>
          Don't have an account?{" "}
          <Link className={styles.link} href="/register">
            Register
          </Link>
        </p>
        <button className={styles.button} onClick={login}>
          Login
        </button>

        <div className={styles.goBack} onClick={() => router.back()}>
          <FontAwesomeIcon className={styles.goBackIcon} icon={faArrowLeft} />
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
