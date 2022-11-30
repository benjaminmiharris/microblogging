import { createContext, useEffect, useState } from "react";
import localforage from "localforage";

const UsernameContext = createContext();

const UsernameContextProvider = ({ children }) => {
  const [username, setUsername] = useState();

  const getFromForage = async () => {
    const result = await localforage.getItem("current_user");
    if (result) {
      setUsername(result);
    } else {
      console.log("Username Context: No username yet");
    }
  };

  useEffect(() => {
    getFromForage();
  }, []);

  useEffect(() => {
    localforage.setItem("current_user", username);
  }, [username]);

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};

export { UsernameContext, UsernameContextProvider };
