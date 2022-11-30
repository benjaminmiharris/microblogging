import localforage from "localforage";
import { createContext, useEffect, useState } from "react";

const TweetlistContext = createContext();

const TweetlistContextProvider = ({ children }) => {
  const [tweet, setTweet] = useState();
  const [tweetCreatedOn, setTweetCreatedOn] = useState();
  const [tweetsArray, setTweetsArray] = useState([]);

  useEffect(() => {
    setTweetCreatedOn(new Date().toISOString());
  }, [tweet]);

  useEffect(() => {
    localforage.setItem("tweet_list", tweetsArray);
  }, [tweetsArray]);

  // const getTweetsListFromForage = async () => {
  //   const tweetForageList = await localforage.getItem("tweet_list");
  //   return tweetForageList;
  // };

  return (
    <TweetlistContext.Provider
      value={{ tweetsArray, setTweetsArray, tweet, setTweet, tweetCreatedOn }}
    >
      {children}
    </TweetlistContext.Provider>
  );
};

export { TweetlistContext, TweetlistContextProvider };
