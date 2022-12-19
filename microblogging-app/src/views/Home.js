import { useContext, useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import HashLoader from "react-spinners/HashLoader";
import { sort } from "fast-sort";

import CreateTweet from "../components/CreateTweet";
import Tweet from "../components/Tweet";
import { TweetlistContext } from "../context/TweetlistContext";
import { REFRESH_RATE } from "../constants";
import { doc, onSnapshot } from "firebase/firestore";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";

import "../style/home.css";

const Home = () => {
  const { tweetsArray, setTweetsArray, isLoading, setIsLoading } =
    useContext(TweetlistContext);

  const [postLists, setPostLists] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const getPostsFirestoreRealtime = async () => {
    onSnapshot(postsCollectionRef, (snapshot) => {
      setPostLists(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  };

  useEffect(() => {
    getPostsFirestoreRealtime();
  }, []);

  const renderTweets = () => {
    const sortedTweets = sort(postLists).desc((u) => u.createdOn);

    return sortedTweets.map((tweet) => {
      return <Tweet key={tweet.id} tweet={tweet} />;
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
