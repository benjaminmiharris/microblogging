import { useContext, useEffect, useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getAuth, updateProfile } from "firebase/auth";

import { UsernameContext } from "../context/UsernameContext";

import "../style/profile-form.css";
import ProfilePic from "./ProfilePic";

const ProfileForm = () => {
  const { username, setUsername, usernameError, user } =
    useContext(UsernameContext);

  const [profilenameInput, setProfilenameInput] = useState("");

  const saveUsername = () => {
    setUsername(profilenameInput);
    setFirebaseDisplayName();
  };

  const setFirebaseDisplayName = () => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: profilenameInput,
    })
      .then(() => {
        console.log("pic updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col>
          <ProfilePic />
        </Col>
        <Col md="7">
          <h1 className="profile-title">Welcome {user.displayName}</h1>
        </Col>
      </Row>
      <Row className="justify-content-center " md="4">
        <Col className="profile-form" md="4">
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="profile-form-label">Display Name</Form.Label>
            <Form.Control
              defaultValue={user.displayName}
              className="profile-username-input"
              type="text"
              placeholder="Enter profile"
              onChange={(e) => setProfilenameInput(e.target.value)}
            />
          </Form.Group>
          <Button
            className="profile-save-button"
            variant="primary"
            type="submit"
            onClick={saveUsername}
          >
            Save
          </Button>
          <br />
          {!profilenameInput ? (
            <p className="username-error">{usernameError}</p>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProfileForm;
