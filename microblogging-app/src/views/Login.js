import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, provider } from "../firebase-config.js";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import localforage from "localforage";

import "../style/login.css";
import { useContext } from "react";
import { UsernameContext } from "../context/UsernameContext.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const Login = () => {
  const { setIsAuth } = useContext(UsernameContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const navigateHome = useNavigate();

  const createUser = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, username, password);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
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
          <p style={{ color: "white" }}>
            Testing to show current user: {user?.email}
          </p>

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
            <Button onClick={createUser}>Create User</Button>
            <Button className="signin-button" onClick={login}>
              Sign-in
            </Button>
            <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            <Button onClick={logout}>Sign-out</Button>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
