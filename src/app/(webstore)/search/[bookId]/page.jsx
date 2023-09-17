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
import TextField from "@/components/form/TextField";
import { useEffect, useState } from "react";

function SearchIndividualBookPage({ params }) {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [book, setBook] = useState(null);
  const [data, setData] = useState(null);

  const userRole = getCookie("logged_user_role");
  const authToken = getCookie("auth_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${params.bookId}`
        );
        const data = await response.json();
        if (data) {
          setData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data && book === null) {
      const authors = data.volumeInfo.authors.join(", ");
      const cover =
        data.volumeInfo.imageLinks && data.volumeInfo.imageLinks.smallThumbnail
          ? data.volumeInfo.imageLinks.smallThumbnail
          : "/";

      setBook({
        name: data.volumeInfo.title,
        authors: authors,
        published_date: data.volumeInfo.publishedDate,
        cover: cover,
        gbooks_id: data.id,
        price: "",
        amount: 1,
      });
    }
  }, [data]);

  async function addBook() {
    if (authToken) {
      console.log(book);
      const response = await fetch("http://localhost:8000/api/books/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(book),
      });

      const responseData = await response.json();
      // const responseData = await response.text();

      console.log(responseData);
    }
  }

  function handleBookUpdate(name, value) {
    setBook((prev) => ({ ...prev, [name]: value }));
  }

  function getCookie(cookieName) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === cookieName) {
        return decodeURIComponent(value);
      }
    }
    return null;
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

        {data &&
        data.volumeInfo.imageLinks &&
        data.volumeInfo.imageLinks.smallThumbnail ? (
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

      {data && userRole === "admin" ? (
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
          onClick={() => {
            addBook();
            setBook({
              ...book,
              price: "",
              amount: 1,
            });
          }}
        >
          Confirm
        </button>
      </div>
    </main>
  );
}

export default SearchIndividualBookPage;
