import { useNavigate } from "react-router-dom";
import { UsernameContext } from "../context/UsernameContext";
import { useContext } from "react";

import Button from "react-bootstrap/Button";

import "../style/error.css";

const Error404 = () => {
  const { isAuth } = useContext(UsernameContext);

  const navigate = useNavigate();

  const redirectHome = () => {
    navigate("/");
  };

  const redirectLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="server-error">404</div>
      <div className="error-message">Oops! Looks like you are lost...</div>

      {isAuth ? (
        <Button className="home-button" onClick={redirectHome}>
          Return Home
        </Button>
      ) : (
        <Button className="home-button" onClick={redirectLogin}>
          Login
        </Button>
      )}
    </div>
  );
};

export default Error404;
