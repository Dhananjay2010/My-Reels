
import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { firestore } from "../firebase";
import "../css/profile.css";

import {Link} from "react-router-dom";
import { AuthContext } from "./authProvider";

let Profile = () => {
  let value = useContext(AuthContext);
  let [totalPosts, setTotalPosts]=useState(0);

  useEffect(() => {
    let f = async () => {
      let querySnapshot = await firestore
        .collection("posts")
        .where("username", "==", value.displayName?value.displayName : value.email.split("@")[0])
        .get();

    console.log("size", querySnapshot.size); //==> Gives total no of posts of the particular user.

        setTotalPosts(querySnapshot.size);
    };
    f();
  }, []);

  return (
    <>
      {value ? (
        <div>
            <Link to="/home">
          <button className="home_btn">Back</button>

            </Link>
          <img className="image-profile" src={value.photoURL?value.photoURL : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}></img>
          <p className="username-profile">{value.displayName?value.displayName : value.email.split("@")[0]}</p>
          <p className="ttpost">Total Posts: {totalPosts}</p>
        </div>
      ) : (
        <Redirect to="/login"></Redirect>
      )}
    </>
  );
};

export default Profile;
