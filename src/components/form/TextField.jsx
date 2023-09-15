"use client";

import styles from "./TextField.module.css";
import { useState } from "react";

function TextField({ labelText, type, inputValue, updateFunction, name }) {
  const [inputFieldIsFocused, setInputFieldIsFocused] = useState(false);

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
        className={
          type === "number"
            ? `${styles.textField} ${styles.numberTextField}`
            : styles.textField
        }
        name={name}
        type={type}
        value={inputValue}
        onFocus={() => setInputFieldIsFocused((prev) => !prev)}
        onBlur={() => setInputFieldIsFocused((prev) => !prev)}
        onChange={(event) =>
          updateFunction(event.target.name, event.target.value)
        }
      />
    </>
  );
}

export default TextField;
