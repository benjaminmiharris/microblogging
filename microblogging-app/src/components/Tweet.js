import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../style/tweet.css";

const Tweet = ({ tweet }) => {
  return (
    <Row className="justify-content-center text-center">
      <Col className="tweet-card" md="6">
        <div className="tweet-header d-flex justify-content-between">
          <p>{tweet.userName}</p>
          <p>{tweet.date}</p>
        </div>

        <p className="tweet-message">{tweet.content}</p>
      </Col>
    </Row>
  );
};

export default Tweet;
