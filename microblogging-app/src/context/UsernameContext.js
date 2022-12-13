import { createContext, useEffect, useState } from "react";
import localforage from "localforage";

const UsernameContext = createContext();

const UsernameContextProvider = ({ children }) => {
  const [username, setUsername] = useState();
  const [usernameError, setUsernameError] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const getUserStateFromForage = async () => {
    const userAuthState = await localforage.getItem("isAuth");
    setIsAuth(userAuthState);
  };

  const getFromForage = async () => {
    const result = await localforage.getItem("current_user");
    if (result) {
      setUsernameError("");
      setUsername(result);
    } else {
      setUsernameError("Please provide a username to get started");
    }
  };

  useEffect(() => {
    getUserStateFromForage();
    getFromForage();
  }, []);

  useEffect(() => {
    localforage.setItem("current_user", username);
  }, [username]);

  return (
    <UsernameContext.Provider
      value={{ username, setUsername, usernameError, isAuth, setIsAuth }}
    >
      {children}
    </UsernameContext.Provider>
  );
};

export { UsernameContext, UsernameContextProvider };
