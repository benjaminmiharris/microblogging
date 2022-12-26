import { useContext, useEffect, useState, useRef } from "react";
import uniqid from "uniqid";
import { getAuth, updateProfile } from "firebase/auth";

import { UsernameContext } from "../context/UsernameContext";
import { FaCloudUploadAlt } from "react-icons/fa";

import { avatar } from "../constants";
import Button from "react-bootstrap/Button";
import "../style/profile-form.css";
import { storage } from "../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const ProfilePic = () => {
  const { user } = useContext(UsernameContext);
  const [imageUpload, setImageUpload] = useState(null);
  const [url, setUrl] = useState(avatar);

  useEffect(() => {
    uploadImage();
  }, [imageUpload]);

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

  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div style={{ color: "white" }}>
      <div className="profile-pic-container" onClick={handleClick}>
        <img
          className="profile-pic"
          src={user.photoURL ? user.photoURL : url}
          alt="profile-pic"
        />
        <FaCloudUploadAlt className="profile-pic-uploader" size={70} />

        <br />
        <div className="pic-upload-buttons-container">
          <input
            className="pic-uploader"
            type="file"
            ref={inputRef}
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePic;
