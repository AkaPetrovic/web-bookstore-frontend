"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./page.module.css";
import parse from "html-react-parser";
import {
  faCircleMinus,
  faCirclePlus,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";
import TextField from "@/components/form/TextField";
import { useEffect, useState } from "react";

function SearchIndividualBookPage({ params }) {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [book, setBook] = useState(null);

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
    `https://www.googleapis.com/books/v1/volumes/${params.bookId}`,
    fetcher
  );

  useEffect(() => {
    if (data && book === null) {
      const authors = data.volumeInfo.authors.join(", ");

      setBook({
        name: data.volumeInfo.title,
        authors: authors,
        published_date: data.volumeInfo.publishedDate,
        cover: data.volumeInfo.imageLinks.smallThumbnail,
        gbooks_id: data.id,
        price: "",
        amount: 1,
      });
    }
  }, [data]);

  async function addBook(url) {
    console.log(book);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    const responseData = await response.json();

    console.log(responseData);
  }

  function handleBookUpdate(name, value) {
    setBook((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <main className={styles.container}>
      <div className={styles.generalInfoContainer}>
        <div className={styles.generalInfo}>
          <p className={styles.categories}>
            {data && data.volumeInfo.categories
              ? data.volumeInfo.categories.map((category, index) => {
                  if (index === data.volumeInfo.categories.length - 1)
                    return <span key={index}>{category}</span>;
                  else return <span key={index}>{category} | </span>;
                })
              : ""}
          </p>
          <h1 className={styles.title}>{data ? data.volumeInfo.title : ""}</h1>
          {data && data.volumeInfo.subtitle ? (
            <h2 className={styles.subtitle}>{data.volumeInfo.subtitle}</h2>
          ) : null}
          {/* Authors of the volume */}
          {data && data.volumeInfo.authors ? (
            <div className={styles.authors}>
              Written by:
              {data.volumeInfo.authors.map((author, index) => {
                if (index === data.volumeInfo.authors.length - 1)
                  return <span key={index}> {author}</span>;
                else return <span key={index}> {author},</span>;
              })}
            </div>
          ) : null}
        </div>

        {data && data.volumeInfo.imageLinks.smallThumbnail ? (
          <img
            className={styles.bookImage}
            src={data.volumeInfo.imageLinks.smallThumbnail}
          />
        ) : null}
      </div>

      {/* Book description */}
      <p className={styles.description}>
        {data && data.volumeInfo.description
          ? parse(data.volumeInfo.description)
          : ""}
      </p>

      {/* Publishing information */}
      <div className={styles.publishingInfo}>
        {data && data.volumeInfo.publisher ? (
          <p>Published by: {data.volumeInfo.publisher}</p>
        ) : null}
        {data && data.volumeInfo.publishedDate ? (
          <p>
            {data.volumeInfo.publishedDate.includes("-")
              ? "Publishing date: "
              : "Publishing year: "}
            {data.volumeInfo.publishedDate}
          </p>
        ) : null}
      </div>

      {!isLoading ? (
        <button
          className={styles.addToBookstoreButton}
          onClick={() => setShowAdditionalFields((prev) => !prev)}
        >
          {!showAdditionalFields ? (
            <FontAwesomeIcon icon={faCirclePlus} className={styles.icon} />
          ) : (
            <FontAwesomeIcon icon={faCircleMinus} className={styles.icon} />
          )}

          <p>Add to bookstore</p>
        </button>
      ) : null}

      <div
        className={
          showAdditionalFields
            ? `${styles.additionalInfo} ${styles.visible}`
            : styles.additionalInfo
        }
      >
        <div className={styles.priceInputField}>
          <TextField
            type="number"
            labelText="Price"
            name="price"
            updateFunction={handleBookUpdate}
            inputValue={book ? book.price : ""}
          />
        </div>
        <div className={styles.amount}>
          <p>Amount:</p>
          <button
            className={styles.amountControls}
            onClick={() => {
              if (book.amount > 1) {
                setBook((prev) => ({ ...prev, amount: prev.amount - 1 }));
              }
            }}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <div>{book ? book.amount : ""}</div>
          <button
            className={styles.amountControls}
            onClick={() =>
              setBook((prev) => ({ ...prev, amount: prev.amount + 1 }))
            }
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <button
          className={styles.confirmButton}
          disabled={book?.price ? false : true}
          onClick={() => addBook("http://localhost:8000/api/books/create")}
        >
          Confirm
        </button>
      </div>
    </main>
  );
}

export default SearchIndividualBookPage;
