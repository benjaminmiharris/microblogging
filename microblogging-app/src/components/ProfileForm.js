import { useContext, useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { UsernameContext } from "../context/UsernameContext";

import "../style/profile-form.css";

const ProfileForm = () => {
  const { username, setUsername, usernameError } = useContext(UsernameContext);

  const [usernameInput, setUsernameInput] = useState("");

  const saveUsername = () => {
    setUsername(usernameInput);
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="6">
          <h1 className="profile-title">Profile</h1>
        </Col>
      </Row>
      <Row className="justify-content-center " md="6">
        <Col className="profile-form" md="6">
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="profile-form-label">User Name</Form.Label>
            <Form.Control
              defaultValue={username}
              className="profile-username-input"
              type="text"
              placeholder="Enter profile"
              onChange={(e) => setUsernameInput(e.target.value)}
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
          {!usernameInput ? (
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
