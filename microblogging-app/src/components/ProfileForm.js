import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "../style/profile-form.css";
import { useEffect, useState } from "react";
import * as localForage from "localforage";

const ProfileForm = () => {
  const [usernameInput, setUsernameInput] = useState();
  const [defaultUsername, setDefaultUsername] = useState();

  const saveUsername = () => {
    localForage.setItem("current_user", usernameInput);
  };

  const getUsernameFromForage = async () => {
    const response = await localForage.getItem("current_user");
    setDefaultUsername(response);
  };

  useEffect(() => {
    getUsernameFromForage();
  }, []);

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
              defaultValue={defaultUsername}
              className="profile-username-input"
              type="text"
              placeholder="Enter email"
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
        </Col>
      </Row>
    </div>
  );
};

export default ProfileForm;
