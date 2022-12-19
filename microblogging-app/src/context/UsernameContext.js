import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase-config.js";

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
    user?.email
      ? localforage.setItem("isAuth", true)
      : localforage.setItem("isAuth", false);
  }, [user]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, [user]);

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
