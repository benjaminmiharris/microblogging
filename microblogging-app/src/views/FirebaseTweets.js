import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";

const FirebaseTweets = () => {
  const [postLists, setPostLists] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostLists(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    getPosts();
  });
  return (
    <div>
      {postLists.map((post) => {
        return (
          <div key={post.id} style={{ color: "white" }}>
            {post.tweet}{" "}
          </div>
        );
      })}
    </div>
  );
};

export default FirebaseTweets;
