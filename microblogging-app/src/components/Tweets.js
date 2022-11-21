import Tweet from "../components/Tweet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import "../style/tweet.css";

const Tweets = () => {
  return (
    <Container>
      <Row>
        <Tweet />
        <Tweet />
        <Tweet />
      </Row>
    </Container>
  );
};

export default Tweets;
