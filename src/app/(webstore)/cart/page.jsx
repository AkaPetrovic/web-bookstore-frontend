"use client";

import { useContext } from "react";
import styles from "./page.module.css";
import CartContext from "@/context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function Cart() {
  const { itemsInCart, increaseAmountByOne, decreaseAmountByOne } =
    useContext(CartContext);

  return (
    <main className={styles.cart}>
      {itemsInCart.length > 0 ? (
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
      ) : (
        <h1 className={styles.emptyCartMessage}>Cart is currently empty...</h1>
      )}
      <button className={styles.confirmButton}>Confirm purchase</button>
    </main>
  );
}

export default Cart;
