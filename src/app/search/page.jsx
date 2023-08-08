"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchResultList from "@/components/search/SearchResultList";

export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const [divVisible, setDivVisible] = useState(false);
  const [books, setBooks] = useState([]);

  const fetcher = (url, method = "GET", data = null) => {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    };

    return fetch(url, options).then((res) => res.json());
  };
  const { data, error, isLoading } = useSWR(
    `/api/books?title=${encodeURIComponent(inputValue)}`,
    fetcher
  );

  useEffect(() => {
    if (!isLoading && data && data.booksData && !data.booksData.error) {
      const { booksData } = data;
      setBooks(booksData.items);
    }
  }, [isLoading, data]);

  function handleBorderToggle() {
    setDivVisible(!divVisible);
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <main className={styles.container}>
      <div className={styles.searchContainer}>
        <div className={styles.searchForm}>
          <input
            type="text"
            className={styles.searchField}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleBorderToggle}
            onBlur={handleBorderToggle}
            placeholder="Enter books title here"
          />
          <div
            className={`${styles.searchFieldBorder} + ${
              divVisible ? styles.visible : ""
            }`}
          ></div>
        </div>

        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon={faCircleInfo} className={styles.icon} />
          <p className={styles.tooltip}>
            This search feature uses Google Books API.
            <br />
            <br />
            It uses the title user entered and retrieves all the books
            containing the provided title.
          </p>
        </div>
      </div>

      {inputValue.length > 2 ? <SearchResultList books={books} /> : null}
    </main>
  );
}
