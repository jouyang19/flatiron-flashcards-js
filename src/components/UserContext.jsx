"use client";
import React, { createContext, useState, useEffect } from "react";

const userContext = createContext();

const MyProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve the state from local storage or initialize with a default value.
    // This is to ensure login details persist throughout the app.
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("userState");
      return savedState
        ? JSON.parse(savedState)
        : { isLoggedIn: false, username: "", id: undefined, user: undefined };
    }
    return { isLoggedIn: false, username: "", id: undefined, user: undefined };
  });

  useEffect(() => {
    localStorage.setItem("userState", JSON.stringify(user));
  }, [user]);

  const [isShared, setIsShared] = useState(() => {
    // Retrieve the state from local storage or initialize with a default value.
    // This is to ensure sharing details persist throughout the app.
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("isShared");
      if (savedState) {
        try {
          return JSON.parse(savedState);
        } catch (e) {
          console.error("Error parsing saved state:", e);
          // Handle the error, e.g., set a default value
          return true;
        }
      } else {
        return true;
      }
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem("isShared", JSON.stringify(isShared));
  }, [isShared]);

  const [currentDeck, setCurrentDeck] = useState(() => {
    // Retrieve the state from local storage or initialize with a default value.
    // This is to ensure deck details persist in the deck viewer page.
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("isShared");
      if (savedState) {
        try {
          return JSON.parse(savedState);
        } catch (e) {
          console.error("Error parsing saved state:", e);
          // Handle the error, e.g., set a default value
          return true;
        }
      } else {
        return true;
      }
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem("currentDeck", JSON.stringify(currentDeck));
  }, [currentDeck]);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        isShared,
        setIsShared,
        currentDeck,
        setCurrentDeck,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export { userContext, MyProvider };
