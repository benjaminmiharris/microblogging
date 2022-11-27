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
    const serverTweets = await getFromApi();
    return setTweets(serverTweets);
  };

  useEffect(() => {
    getTweets();
  }, [tweets]);

  ///////////////////////////////////////////////

  return (
    <Container className="app-container">
      <CreateTweet />
      <div>{tweets.length < 0 ? null : renderTweets()}</div>
    </Container>
  );
};

export default Home;
