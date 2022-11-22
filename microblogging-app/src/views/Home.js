import CreateTweet from "../components/CreateTweet";
import Container from "react-bootstrap/Container";

import Tweets from "../components/Tweets";

import "../style/home.css";

const Home = () => {
  return (
    <Container className="app-container">
      <CreateTweet />
      <Tweets />
    </Container>
  );
};

export default Home;
