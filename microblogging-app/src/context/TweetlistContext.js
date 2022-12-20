import { createContext, useState } from "react";

const TweetlistContext = createContext();

const TweetlistContextProvider = ({ children }) => {
  const [tweet, setTweet] = useState();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <TweetlistContext.Provider
      value={{
        tweet,
        setTweet,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </TweetlistContext.Provider>
  );
};

export { TweetlistContext, TweetlistContextProvider };
