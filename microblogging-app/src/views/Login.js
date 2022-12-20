import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, db, provider } from "../firebase-config.js";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import "../style/login.css";
import { useContext } from "react";
import { UsernameContext } from "../context/UsernameContext.js";

const Login = () => {
  const { setIsAuth, user, isAuth } = useContext(UsernameContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userNameHandler = (e) => {
    setUsername(e.target.value);
  };

  const navigateHome = useNavigate();

  const createUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, username, password);
      setIsAuth(true);

      navigateHome("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, username, password);
      setIsAuth(true);

      navigateHome("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      setIsAuth(true);

      navigateHome("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Row className="justify-content-center " md="6">
        <Col className="profile-form" md="6">
          {isAuth ? (
            <h2 className="user-signedin">
              {user?.displayName}, you are currently logged in!
            </h2>
          ) : (
            <div>
              <h2 className="google-signin">Get Started</h2>
              <Form.Group>
                <Form.Label className="profile-form-label">Username</Form.Label>
                <Form.Control
                  className="profile-username-input"
                  type="text"
                  placeholder="Enter username"
                  onChange={userNameHandler}
                />
                <Form.Label className="profile-form-label">Password</Form.Label>
                <Form.Control
                  className="profile-username-input"
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <br />
                <div>
                  <Button onClick={createUser}>Create User</Button>
                  <Button className="signin-button" onClick={login}>
                    Sign-in
                  </Button>
                  <Button onClick={signInWithGoogle}>
                    Sign in with Google
                  </Button>
                </div>
                <br />
                <br />
              </Form.Group>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Login;
