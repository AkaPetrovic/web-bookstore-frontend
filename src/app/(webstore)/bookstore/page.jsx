"use client";

import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function Bookstore() {
  const [selectedSortingOption, setSelectedSortingOption] = useState("Default");
  const [dropDownOptionsVisible, setDropDownOptionsVisible] = useState(false);
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Mali princ",
      price: 999,
    },
    {
      id: 2,
      name: "Ep o Gilgamesu",
      price: 1999,
    },
    {
      id: 3,
      name: "Prokleta avlija",
      price: 1299,
    },
    {
      id: 4,
      name: "Zlocin i kazna",
      price: 3499,
    },
    {
      id: 5,
      name: "Cekajuci Godoa",
      price: 1799,
    },
    {
      id: 6,
      name: "Cica Gorio",
      price: 2099,
    },
  ]);

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

  function handleDropDownMenuOptionChange(selectedOption) {
    setDropDownOptionsVisible((prev) => !prev);
    setSelectedSortingOption(selectedOption);
  }

  return (
    <main className={styles.container}>
      {/* Button for adding a new book */}
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
              onClick={() => handleDropDownMenuOptionChange("Name descending")}
              className={
                dropDownOptionsVisible
                  ? `${styles.option} ${styles.open}`
                  : styles.option
              }
            >
              Name descending
            </div>
            <div
              onClick={() => handleDropDownMenuOptionChange("Price ascending")}
              className={
                dropDownOptionsVisible
                  ? `${styles.option} ${styles.open}`
                  : styles.option
              }
            >
              Price ascending
            </div>
            <div
              onClick={() => handleDropDownMenuOptionChange("Price descending")}
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
    </main>
  );
}
