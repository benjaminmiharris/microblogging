import "../style/create-tweet.css";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CreateTweet = () => {
  return (
    <Row className="justify-content-center">
      <Col className="create-tweet-container" md="6">
        <InputGroup className="tweet-message">
          <Form.Control
            className="note-text-input"
            as="textarea"
            placeholder="What you have in mind..."
          />
        </InputGroup>
        <Alert className="tweet-char-alert" variant="danger">
          The tweet can't contain more then 140 chars.
        </Alert>
        <Button
          className="create-tweet-button "
          variant="primary"
          type="submit"
        >
          Tweet
        </Button>
      </Col>
    </Row>
  );
};

export default CreateTweet;
