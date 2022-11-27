import "../style/tweet.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Tweet = ({ tweetMessage }) => {
  return (
    <Row className="justify-content-center text-center">
      <Col className="tweet-card" md="6">
        <div className="tweet-header d-flex justify-content-between">
          <p>yonatan</p>
          <p>2019-12-15T14:40:58.340Z</p>
        </div>

        <p className="tweet-message">{tweetMessage}</p>
      </Col>
    </Row>
  );
};

export default Tweet;
