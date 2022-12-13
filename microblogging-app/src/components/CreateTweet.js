import { useState, useContext } from "react";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { postTweet } from "../helpers/GET_tweet";
import { MAX_TWEET_LENGTH } from "../constants";
import { UsernameContext } from "../context/UsernameContext";
import { TweetlistContext } from "../context/TweetlistContext";

import "../style/create-tweet.css";

const CreateTweet = () => {
  const { username } = useContext(UsernameContext);
  const { tweetsArray, setTweetsArray, isLoading } =
    useContext(TweetlistContext);

  const [tweet, setTweet] = useState();

  const [tweetCharCount, setTweetCarCount] = useState(0);

  const tweetMessageHandler = (e) => {
    setTweet(e.target.value);
    setTweetCarCount(e.target.value.length);
  };

  const sendTweetMessage = () => {
    const tweetObject = {
      content: tweet,
      userName: username,
      date: new Date().toISOString(),
    };
    postTweet(tweetObject);
    setTweet("");
    setTweetsArray([...tweetsArray, tweetObject]);
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
              sendTweetMessage();
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
      </Col>
    </Row>
  );
};

export default CreateTweet;
