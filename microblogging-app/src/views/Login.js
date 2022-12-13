import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";

import localforage from "localforage";

import "../style/login.css";
import { useContext } from "react";
import { UsernameContext } from "../context/UsernameContext.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  //   const { setIsAuth } = useContext(UsernameContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log(username);

  const navigateHome = useNavigate();

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localforage.setItem("isAuth", true);
      navigateHome("/");
    });
  };
  return (
    <div>
      <Row className="justify-content-center " md="6">
        <Col className="profile-form" md="5">
          <h2 className="google-signin">Get Started</h2>
          <Form.Group>
            <Form.Label className="profile-form-label">Username</Form.Label>
            <Form.Control
              className="profile-username-input"
              type="text"
              placeholder="Enter username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
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
            <Button onClick={register}>Create User</Button>
            <Button className="signin-button">Sign-in</Button>
            <Button onClick={signInWithGoogle}>Sign in with Google</Button>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
