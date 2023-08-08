import Link from "next/link";
import styles from "./SearchResultItem.module.css";

function SearchResultItem({ title, subtitle, authors, id }) {
  return (
    <div className={styles.container}>
      <Link className={styles.linkTitle} href={`/search/${id}`}>
        {title}
      </Link>
      <h4 className={styles.subtitle}>{subtitle}</h4>
    </div>
  );
}

export default SearchResultItem;
