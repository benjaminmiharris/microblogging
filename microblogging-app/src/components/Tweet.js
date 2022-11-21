import "../style/tweet.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Tweet = () => {
  return (
    <Container className="tweet-container">
      <Row className="tweet-card">
        <Col>
          <div className="tweet-header d-flex justify-content-between">
            <p>yonatan</p>
            <p>2019-12-15T14:40:58.340Z</p>
          </div>

          <p className="tweet-message">
            On the technical side, Microsoft says the Xbox Series X can handle
            4K visuals at 60 frames per second, and potentially up to 120FPS.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Tweet;
