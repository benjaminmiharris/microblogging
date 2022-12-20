import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase-config.js";
import { onAuthStateChanged } from "firebase/auth";

import localforage from "localforage";

const UsernameContext = createContext();

const UsernameContextProvider = ({ children }) => {
  const [username, setUsername] = useState();
  const [usernameError, setUsernameError] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  const getUserStateFromForage = async () => {
    const userAuthState = await localforage.getItem("isAuth");
    setIsAuth(userAuthState);
  };

  useEffect(() => {
    getUserStateFromForage();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    console.log("user", user);
    isAuth
      ? localforage.setItem("isAuth", true)
      : localforage.setItem("isAuth", false);
  }, [isAuth]);

  return (
    <UsernameContext.Provider
      value={{
        username,
        setUsername,
        usernameError,
        isAuth,
        setIsAuth,
        user,
        setUser,
      }}
    >
      {children}
    </UsernameContext.Provider>
  );
};

export { UsernameContext, UsernameContextProvider };
