import { useContext, useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { auth, firestore, storage } from "../firebase";
import { AuthContext } from "./authProvider";
import "../css/home.css";
import VideoCard from "./videoCard";
let Home = () => {
  let user = useContext(AuthContext);
  let [posts, setPosts] = useState([]);

  useEffect(() => {
    let unsub = firestore.collection("posts").onSnapshot((querySnapshot) => {
      setPosts(
        // ==
        querySnapshot.docs.map((doc) => {
          // .doc gives us all the references of the documents.
          console.log(doc.data()); // This gives all the data of the posts collection.
          return { ...doc.data(), id: doc.id };
        })
      );
    });

    return () => {
      unsub();
    };
  }, []);
  return (
    <>
      {user ? (
        <div className="home_container">
          {posts.map((post, i) => {
            console.log(post);
            return <VideoCard post={post} key={i} />;
          })}

          <button
            className="sign_out_btn"
            onClick={() => {
              auth
                .signOut()
                .then(() => {
                  console.log("signOutSuccessfull");
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            SignOut
          </button>
          <Link to="/profile">
            <button id="profile">
              <img
                src={
                  user.photoURL
                    ? user.photoURL
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
              />
            </button>
          </Link>
        </div>
      ) : (
        <Redirect to="/"></Redirect>
      )}
      <input
        type="file"
        className="upload_btn"
        onClick={(e) => {
          e.target.value = ""; // agar user dubara
        }}
        onChange={(e) => {
          console.log(e.target.files); // Tells us about the files that we have selected.
          if (!e.target.files[0]) {
            return;
          }

          let { name, type, size } = e.target.files[0];

          let file = e.target.files[0];

          size = size / 1000000;
          console.log(size);

          type = type.split("/")[0];

          console.log(type);

          if (type != "video") {
            alert("Please uplaod a video");
            return;
          }

          if (size > 15) {
            alert("Upload a file less than 15MB");
            return;
          }

          let f1 = (snapshot) => {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          };

          let f2 = (error) => {
            console.log(`The error is ${error}`);
          };

          let f3 = () => {
            uploadtask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log("File available at", downloadURL);
              alert("Video is uploaded successfully");

              firestore.collection("posts").add({
                downloadURL,
                username: user.displayName
                  ? user.displayName
                  : user.email.split("@")[0],
                comments: [],
                likes: 0,
              });
            });
          };

          let uploadtask = storage
            .ref(`/posts/${user.uid}/${Date.now()} + ${name}`)
            .put(file);

          uploadtask.on("state_changed", f1, f2, f3);
        }}
      ></input>
    </>
  );
};

export default Home;
