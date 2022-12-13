import { useContext, useEffect } from "react";

import Container from "react-bootstrap/Container";
import HashLoader from "react-spinners/HashLoader";
import { sort } from "fast-sort";

import CreateTweet from "../components/CreateTweet";
import Tweet from "../components/Tweet";
import { getFromApi } from "../helpers/GET_tweet";
import { TweetlistContext } from "../context/TweetlistContext";
import { REFRESH_RATE } from "../constants";

import "../style/home.css";

const Home = () => {
  const { tweetsArray, setTweetsArray, isLoading, setIsLoading } =
    useContext(TweetlistContext);

  const getTweets = async () => {
    setIsLoading(true);
    const serverTweets = await getFromApi();
    setIsLoading(false);
    return setTweetsArray(serverTweets);
  };

  useEffect(() => {
    getTweets();
    setInterval(getTweets, REFRESH_RATE);
  }, []);

  useEffect(() => {
    renderTweets();
  }, [tweetsArray]);

  const renderTweets = () => {
    const sortedTweets = sort(tweetsArray).desc((u) => u.date);

    return sortedTweets.map((tweet) => {
      return <Tweet key={tweet.date} tweet={tweet} />;
    });
  };

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
