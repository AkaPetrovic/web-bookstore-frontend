"use client";

import Image from "next/image";
import styles from "./Hero.module.css";
import { useEffect, useState } from "react";

function Hero() {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    setShowTitle(!showTitle);
  }, []);

  function setShowTitleHandler() {
    setShowTitle(!showTitle);
  }

  return (
    <div className={styles.container}>
      <div className={styles.welcomeTitleContainer}>
        <h1 className={showTitle ? styles.titleAfter : styles.titleBefore}>
          Welcome <br />
          to Bookile.
        </h1>
      </div>
      <div className={styles.imageGrid}>
        <div className={styles.imageContainer}>
          <Image
            src="/heroFirst.png"
            alt="First image on the Hero part of the home page"
            fill={true}
            className={styles.image}
          />
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/heroSecond.png"
            fill={true}
            alt="Second image on the Hero part of the home page"
            className={styles.image}
          />
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/heroThird.png"
            fill={true}
            alt="Third image on the Hero part of the home page"
            className={styles.image}
          />
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/heroFourth.png"
            fill={true}
            alt="Fourth image on the Hero part of the home page"
            className={styles.image}
          />
        </div>
        <div className={styles.outline}></div>
      </div>
    </div>
  );
}

export default Hero;
