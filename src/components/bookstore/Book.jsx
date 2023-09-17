"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Book.module.css";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import CartContext from "@/context/CartContext";

function Book({ name, cover, amount, gbooksID, price }) {
  const { addToCart, getAmountAvailable } = useContext(CartContext);
  const [amountForPurchase, setAmountForPurchase] = useState(0);
  const [amountAvailable, setAmountAvailable] = useState(
    getAmountAvailable(gbooksID) != null ? getAmountAvailable(gbooksID) : amount
  );

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={cover} />
      </div>

      <div className={styles.bookInfo}>
        <h1 className={styles.title}>{name}</h1>
        <div className={styles.purchaseInfo}>
          <p>Price: RSD {price}</p>
          <p>Amount available: {amountAvailable}</p>

          <div className={styles.amount}>
            <button
              className={styles.amountControls}
              onClick={() => {
                if (amountForPurchase > 0) {
                  setAmountForPurchase((prev) => prev - 1);
                }
              }}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <div>{amountForPurchase}</div>
            <button
              className={styles.amountControls}
              onClick={() => {
                if (amountForPurchase < amountAvailable) {
                  setAmountForPurchase((prev) => prev + 1);
                }
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <button
            className={styles.addToCartButton}
            disabled={amountForPurchase > 0 ? false : true}
            onClick={() => {
              addToCart({
                name: name,
                amountInCart: amountForPurchase,
                amountAvailable: amountAvailable - amountForPurchase,
                gbooksID: gbooksID,
                price: price,
              });
              setAmountAvailable(amountAvailable - amountForPurchase);
              setAmountForPurchase(0);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Book;
