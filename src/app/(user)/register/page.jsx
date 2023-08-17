"use client";

import TextField from "@/components/form/TextField";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function LoginPage() {
  const router = useRouter();

  return (
    <main className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Create an account</h1>
        <form>
          <div className={styles.textFieldWrapper}>
            <TextField type="text" labelText="Name" />
          </div>
          <div className={styles.textFieldWrapper}>
            <TextField type="email" labelText="Email" />
          </div>
          <div className={styles.textFieldWrapper}>
            <TextField type="password" labelText="Password" />
          </div>

          <Link href="/login" className={styles.button}>
            Register
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
