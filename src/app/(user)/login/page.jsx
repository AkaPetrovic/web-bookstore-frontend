"use client";

import TextField from "@/components/form/TextField";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import UserContext from "@/context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEnvelope,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

function LoginPage() {
  const router = useRouter();

  const { loggedInToggle } = useContext(UserContext);

  return (
    <main className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Login to bookile</h1>
        <form>
          <div className={styles.textFieldWithIcon}>
            <TextField type="email" labelText="Email" />
            <FontAwesomeIcon className={styles.textFieldIcon} icon={faKey} />
          </div>
          <div className={styles.textFieldWithIcon}>
            <TextField type="password" labelText="Password" />
            <FontAwesomeIcon
              className={styles.textFieldIcon}
              icon={faEnvelope}
            />
          </div>

          <p>
            Don't have an account?{" "}
            <Link className={styles.link} href="/register">
              Register
            </Link>
          </p>
          <Link
            href="/"
            onClick={() => loggedInToggle()}
            className={styles.button}
          >
            Login
          </Link>
        </form>

        <div className={styles.goBack} onClick={() => router.back()}>
          <FontAwesomeIcon className={styles.goBackIcon} icon={faArrowLeft} />
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
