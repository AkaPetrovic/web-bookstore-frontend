"use client";

import { createContext, useState } from "react";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function loggedInToggle() {
    setIsLoggedIn((prev) => !prev);
  }

  const context = {
    isLoggedIn: isLoggedIn,
    loggedInToggle: loggedInToggle,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

export default UserContext;
