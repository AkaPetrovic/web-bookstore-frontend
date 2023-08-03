import styles from "./Navbar.module.css";
import Link from "next/link";
import { Rubik } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";

const rubik = Rubik({ subsets: ["latin"], weight: ["400"] });

const navItems = [
  {
    id: 1,
    title: "Bookstore",
    url: "/bookstore",
  },
  {
    id: 2,
    title: "Search",
    url: "/search",
  },
  {
    id: 3,
    title: "About",
    url: "/about",
  },
];

function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <Link href="/" className={`${rubik.className} ${styles.logoLink}`}>
          bookile
        </Link>
        <div className={styles.icons}>
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
          <FontAwesomeIcon icon={faCartShopping} className={styles.icon} />
        </div>
      </div>
      <div className={styles.bottomSection}>
        <nav className={styles.navigationBar}>
          <ul className={styles.navigationLinks}>
            {navItems.map((item) => (
              <Link href={item.url} className={styles.link} key={item.id}>
                {item.title}
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
