import "../style/create-tweet.css";

import { MAX_TWITTER_LENGTH } from "../constants";

import { postTweet } from "../helpers/POST_tweet";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useContext } from "react";

import { UsernameContext } from "../context/UsernameContext";
import { TweetlistContext } from "../context/TweetlistContext";
import { useState } from "react";

const CreateTweet = () => {
  const { username } = useContext(UsernameContext);
  const { tweetCreatedOn, tweetsArray, setTweetsArray } =
    useContext(TweetlistContext);

  const [tweet, setTweet] = useState();

  const [tweetCharCount, setTweetCarCount] = useState(0);

  const tweetMessageHandler = (e) => {
    setTweet(e.target.value);
    setTweetCarCount(e.target.value.length);
  };

  const sendTweetMessage = () => {
    const tweetObject = {
      id: tweetCreatedOn,
      content: tweet,
      userName: username,
      date: tweetCreatedOn,
    };
    postTweet(tweetObject);
    setTweet("");
    setTweetsArray([...tweetsArray, tweetObject]);
  };

  //update an array of tweets and store locally
  //render this array
  //auto setinterval server call

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
        {tweetCharCount >= MAX_TWITTER_LENGTH ? (
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
        ) : (
          <Button
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
        )}
      </Col>
    </Row>
  );
};

export default CreateTweet;
