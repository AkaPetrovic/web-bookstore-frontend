"use client";

import { useContext, useState } from "react";
import styles from "./page.module.css";
import CartContext from "@/context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function Cart() {
  const {
    itemsInCart,
    setItemsInCart,
    increaseAmountByOne,
    decreaseAmountByOne,
  } = useContext(CartContext);
  const [purchaseSuccessful, setPurchaseSuccessful] = useState(false);

  const authToken = getCookie("auth_token");

  async function confirmPurchase() {
    const itemsInCartCompact = itemsInCart.map((item) => ({
      amount: item.amountInCart,
      gbooksId: item.gbooksID,
    }));

    if (authToken) {
      const response = await fetch("http://localhost:8000/api/books/deduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(itemsInCartCompact),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setItemsInCart([]);
        setPurchaseSuccessful(true);
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
    <main className={styles.cart}>
      {itemsInCart.length > 0 ? (
        <>
          <div className={styles.items}>
            {itemsInCart.map((item, index) => (
              <div
                className={
                  index === itemsInCart.length - 1
                    ? `${styles.itemInCart} ${styles.lastItemInCart}`
                    : styles.itemInCart
                }
                key={item.gbooksID}
              >
                <h1 className={styles.title}>{item.name}</h1>
                <div className={styles.amount}>
                  <button
                    className={styles.amountControls}
                    onClick={() => decreaseAmountByOne(item.gbooksID)}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <div>{item.amountInCart}</div>
                  <button
                    className={styles.amountControls}
                    onClick={() => increaseAmountByOne(item.gbooksID)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <p className={styles.totalPrice}>
                  total: RSD {item.price * item.amountInCart}
                </p>
              </div>
            ))}
          </div>
          <button className={styles.confirmButton} onClick={confirmPurchase}>
            Confirm purchase
          </button>
        </>
      ) : (
        <h1 className={styles.emptyCartMessage}>
          {purchaseSuccessful
            ? "Successful purchase!"
            : "Cart is currently empty..."}
        </h1>
      )}
    </main>
  );
}

export default Cart;
