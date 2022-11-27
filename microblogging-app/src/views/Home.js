import { useEffect, useState } from "react";

import CreateTweet from "../components/CreateTweet";
import Container from "react-bootstrap/Container";

import Tweet from "../components/Tweet";
import * as localForage from "localforage";
import { sort } from "fast-sort";

import "../style/home.css";

const Home = () => {
  const [tweets, setTweets] = useState([]);

  const addTweet = (tweet) => {
    const newTweet = { ...tweet };
    newTweet.date = new Date();

    setTweets([...tweets, newTweet]);
  };

  const getFromForage = async () => {
    const tweetsFromForage = await localForage.getItem("tweets");
    setTweets(tweetsFromForage);
  };

  useEffect(() => {
    getFromForage();
  }, []);

  useEffect(() => {
    localForage.setItem("tweets", tweets);
  }, [tweets]);

  const renderTweets = () => {
    const sortedTweets = sort(tweets).desc((u) => u.date);

    return sortedTweets.map((tweet) => {
      return <Tweet key={tweet.date} tweetMessage={tweet.tweetMessage} />;
    });
  };

  return (
    <Container className="app-container">
      <CreateTweet onAdd={addTweet} />
      <div>{tweets.length < 0 ? null : renderTweets()}</div>
    </Container>
  );
};

export default Home;
