import { useEffect, useState } from "react";

import CreateTweet from "../components/CreateTweet";
import Container from "react-bootstrap/Container";

import Tweet from "../components/Tweet";
import { sort } from "fast-sort";
import HashLoader from "react-spinners/HashLoader";
import { getFromApi } from "../helpers/GET_tweet";

import "../style/home.css";

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const renderTweets = () => {
    const sortedTweets = sort(tweets).desc((u) => u.date);

    return sortedTweets.map((tweet) => {
      return (
        <Tweet
          key={tweet.date}
          tweetMessage={tweet.content}
          tweetCreatedOn={tweet.date}
          tweetUsername={tweet.userName}
        />
      );
    });
  };

  /////////////////API WORK///////////////////////

  const getTweets = async () => {
    setIsLoading(true);
    const serverTweets = await getFromApi();
    setIsLoading(false);

    return setTweets(serverTweets);
  };

  useEffect(() => {
    getTweets();
  }, []);

  ///////////////////////////////////////////////

  return (
    <Container className="app-container">
      <CreateTweet />;
      <div>
        {isLoading ? (
          <HashLoader
            className="loader"
            color="#36d7b7"
            size={100}
            loading={isLoading}
          />
        ) : (
          renderTweets()
        )}
      </div>
    </Container>
  );
};

export default Home;
