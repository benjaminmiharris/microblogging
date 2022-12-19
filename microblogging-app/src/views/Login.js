import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, db, provider } from "../firebase-config.js";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import localforage from "localforage";

import "../style/login.css";
import { useContext } from "react";
import { UsernameContext } from "../context/UsernameContext.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const Login = () => {
  const { setIsAuth, user, setUser } = useContext(UsernameContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log("user help", user);

  const userNameHandler = (e) => {
    setUsername(e.target.value);
  };

  const navigateHome = useNavigate();

  const createUser = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
      navigateHome("/");

      console.log("user", user);
      console.log("auth", auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, username, password);
      console.log(user);
      navigateHome("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      navigateHome("/");
    });
  };
  return (
    <div>
      <Row className="justify-content-center " md="6">
        <Col className="profile-form" md="5">
          {user?.email ? (
            <h2 className="google-signin">
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
                <Button onClick={createUser}>Create User</Button>
                <Button className="signin-button" onClick={login}>
                  Sign-in
                </Button>
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
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
