"use client";

import styles from "./Navbar.module.css";
import Link from "next/link";
import { Rubik } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState, useContext } from "react";
import UserContext from "@/context/UserContext";

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
  const { isLoggedIn, loggedInToggle } = useContext(UserContext);
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false);

  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.parentNode.contains(event.target)
      ) {
        setUserMenuIsOpen(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    // Clean up the event listener when the component unmounts - this prevents memory leaks
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <Link href="/" className={`${rubik.className} ${styles.logoLink}`}>
          bookile
        </Link>

        <div className={styles.icons}>
          {isLoggedIn ? (
            <div
              className={styles.userIconContainer}
              onClick={() => setUserMenuIsOpen((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faUser} className={styles.icon} />
              <div
                ref={userMenuRef}
                className={
                  userMenuIsOpen
                    ? `${styles.userMenu} ${styles.visible}`
                    : styles.userMenu
                }
              >
                <button
                  className={styles.logoutButton}
                  onClick={() => loggedInToggle()}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login">Login</Link>
          )}
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
