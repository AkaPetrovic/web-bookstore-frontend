"use client";

import TextField from "@/components/form/TextField";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function RegisterPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  async function register() {
    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      // const responseData = await response.json();
      // console.log(responseData);
      router.push("/login");
    }
  }
  function handleUserUpdate(name, value) {
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <main className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Create an account</h1>
        <div className={styles.textFieldWrapper}>
          <TextField
            type="text"
            labelText="Name"
            name="name"
            updateFunction={handleUserUpdate}
            inputValue={user.name}
          />
        </div>
        <div className={styles.textFieldWrapper}>
          <TextField
            type="email"
            labelText="Email"
            name="email"
            updateFunction={handleUserUpdate}
            inputValue={user.email}
          />
        </div>
        <div className={styles.textFieldWrapper}>
          <TextField
            type="password"
            labelText="Password"
            name="password"
            updateFunction={handleUserUpdate}
            inputValue={user.password}
          />
        </div>

        <button className={styles.button} onClick={register}>
          Register
        </button>
        <div className={styles.goBack} onClick={() => router.back()}>
          <FontAwesomeIcon className={styles.goBackIcon} icon={faArrowLeft} />
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
