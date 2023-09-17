"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./page.module.css";
import parse from "html-react-parser";
import {
  faCircleMinus,
  faCirclePlus,
  faMinus,
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import TextField from "@/components/form/TextField";
import { useEffect, useState } from "react";

function SearchIndividualBookPage({ params }) {
  const [showAdditionalFieldsAdd, setShowAdditionalFieldsAdd] = useState(false);
  const [showAdditionalFieldsEdit, setShowAdditionalFieldsEdit] =
    useState(false);
  const [bookExistsInDatabase, setBookExistsInDatabase] = useState(false);
  const [book, setBook] = useState(null);
  const [data, setData] = useState(null);

  const userRole = getCookie("logged_user_role");
  const authToken = getCookie("auth_token");

  useEffect(() => {
    const fetchData = async () => {
      if (authToken) {
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
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (authToken) {
        try {
          const response = await fetch(
            `http://localhost:8000/api/books/check?gbooks_id=${params.bookId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setBookExistsInDatabase(data.found);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
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
      const response = await fetch("http://localhost:8000/api/books/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        // const responseData = await response.json();
        // console.log(responseData);
        setBookExistsInDatabase(true);
      }
    }
  }

  async function editBook() {
    if (authToken) {
      const response = await fetch(
        `http://localhost:8000/api/books/${params.bookId}/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ price: book.price }),
        }
      );

      // const responseData = await response.json();
      // console.log(responseData);
    }
  }

  async function deleteBook() {
    if (authToken) {
      const response = await fetch(
        `http://localhost:8000/api/books/${params.bookId}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.ok) {
        // const responseData = await response.json();
        // console.log(responseData);
        setBookExistsInDatabase(false);
      }
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

      <div className={styles.availableOperations}>
        {/* Button and additional fields for ADDING a book or increasing the amount in the database */}
        <div>
          {data && userRole === "admin" ? (
            <button
              className={styles.operationButton}
              onClick={() => {
                setShowAdditionalFieldsAdd((prev) => !prev);
                setShowAdditionalFieldsEdit(false);
              }}
            >
              <FontAwesomeIcon icon={faCirclePlus} className={styles.icon} />
              <p>Add to bookstore</p>
            </button>
          ) : null}

          <div
            className={
              showAdditionalFieldsAdd
                ? `${styles.additionalInfo} ${styles.visible}`
                : styles.additionalInfo
            }
          >
            {!bookExistsInDatabase ? (
              <div className={styles.priceInputField}>
                <TextField
                  type="number"
                  labelText="Price"
                  name="price"
                  updateFunction={handleBookUpdate}
                  inputValue={book ? book.price : ""}
                />
              </div>
            ) : null}

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
              disabled={
                !bookExistsInDatabase && book?.price == "" ? true : false
              }
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
        </div>

        {/* Button for DELETING a book that already exists in the database */}
        {data && userRole === "admin" && bookExistsInDatabase ? (
          <div>
            <button className={styles.operationButton} onClick={deleteBook}>
              <FontAwesomeIcon icon={faTrashCan} className={styles.icon} />
              <p>Delete</p>
            </button>
          </div>
        ) : null}

        {/* Button and additional fields for EDITING a book that already exists in the database */}
        {data && userRole === "admin" && bookExistsInDatabase ? (
          <div>
            <button
              className={styles.operationButton}
              onClick={() => {
                setShowAdditionalFieldsEdit((prev) => !prev);
                setShowAdditionalFieldsAdd(false);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} className={styles.icon} />
              <p>Edit the price</p>
            </button>

            <div
              className={
                showAdditionalFieldsEdit
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

              <button
                className={styles.confirmButton}
                disabled={book?.price == "" ? true : false}
                onClick={() => {
                  editBook();
                  setBook({
                    ...book,
                    price: "",
                  });
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}

export default SearchIndividualBookPage;
