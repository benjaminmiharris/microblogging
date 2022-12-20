import { useContext, useEffect, useState } from "react";
import uniqid from "uniqid";
import { getAuth, updateProfile } from "firebase/auth";

import { UsernameContext } from "../context/UsernameContext";

import { avatar } from "../constants";
import Button from "react-bootstrap/Button";
import "../style/profile-form.css";
import { storage } from "../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const ProfilePic = () => {
  const { user } = useContext(UsernameContext);
  const [imageUpload, setImageUpload] = useState(null);
  const [url, setUrl] = useState(avatar);

  useEffect(() => {}, []);

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageID = uniqid();
    const imageRef = ref(storage, `images/${imageUpload.name} + ${imageID}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
            setFirebaseProfilePic(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const setFirebaseProfilePic = (item) => {
    const auth = getAuth();

    updateProfile(auth.currentUser, {
      photoURL: item,
    })
      .then(() => {
        console.log("pic updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ color: "white" }}>
      <div className="profile-pic-container">
        <img
          className="profile-pic"
          src={user.photoURL ? user.photoURL : url}
          alt="profile-pic"
        />
        <br />
        <div className="pic-upload-buttons-container">
          <input
            className="pic-uploader"
            type="file"
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
          />
          <Button className="pic-submit-button" onClick={uploadImage}>
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePic;
