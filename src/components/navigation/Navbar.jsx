"use client";

import styles from "./Navbar.module.css";
import Link from "next/link";
import { Rubik } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

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
  const [userName, setUserName] = useState(getCookie("logged_user_name"));
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false);

  const userMenuRef = useRef(null);

  const authToken = getCookie("auth_token");

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

  async function handleLogout() {
    if (authToken) {
      const response = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        document.cookie =
          "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "logged_user_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "logged_user_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUserName(null);
      }
    }
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
    <div className={styles.container}>
      <div className={styles.topSection}>
        <Link href="/" className={`${rubik.className} ${styles.logoLink}`}>
          bookile
        </Link>

        <div className={styles.icons}>
          {userName ? (
            <div
              className={styles.userContainer}
              onClick={() => setUserMenuIsOpen((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faUser} className={styles.icon} />
              <p>{userName}</p>
              <div
                ref={userMenuRef}
                className={
                  userMenuIsOpen
                    ? `${styles.userMenu} ${styles.visible}`
                    : styles.userMenu
                }
              >
                <button className={styles.logoutButton} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login">Login</Link>
          )}
          <Link href="/cart">
            <FontAwesomeIcon icon={faCartShopping} className={styles.icon} />
          </Link>
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
