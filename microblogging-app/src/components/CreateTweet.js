import { useState, useContext } from "react";
import { addDoc, collection } from "firebase/firestore";

import { db, auth } from "../firebase-config";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { MAX_TWEET_LENGTH } from "../constants";
import { UsernameContext } from "../context/UsernameContext";
import { TweetlistContext } from "../context/TweetlistContext";

import "../style/create-tweet.css";

const CreateTweet = () => {
  const { user } = useContext(UsernameContext);
  const { isLoading } = useContext(TweetlistContext);

  const [tweet, setTweet] = useState();
  const [tweetCharCount, setTweetCarCount] = useState(0);

  const tweetMessageHandler = (e) => {
    setTweet(e.target.value);
    setTweetCarCount(e.target.value.length);
  };

  //creating posts and saving in firebase database

  const postsCollectionRef = collection(db, "posts");

  const createPost = async () => {
    user.displayName &&
      (await addDoc(postsCollectionRef, {
        tweet,
        userName: user.displayName,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
        createdOn: new Date().toISOString(),
      }));
  };

  const displayNameValidationRender = () => {
    return (
      <Alert className="tweet-char-alert" variant="danger">
        Add a display name in the profile to tweet!
      </Alert>
    );
  };

  return (
    <Row className="justify-content-center">
      <Col className="create-tweet-container" md="6">
        <InputGroup className="tweet-message">
          <Form.Control
            value={tweet}
            className="note-text-input"
            as="textarea"
            placeholder="What you have in mind..."
            onChange={tweetMessageHandler}
          />
        </InputGroup>

        {tweetCharCount <= MAX_TWEET_LENGTH ? (
          <Button
            disabled={isLoading}
            className="create-tweet-button "
            variant="primary"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              createPost();
            }}
          >
            Tweet
          </Button>
        ) : (
          <>
            <Alert className="tweet-char-alert" variant="danger">
              The tweet can't contain more then 140 chars.
            </Alert>
            <Button
              disabled
              className="create-tweet-button "
              variant="primary"
              type="submit"
            >
              Tweet
            </Button>
          </>
        )}
        {!user.displayName && displayNameValidationRender()}
      </Col>
    </Row>
  );
};

export default CreateTweet;
