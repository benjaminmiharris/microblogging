import { useContext, useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getAuth, updateProfile } from "firebase/auth";

import { UsernameContext } from "../context/UsernameContext";

import "../style/profile-form.css";
import ProfilePic from "./ProfilePic";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileForm = () => {
  const notifyDisplayNameError = () =>
    toast.error(" Display name must contain characters!", { theme: "colored" });

  const { setUsername, user } = useContext(UsernameContext);

  const [profilenameInput, setProfilenameInput] = useState("");
  const [usernameError, setUsernameError] = useState(false);

  const displayNameHandler = (e) => {
    setUsernameError(false);
    setProfilenameInput(e.target.value);
  };

  const saveUsername = () => {
    if (
      profilenameInput.length > 0 &&
      profilenameInput.replace(/\s/g, "").length == 0
    ) {
      setUsernameError(true);
    } else {
      setUsername(profilenameInput);
      setFirebaseDisplayName();
    }
  };

  const setFirebaseDisplayName = async () => {
    try {
      const auth = getAuth();
      await updateProfile(auth.currentUser, {
        displayName: profilenameInput,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      {usernameError && notifyDisplayNameError()}
      <br />
      <Row className="justify-content-center">
        <Col md="5">
          <h1 className="profile-title">Welcome {user.displayName}</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="5">
          <ProfilePic />
        </Col>
      </Row>
      <Row className="justify-content-center " md="4">
        <Col className="profile-form" md="4">
          <Form.Group
            className="user-displayname-container"
            controlId="formBasicEmail"
          >
            <Form.Label className="profile-form-label">Display Name</Form.Label>
            <Form.Control
              defaultValue={user.displayName}
              className="profile-username-input"
              type="text"
              placeholder="Enter profile"
              onChange={displayNameHandler}
            />
            <Button
              className="profile-save-button"
              variant="primary"
              type="submit"
              onClick={saveUsername}
            >
              Save
            </Button>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileForm;
