// "use client";

import styles from "./page.module.css";
// import useSWR from "swr";

async function getData(bookId) {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${bookId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function SearchIndividualBookPage({ params }) {
  // const fetcher = (url, method = "GET", data = null) => {
  //   const options = {
  //     method,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: data ? JSON.stringify(data) : null,
  //   };

  //   return fetch(url, options).then((res) => res.json());
  // };

  // const { data, error, isLoading } = useSWR(
  //   `https://www.googleapis.com/books/v1/volumes/${params.bookId}`,
  //   fetcher
  // );

  const data = await getData(params.bookId);

  console.log(data);

  return (
    <main className={styles.container}>
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
    </main>
  );
}

export default SearchIndividualBookPage;
