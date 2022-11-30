import localforage from "localforage";
import { createContext, useEffect, useState } from "react";

const TweetlistContext = createContext();

const TweetlistContextProvider = ({ children }) => {
  const [tweet, setTweet] = useState();
  const [tweetsArray, setTweetsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localforage.setItem("tweet_list", tweetsArray);
  }, [tweetsArray]);

  return (
    <TweetlistContext.Provider
      value={{
        tweetsArray,
        setTweetsArray,
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
