"use client";

import { createContext, useState } from "react";

const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [itemsInCart, setItemsInCart] = useState([]);

  function getAmountAvailable(gbooksID) {
    for (let i = 0; i < itemsInCart.length; i++) {
      if (itemsInCart[i].gbooksID === gbooksID) {
        return itemsInCart[i].amountAvailable;
      }
    }
    return null;
  }

  function increaseAmountByOne(gbooksID) {
    const updatedItemsInCart = itemsInCart.map((item) => {
      if (item.gbooksID === gbooksID) {
        if (item.amountAvailable > 0) {
          return {
            ...item,
            amountInCart: item.amountInCart + 1,
            amountAvailable: item.amountAvailable - 1,
          };
        }
      }
      return item;
    });
    setItemsInCart(updatedItemsInCart);
  }

  function needsToBeRemoved(gbooksID) {
    for (let i = 0; i < itemsInCart.length; i++) {
      if (itemsInCart[i].gbooksID === gbooksID) {
        if (itemsInCart[i].amountInCart - 1 > 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

  function decreaseAmountByOne(gbooksID) {
    if (needsToBeRemoved(gbooksID)) {
      const updatedItemsInCart = itemsInCart.filter(
        (item) => item.gbooksID !== gbooksID
      );
      setItemsInCart(updatedItemsInCart);
    } else {
      const updatedItemsInCart = itemsInCart.map((item) => {
        if (item.gbooksID === gbooksID) {
          if (item.amountInCart - 1 > 0) {
            return {
              ...item,
              amountInCart: item.amountInCart - 1,
              amountAvailable: item.amountAvailable + 1,
            };
          }
        }
        return item;
      });
      setItemsInCart(updatedItemsInCart);
    }
  }

  function addToCart(itemToAdd) {
    let exists = false;
    const updatedItemsInCart = itemsInCart.map((item) => {
      if (item.gbooksID === itemToAdd.gbooksID) {
        exists = true;
        return {
          ...item,
          amountInCart: item.amountInCart + itemToAdd.amountInCart,
          amountAvailable: itemToAdd.amountAvailable,
        };
      }
      return item;
    });
    if (exists) {
      setItemsInCart(updatedItemsInCart);
    } else {
      setItemsInCart([...updatedItemsInCart, itemToAdd]);
    }
  }

  const context = {
    itemsInCart: itemsInCart,
    setItemsInCart: setItemsInCart,
    addToCart: addToCart,
    getAmountAvailable: getAmountAvailable,
    increaseAmountByOne: increaseAmountByOne,
    decreaseAmountByOne: decreaseAmountByOne,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}

export default CartContext;
