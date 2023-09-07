import SearchResultItem from "./SearchResultItem";
import styles from "./SearchResultList.module.css";

function SearchResultList({ books }) {
  return (
    <div className={styles.container}>
      {books
        ? books.map((item) => (
            <SearchResultItem
              title={item.volumeInfo.title}
              subtitle={item.volumeInfo.subtitle}
              key={item.id}
              id={item.id}
              publishedDate={item.volumeInfo.publishedDate}
            />
          ))
        : ""}
    </div>
  );
}

export default SearchResultList;
