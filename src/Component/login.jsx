import { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { signInWithGoogle } from "../firebase";
import { AuthContext } from "./authProvider";
import "../css/login.css";
import { auth } from "../firebase";

let Login = () => {
  let user = useContext(AuthContext);
  let history = useHistory();

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  return (
    <div className="container">
      <div className="login_signup_container">
        <div className="login_container">
          {user ? <Redirect to="/home"></Redirect> : ""}
          <div>
            {/* <label>Email Address</label> */}
            <h1>Sign In</h1>
            <input
              value={email}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div>
            {/* <label>Password</label> */}
            <input
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <button
            className="login_btn"
              onClick={() => {
                auth.signInWithEmailAndPassword(email, password);
              }}
            >
              Login
            </button>
          </div>
          <h3>OR</h3>
          <button className="login_with_google_btn" onClick={signInWithGoogle}>Login With Google</button>
        </div>

        <div className="signup_container">
          <div className="overlay_right">
            <h1>Hello, Friend!</h1>
            <p>Click on the SignUp button and start journey with us</p>
            <button
              className="signup_btn"
              onClick={() => {
                history.push("/signup");
              }}
            >
              {" "}
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
