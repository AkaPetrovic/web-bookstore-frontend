"use client";

import styles from "./TextField.module.css";
import { useState } from "react";

function TextField({ labelText, type }) {
  const [inputFieldIsFocused, setInputFieldIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <label
        className={
          inputFieldIsFocused
            ? `${styles.label} ${styles.up}`
            : !inputValue
            ? `${styles.label} ${styles.down}`
            : `${styles.label} ${styles.up}`
        }
      >
        {labelText}
      </label>
      <input
        className={styles.textField}
        type={type}
        value={inputValue}
        onFocus={() => setInputFieldIsFocused((prev) => !prev)}
        onBlur={() => setInputFieldIsFocused((prev) => !prev)}
        onChange={(event) => setInputValue(event.target.value)}
      />
    </>
  );
}

export default TextField;
