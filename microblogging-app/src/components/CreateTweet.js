import "../style/create-tweet.css";

import { MAX_TWITTER_LENGTH } from "../constants";

import { postTweet } from "../helpers/POST_tweet";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useState } from "react";

const CreateTweet = ({ onAdd }) => {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetCharCount, setTweetCarCount] = useState(0);

  const tweetMessageHandler = (e) => {
    setTweetMessage(e.target.value);
    showTweetMessageCharAlert();
  };

  const showTweetMessageCharAlert = () => {
    setTweetCarCount(tweetMessage.length);
  };

  const sendTweetMessage = () => {
    const tweetObject = {
      content: tweetMessage,
      userName: "BMH",
      date: new Date().toISOString(),
    };
    postTweet(tweetObject);
    // console.log(tweetObject);
    // // onAdd({ tweetMessage });
    setTweetMessage("");
  };

  return (
    <Row className="justify-content-center">
      <Col className="create-tweet-container" md="6">
        <InputGroup className="tweet-message">
          <Form.Control
            value={tweetMessage}
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
