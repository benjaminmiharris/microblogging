import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";

import "../style/error.css";

const Error404 = () => {
  const navigate = useNavigate();

  const redirectHome = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="server-error">404</div>
      <div className="error-message">Oops! Looks like you are lost...</div>
      <Button className="home-button" onClick={redirectHome}>
        Return Home
      </Button>
    </div>
  );
};

export default Error404;
