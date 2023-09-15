"use client";

import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

export default function Bookstore() {
  const [skip, setSkip] = useState(0);
  const [key, setKey] = useState("http://127.0.0.1:8000/api/books/get10");
  const [selectedSortingOption, setSelectedSortingOption] = useState("Default");
  const [dropDownOptionsVisible, setDropDownOptionsVisible] = useState(false);
  const [items, setItems] = useState([]);

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
  const { data, error, isLoading } = useSWR(key, fetcher);

  useEffect(() => {
    if (data) {
      if (items.length === 0) {
        setItems(data.books);
      } else {
        const newItems = [...items, ...data.books];
        setItems(newItems);
      }
    }
  }, [data]);

  useEffect(() => {
    setKey(`http://127.0.0.1:8000/api/books/get10?skip=${skip}`);
  }, [skip]);

  useEffect(() => {
    mutate(key);
  }, [key]);

  useEffect(() => {
    const sortedItems = [...items];

    switch (selectedSortingOption) {
      case "Name ascending":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        setItems(sortedItems);
        break;
      case "Name descending":
        sortedItems.sort((a, b) => -a.name.localeCompare(b.name));
        setItems(sortedItems);
        break;
      case "Price ascending":
        sortedItems.sort((a, b) => a.price - b.price);
        setItems(sortedItems);
        break;
      case "Price descending":
        sortedItems.sort((a, b) => -(a.price - b.price));
        setItems(sortedItems);
        break;
      default:
        sortedItems.sort((a, b) => a.id - b.id);
        setItems(sortedItems);
    }
  }, [selectedSortingOption]);

  function handleLoadMore() {
    setSkip((prev) => prev + 10);
  }

  function handleDropDownMenuOptionChange(selectedOption) {
    setDropDownOptionsVisible((prev) => !prev);
    setSelectedSortingOption(selectedOption);
  }

  if (items.length !== 0) {
    return (
      <main className={styles.container}>
        <div className={styles.options}>
          {/* Drop down menu */}
          <div className={styles.sortingDropDown}>
            <div
              className={styles.selectedOption}
              onClick={() => setDropDownOptionsVisible(!dropDownOptionsVisible)}
            >
              <p>{selectedSortingOption}</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>

            <div className={styles.otherOptions}>
              <div
                onClick={() => handleDropDownMenuOptionChange("Default")}
                className={
                  dropDownOptionsVisible
                    ? `${styles.option} ${styles.open}`
                    : styles.option
                }
              >
                Default
              </div>
              <div
                onClick={() => handleDropDownMenuOptionChange("Name ascending")}
                className={
                  dropDownOptionsVisible
                    ? `${styles.option} ${styles.open}`
                    : styles.option
                }
              >
                Name ascending
              </div>
              <div
                onClick={() =>
                  handleDropDownMenuOptionChange("Name descending")
                }
                className={
                  dropDownOptionsVisible
                    ? `${styles.option} ${styles.open}`
                    : styles.option
                }
              >
                Name descending
              </div>
              <div
                onClick={() =>
                  handleDropDownMenuOptionChange("Price ascending")
                }
                className={
                  dropDownOptionsVisible
                    ? `${styles.option} ${styles.open}`
                    : styles.option
                }
              >
                Price ascending
              </div>
              <div
                onClick={() =>
                  handleDropDownMenuOptionChange("Price descending")
                }
                className={
                  dropDownOptionsVisible
                    ? `${styles.option} ${styles.lastOption} ${styles.open}`
                    : `${styles.option} ${styles.lastOption}`
                }
              >
                Price descending
              </div>
            </div>
          </div>
        </div>

        {/* All books available for purchase */}
        <div className={styles.items}>
          {items.map((item) => (
            <div className={styles.book} key={item.id}>
              {item.name}
              <br />
              {item.price}
            </div>
          ))}
        </div>
        {items.length > 0 && items.length % 10 === 0 ? (
          <button className={styles.loadMoreButton} onClick={handleLoadMore}>
            Load more...
          </button>
        ) : null}
      </main>
    );
  } else {
    return null;
  }
}
